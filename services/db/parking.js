import { getCollection } from './collections.js';

// Get all parking zones
export const getParking = async () => {
  const parking = await getCollection('parking_zones').find().toArray();
  return parking;
};
