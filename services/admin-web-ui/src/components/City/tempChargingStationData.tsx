const ChargingStation1 = {
  _id: "S001",
  "area": [
    [1.1, 1.1],
    [1.1, 1.1],
    [11.11, 11.11]
  ],
  plugs: [
      { id: 1, available: true },
      { id: 2, available: false },
      { id: 3, available: true },
  ],
};

const ChargingStation2 = {
  _id: "S002",
  "area": [
    [2.2, 2.2],
    [2.2, 2.2],
    [22.22, 22.22]
  ],
  plugs: [
      { id: 1, available: false },
      { id: 2, available: false },
      { id: 3, available: true },
  ],
};

const ChargingStation3 = {
  _id: "S003",
  "area": [
    [3.3, 3.3],
    [3.3, 3.3],
    [33.33, 33.33]
  ],
  plugs: [
      { id: 1, available: false },
      { id: 2, available: true },
      { id: 3, available: false },
  ],
};

const tempDataCharging = [
  { station_id: ChargingStation1._id, area: ChargingStation1.area , plugs: ChargingStation1.plugs },
  { station_id: ChargingStation2._id, area: ChargingStation2.area , plugs: ChargingStation2.plugs },
  { station_id: ChargingStation3._id, area: ChargingStation3.area , plugs: ChargingStation3.plugs },
];

export { ChargingStation1, ChargingStation2, ChargingStation3, tempDataCharging };