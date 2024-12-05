interface Bike {
  bike_id: string; // egentligen ObjectId
  status: {
    available: boolean;
    battery_level: number;
    in_service: boolean;
  };
  location: number[];
}

interface ChargingStation {
  station_id: string; // egentligen ObjectId
  area: number[][];
  plugs: {
    id: number;
    available: boolean;
  }[];
}

interface ParkingZone {
  zone_id: string;
  area: number[][];
}

interface Rule {
  rule_id: string;
  description: string;
}

/*** City Table Interfaces ***/

interface CityTableRow {
  category: string;
  count: number;
  data: (Bike | ChargingStation | ParkingZone | Rule)[];
}

interface RowItemProps {
  item: Bike | ChargingStation | ParkingZone | Rule;
}

interface CityTableRowProps {
  row: CityTableRow;
  rowIndex: number;
  selectedRow: number | null;
  toggleDetails: (index: number) => void;
}

interface CityTableProps {
  rows: CityTableRow[];
}

interface CityShowRowDetailsProps {
  data: CityTableRow['data'];
}

export type {
  Bike,
  ChargingStation,
  ParkingZone,
  Rule,
  CityTableRow,
  RowItemProps,
  CityTableRowProps,
  CityTableProps,
  CityShowRowDetailsProps,
};
