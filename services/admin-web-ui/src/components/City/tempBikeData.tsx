const Bike1 = {
    _id: "B001",
    status: {
      available: true,
      battery_level: 79,
      in_service: false,
    },
    location: [1, 1],
};
  
const Bike2 = {
    _id: "B002",
    status: {
      available: false,
      battery_level: 53,
      in_service: false,
    },
    location: [2, 2],
};
  
const Bike3 = {
    _id: "B003",
    status: {
      available: false,
      battery_level: 28,
      in_service: true,
    },
    location: [3, 3],
};

const tempDataBikes = [
  { bike_id: Bike1._id, status: Bike1.status, location: Bike1.location },
  { bike_id: Bike2._id, status: Bike2.status, location: Bike2.location },
  { bike_id: Bike3._id, status: Bike3.status, location: Bike3.location },
];

export { Bike1, Bike2, Bike3, tempDataBikes }