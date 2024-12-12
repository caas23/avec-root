import { FormData } from "./interfaces";
import { cityParkingZones } from "./tempParkingZoneData";
import { ParkingZone } from "./interfaces";

const handleCityChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setAvailableZones: React.Dispatch<React.SetStateAction<ParkingZone[]>>
) => {
  const cityName = e.target.value;
  setFormData({ ...formData, cityName, parkingZone: "" });

  // hämta och sätt zoner för given city
  const selectedCity = cityParkingZones.find((city) => city.name === cityName);
  selectedCity ? setAvailableZones(selectedCity.parking_zones) : setAvailableZones([]);
};

// uppdatera selectad zon baserat på val i dropdownen
const handleParkingZoneChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const parkingZone = e.target.value;
  setFormData({ ...formData, parkingZone });
};

// uppdatera selectad zon baserat på klickad markör på kartan
const handleMarkerClick = (
  zoneId: string,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  setFormData((prevFormData) => ({ ...prevFormData, parkingZone: zoneId }));
};

export {
    handleCityChange,
    handleParkingZoneChange,
    handleMarkerClick
 }
