import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter_map_location_marker/flutter_map_location_marker.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_map_geojson/flutter_map_geojson.dart';

// Creates the map and locates the user

class MapPage extends StatefulWidget {
  MapPage({super.key, required this.selectedCity});

  String selectedCity;

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  LatLng? _currentPosition;

  GeoJsonParser myGeoJson = GeoJsonParser(
      defaultPolygonIsFilled: false,
      defaultPolygonBorderColor: const Color.fromRGBO(9, 42, 25, 1));

  @override
  void initState() {
    super.initState();
    _getCurrentPosition();
    _fetchCity();
  }

  Future<void> _getCurrentPosition() async {
    PermissionStatus permissionStatus = await Permission.location.request();
    if (permissionStatus.isGranted) {
      Position position = await Geolocator.getCurrentPosition(
          locationSettings:
              const LocationSettings(accuracy: LocationAccuracy.best));
      setState(() {
        _currentPosition = LatLng(position.latitude, position.longitude);
      });
    } else {
      throw Exception;
    }
  }

  Future<void> _fetchCity() async {
    final response = await http.get(Uri.parse(
        'https://nominatim.openstreetmap.org/search?q=${widget.selectedCity}&limit=1&polygon_geojson=1&format=geojson'));
    if (response.statusCode == 200) {
      // print(response);
      myGeoJson.parseGeoJsonAsString(response.body);
      // var data = json.decode(response.body);
      // print(data);
    } else {
      throw Exception('Failed to load JSON data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return _currentPosition == null
        ? const Center(child: CircularProgressIndicator())
        : Stack(
            children: <Widget>[
              FlutterMap(
                options: MapOptions(
                  initialCenter: LatLng(
                      _currentPosition!.latitude,
                      _currentPosition!
                          .longitude), // Center the map over user position
                  initialZoom: 15,
                ),
                children: [
                  TileLayer(
                    // Display map tiles from any source
                    urlTemplate:
                        'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // OSMF's Tile Server
                    userAgentPackageName: 'com.example.app',
                    // And many more recommended properties!
                  ),
                  CurrentLocationLayer(
                    alignPositionOnUpdate: AlignOnUpdate.always,
                    alignDirectionOnUpdate: AlignOnUpdate.never,
                    style: const LocationMarkerStyle(
                      marker: DefaultLocationMarker(
                        child: Icon(
                          Icons.navigation,
                          color: Colors.white,
                        ),
                      ),
                      markerSize: Size(40, 40),
                      markerDirection: MarkerDirection.heading,
                    ),
                  ),
                  PolygonLayer(polygons: myGeoJson.polygons),
                  RichAttributionWidget(
                    // Include a stylish prebuilt attribution widget that meets all requirments
                    attributions: [
                      TextSourceAttribution(
                        'OpenStreetMap contributors',
                        onTap: () => launchUrl(Uri.parse(
                            'https://openstreetmap.org/copyright')), // (external)
                      ),
                      // Also add images...
                    ],
                  ),
                ],
              ),
            ],
          );
  }
}
