import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import scooterIcon from "/src/assets/scooter-icon.png";
import "./index.css";


const Map: React.FC = () => {
	const [cityBorders, setCityBorders] = useState<any>(null);
	const [cityCenter, setCityCenter] = useState<[number, number] | null>(null);
	const { city } = useParams<{ city: string }>();

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
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30],
	});

	useEffect(() => {
		if (city) {
			document.title = `Map ${cityNameDisplay[city]} - Avec`;
		}

		const fetchCityBorders = async (cityName: string) => {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search.php?q=${cityName}&polygon_geojson=1&format=json`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();
			if (data.length > 0 && data[0].geojson) {
				setCityBorders(data[0].geojson);
				setCityCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
			} else {
				console.error("No city data found.");
			}
		} catch (error) {
			console.error("Error fetching city data:", error);
		}
	};

    if (city) {
      fetchCityBorders(city);
		}
	}, [city]);

	// för att hinna hämta cityCenter och
	// få kartan centrerad kring önskat område.
	// tar egentligen bara någon ms men krävs för
	// att kunna sköta kartritningen på smidigt sätt.
  	if (!cityCenter) {
    	return (
		<div>
			<h1>Map</h1>
			<p className="map-loading-msg">Loading map ...</p>
		</div>
		);
	}

	if (city) {
		return (
			<div>
			<h1>{cityNameDisplay[city]}</h1>
			<MapContainer center={cityCenter} zoom={12}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cityBorders && (
				<GeoJSON
					data={cityBorders}
					style={{
					color: "#1A4D30", // testade ha en av de ljusare gröna här, men blir lätt att allt flyter ihop mot bakgrunden och den gröna scooter-ikonen då.
					weight: 1.5,
					fillOpacity: 0.15,
					}}
				/>
				)}
				<Marker position={cityCenter} icon={scooterMarker}>
					<Popup>
						Vi kan använda popups som dessa för <br />
						cyklar, laddstationer och parkeringar. <br />
						Men med custom ikoner för vardera del.
					</Popup>
				</Marker>
			</MapContainer>
			</div>
		);
	}
};

export default Map;
