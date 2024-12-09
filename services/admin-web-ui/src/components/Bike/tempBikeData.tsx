import { Bike } from "./interfaces";

const Bike1: Bike = {
  _id: "B001",
  location: [1.0, 1.0],
  cityId: "C001",
  city_name: "Lund",
  speed: 15.5,
  status: {
    available: false,
    battery_level: 79,
    in_service: false,
  },
  completed_trips: ["T001", "T002"],
};

const Bike2: Bike = {
  _id: "B002",
  location: [2.0, 2.0],
  cityId: "C002",
  city_name: "Solna",
  speed: 0.0,
  status: {
    available: true,
    battery_level: 53,
    in_service: false,
  },
  completed_trips: ["T003"],
};

const Bike3: Bike = {
  _id: "B003",
  location: [3.0, 3.0],
  cityId: "C003",
  city_name: "Skellefteå",
  speed: 0.0,
  status: {
    available: false,
    battery_level: 28,
    in_service: true,
  },
  completed_trips: ["T004", "T005", "T006"],
};

const tempDataBikes = [
  {
    _id: Bike1._id,
    location: Bike1.location,
    cityId: Bike1.cityId,
    city_name: Bike1.city_name,
    speed: Bike1.speed,
    status: Bike1.status,
    completed_trips: Bike1.completed_trips,
  },
  {
    _id: Bike2._id,
    location: Bike2.location,
    cityId: Bike2.cityId,
    city_name: Bike2.city_name,
    speed: Bike2.speed,
    status: Bike2.status,
    completed_trips: Bike2.completed_trips,
  },
  {
    _id: Bike3._id,
    location: Bike3.location,
    cityId: Bike3.cityId,
    city_name: Bike3.city_name,
    speed: Bike3.speed,
    status: Bike3.status,
    completed_trips: Bike3.completed_trips,
  },
];

export { Bike1, Bike2, Bike3, tempDataBikes };
