import React, { useState } from "react";
import { ParkingZone, FormData } from "./interfaces";
import { cityParkingZones } from "./tempParkingZoneData";
import "./index.css";
import { handleCityChange, handleParkingZoneChange, handleMarkerClick } from "./formHandlers";
import AddBikeMap from "../AddBikeMap";

const AddBikeForm: React.FC = () => {
  // data som sätts i formuläret
  const [formData, setFormData] = useState<FormData>({
    cityName: "",
    parkingZone: "",
  });

  // tillgängliga zoner för vald stad
  const [availableZones, setAvailableZones] = useState<ParkingZone[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cityName, parkingZone } = formData;

    const selectedCity = cityParkingZones.find((city) => city.name === cityName);
    const selectedZone = availableZones.find((zone) => zone._id === parkingZone);

    const newBike = {
      speed: 0,
      location: selectedZone ? selectedZone.area[0] : [0, 0],
      city_name: selectedCity?.name || "",
      status: {
        available: true,
        battery_level: 100,
        in_service: false,
      },
    };

    try {
      const response = await fetch("http://localhost:1337/add/bike/to/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bike: newBike,
          city: {
            name: selectedCity?.name,
          },
        }),
      });

      // justerar alertsen till custom alerts senare,
      // får allt på plats och får igång flödet först
      if (response.ok) {
        const result = await response.json();
        console.log("Bike added:", result);
        alert("Bike added");
      } else {
        console.error("Error adding bike:", response.statusText);
        alert("Error adding bike, no bike was added.");
      }
    } catch (error) {
      console.error("Error adding bike:", error);
      alert("Error adding bike, no bike was added.");
    }
  };

  // check för att visuellt kunna visa att det inte går att
  // addera en cykel utan att först välja stad och parkeringszon
  const validForm = formData.cityName && formData.parkingZone;

  return (
    <div>
      <form className="add-bike-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cityName">City</label>
          <select
            id="cityName"
            name="cityName"
            value={formData.cityName}
            // handlern ligger i separat fil
            onChange={(e) => handleCityChange(e, formData, setFormData, setAvailableZones)}
            required
          >
            <option value="" disabled>Choose city ...</option>
            {cityParkingZones.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="parkingZone">Parking Zone</label>
          <select
            id="parkingZone"
            name="parkingZone"
            value={formData.parkingZone}
            // handlern ligger i separat fil
            onChange={(e) => handleParkingZoneChange(e, formData, setFormData)}
            disabled={!formData.cityName}
            required
          >
            <option value="" disabled>Choose zone ...</option>
            {availableZones.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone._id}
              </option>
            ))}
          </select>
        </div>

        <button
          className="add-bike-btn"
          type="submit"
          disabled={!validForm}
        >
          Add Bike
        </button>
      </form>

      {!formData.cityName ? (
        <div className="add-bike-map no-map-selected">
          <p className="message">
            Choose a city to display available parking zones ...
          </p>
        </div>
      ) : (
        <AddBikeMap
          availableZones={availableZones}
          // handlern ligger i separat fil
          handleMarkerClick={(zoneId) => handleMarkerClick(zoneId, setFormData)}
        />
      )}
    </div>
  );
};

export default AddBikeForm;