import { getCollection } from './collections.js';

// Get all cities
export const getCities = async () => {
  const cities = await getCollection('cities').find().toArray();
  return cities;
};

// Get city by name
export const getCity = async (name) => {
  const city = await getCollection('cities').findOne({
    name: name
  })

  return city;
}