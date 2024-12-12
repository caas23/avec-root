import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import scooterIcon from "/src/assets/scooter-pin.png";
import parkingIcon from "/src/assets/parking-spot.png";
import chargingIcon from "/src/assets/charging-station.png";
import "./index.css";

const Map: React.FC = () => {
	const { city } = useParams<{ city: string }>();
	const [cityBorders, setCityBorders] = useState<any>(null);
	const [cityCenter, setCityCenter] = useState<[number, number] | null>(null);
	const [bikes, setBikes] = useState<any[]>([]);
	const [parkingZones, setParkingZones] = useState<any>(null);

	const cityNameDisplay: { [key: string]: string } = {
		lund: "Lund",
		solna: "Solna",
		skelleftea: "Skellefteå",
	};

	const scooterMarker = L.icon({
		iconUrl: scooterIcon,
		iconSize: [40, 40],
		iconAnchor: [20, 40],
		popupAnchor: [0, -30],
	});

	useEffect(() => {
		document.title = city ? `Map ${cityNameDisplay[city]} - Avec` : "Map - Avec";

		const fetchCityBordersFromDatabase = async (cityName: string) => {
			try {
				const response = await fetch(`http://localhost:1337/city/${cityName}`);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data = await response.json();
				if (data.geometry && data.boundingbox) {
					setCityBorders(data.geometry);
					setCityCenter([
						(parseFloat(data.boundingbox[0]) + parseFloat(data.boundingbox[1])) / 2,
						(parseFloat(data.boundingbox[2]) + parseFloat(data.boundingbox[3])) / 2,
					]);
				} else {
					console.error("No city data found.");
				}
			} catch (error) {
				console.error("Error fetching city data:", error);
			}
		};

		const fetchBikes = async () => {
			try {
				const response = await fetch(`http://localhost:1337/bikes`);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const bikeData = await response.json();
				setBikes(bikeData);
			} catch (error) {
				console.error("Error fetching bikes:", error);
			}
		};

		const fetchParkingZones = async (cityName: string) => {
			try {
				const response = await fetch(`http://localhost:1337/parking`);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const zones = await response.json();

				// Wrap the array of geometries into a FeatureCollection
				setParkingZones({
					type: "FeatureCollection",
					features: zones.map((zone: any) => ({
						type: "Feature",
						geometry: zone.geometry,
						properties: { id: zone._id },
					})),
				});
			} catch (error) {
				console.error("Error fetching parking zones:", error);
			}
		};

		if (city) {
			fetchCityBordersFromDatabase(city);
			fetchParkingZones(city);
			fetchBikes();
		}
	}, [city]);

	if (!cityCenter) {
		return (
			<div>
				<h1>{city ? cityNameDisplay[city] : ""}</h1>
				<p className="map-loading-msg">Loading map ...</p>
			</div>
		);
	}

	return (
		<div>
			<h1>{city ? cityNameDisplay[city] : ""}</h1>
			<MapContainer center={cityCenter} zoom={12}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cityBorders && (
					<GeoJSON
						data={cityBorders}
						style={{
							color: "#1A4D30", // --color-green-darker
							weight: 1.5,
							fillOpacity: 0.15,
						}}
					/>
				)}
				{bikes.map((bike) => (
					<Marker
						key={bike._id}
						position={[
							bike.location[0], // latitude
							bike.location[1], // longitude
						]}
						icon={scooterMarker}>
						<Popup>
							<div className="popup-content">
								<h2 className="popup-id">{bike._id}</h2>
							</div>
						</Popup>
					</Marker>
				))}
				{parkingZones && (
					<GeoJSON
						data={parkingZones}
						style={{
							color: "#0033cc", // Example color for parking zones
							weight: 2,
							fillOpacity: 0.2,
						}}
					/>
				)}
				<Marker position={cityCenter} icon={scooterMarker}>
					<Popup>
						<div className="popup-content">
							<h2 className="popup-id">#8b8436</h2>
							<p>
								<span className="bold">Available: </span>True
							</p>
							<p>
								<span className="bold">Speed: </span>0 km/h
							</p>
							<p>
								<span className="bold">Battery level: </span>82 %
							</p>
						</div>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
