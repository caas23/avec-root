interface ParkingZone {
  _id: string;
  area: [number, number][];
}

// inte fullständigt, har bara lagt in
// de delar som behövts under testning av 
// formuläret för att addera en cykel
interface City {
  name: string;
  parking_zones: ParkingZone[];
}

interface FormData {
  cityName: string;
  parkingZone: string;
}

export type {
  ParkingZone,
  City,
  FormData
};
