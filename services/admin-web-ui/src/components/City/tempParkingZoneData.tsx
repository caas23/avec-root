const ParkingZone1 = {
  _id: "P001",
  "area": [
    [1.1, 1.1],
    [1.1, 1.1],
    [11.11, 11.11]
  ],
};

const ParkingZone2 = {
  _id: "P002",
  "area": [
    [2.2, 2.2],
    [2.2, 2.2],
    [22.22, 22.22]
  ],
};

const ParkingZone3 = {
  _id: "P003",
  "area": [
    [3.3, 3.3],
    [3.3, 3.3],
    [33.33, 33.33]
  ],
};

const tempDataParking = [
  { zone_id: ParkingZone1._id, area: ParkingZone1.area },
  { zone_id: ParkingZone2._id, area: ParkingZone2.area },
  { zone_id: ParkingZone3._id, area: ParkingZone3.area },
];

export { ParkingZone1, ParkingZone2, ParkingZone3, tempDataParking };
