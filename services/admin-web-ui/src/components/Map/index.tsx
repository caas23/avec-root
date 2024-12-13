import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import scooterIcon from "/src/assets/scooter-pin.png";
import chargingIcon from "/src/assets/charging-station.png";
import parkingIcon from "/src/assets/parking-spot.png";
import "./index.css";


const Map: React.FC = () => {
	const { city } = useParams<{ city: string }>();
	const [cityBorders, setCityBorders] = useState<any>(null);
	const [cityCenter, setCityCenter] = useState<[number, number] | null>(null);
	const [cityEast, setCityEast] = useState<[number, number] | null>(null);
	const [cityWest, setCityWest] = useState<[number, number] | null>(null);
	const [citySouth, setCitySouth] = useState<[number, number] | null>(null);

	// ett sätt att bibehålla å, ä och ö när vi skriver ut stadens namn,
	// nackdel: behöva lägga in städer manuellt, fördel: smidig lösning
	// får fundera på bra lösning senare när db kommer in i bilden
	const cityNameDisplay: { [key: string]: string } = {
		lund: "Lund",
		solna: "Solna",
		skelleftea: "Skellefteå",
	};

	const scooterMarker = L.icon({
		iconUrl: scooterIcon,
		iconSize: [50, 50],
		iconAnchor: [25, 50],
		popupAnchor: [0, -40],
	});

	const chargingStationMarker = L.icon({
		iconUrl: chargingIcon,
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [1, -20],
	});

	const parkingSpotMarker = L.icon({
		iconUrl: parkingIcon,
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [1, -20],
	});

	useEffect(() => {
		document.title = city ? `Map ${cityNameDisplay[city]} - Avec` : 'Map - Avec';

		const fetchCityBorders = async (cityName: string) => {
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search.php?q=${cityName}&polygon_geojson=1&format=json`
				);
				console.log(response)
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();
				if (data?.[0]?.geojson) {
					setCityBorders(data[0].geojson);
					setCityCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
					setCityEast([parseFloat(data[0].lat) + 0.003, parseFloat(data[0].lon) + 0.009]);
					setCityWest([parseFloat(data[0].lat) + 0.003, parseFloat(data[0].lon) - 0.011]);
					setCitySouth([parseFloat(data[0].lat) - 0.007, parseFloat(data[0].lon) + 0.011]);
				} else {
					console.error("No city data found.");
				}
			} catch (error) {
				console.error("Error fetching city data:", error);
			}
		};
		
		city ? fetchCityBorders(city) : "";

	}, [city]);

	// för att hinna hämta cityCenter och
	// få kartan centrerad kring önskat område.
	// tar egentligen bara någon ms men krävs för
	// att kunna sköta kartritningen på smidigt sätt.
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
							fillOpacity: 0.0,
						}}
					/>
				)};
				<Marker position={cityCenter} icon={scooterMarker}>
					<Popup>
						Vi kan använda popups som dessa för <br />
						cyklar, laddstationer och parkeringar. <br />
						Men med custom ikoner för vardera del.
					</Popup>
				</Marker>
				<Marker position={cityEast} icon={scooterMarker}>
					<Popup>
						<div className="popup-content">
							<h2 className="popup-id">#8b8436</h2>
							<p><span className="bold">Available: </span>True</p>
							<p><span className="bold">Speed: </span>0 km/h</p>
							<p><span className="bold">Battery level: </span>82 %</p>
						</div>
					</Popup>
				</Marker>
				<Marker position={cityWest} icon={chargingStationMarker}>
					<Popup>
						<div className="popup-content">
							<h2 className="popup-id">#S001</h2>
							<p><span className="bold">Available plugs: </span>1/3</p>
						</div>
					</Popup>
				</Marker>
				<Marker position={citySouth} icon={parkingSpotMarker}>
					<Popup>
						<div className="popup-content">
							<h2 className="popup-id">#P001</h2>
						</div>
					</Popup>
				</Marker>

			</MapContainer>
		</div>
	);
}


export default Map;
