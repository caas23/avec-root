// import database from "../db/db.js"
import { getCollection } from "../db/collections.js"
import { getCities } from "../db/cities.js"

import bike from "./bike.js"

const bikeManager = {
    createBike: async function createBike(bike, city) {
        // fake temp coordinates
        let bikeCollection = getCollection("bikes");

        if (!city._id) {
            throw new Error(`City object corrupt, attribute _id not found.`);
        }

        try {
        const city_id = city._id;
        // When are coordinates introduced?
        // This code assumes coordinates arrive with request
        const newBike =  {
            speed: bike.speed,
            location: bike.location,
            city_id: city._id,
            city_name: city.name,
            status: {
                available: bike.status.available,
                battery_level: bike.status.battery_level,
                in_service: bike.status.in_service
            }
        }

        const result = await bikeCollection.insertOne(newBike);

        return result;
        } catch (e) {
            console.error("Error creating new bike:", e.message || e);
            throw new Error("Failed to add bike to bike collection.");
        }
    },

    createManyBikes: async function createManyBikes(bikeArray, cityObject) {
        let bikeCollection = getCollection("bikes");

        // Map through the array of bikes and prepare multiple bike documents
        const newBikes = bikeArray.map((bike) => ({
            speed: bike.speed,
            location: bike.location,
            city_id: bike.city_id,
            city_name: bike.city_name,
            status: {
                available: bike.available,
                battery_level: bike.battery_level,
                in_service: bike.in_service,
            }
        }));

        try {
            // Insert multiple bikes
            let result = await bikeCollection.insertMany(newBikes);
            // if (result.ok) {
            //     // I am not sure bikes attribute in city is that useful
            //     result = cityManager.addNewBikes(newBikes, data.city_id);
            // }

            return result;
        } catch (e) {
            console.error("Error creating multiple new bikes:", e.message || e);
            throw new Error("Failed to add many bikes to bike collection.");
        }
    },

    getAllBikes: async function getAllBikes() {
        let collection = getCollection("bikes");

        console.log("hej");
    
        try {
            const result = await collection.find({}).toArray();
            return result;
        } catch (e) {
            console.error("Error retrieving bikes:", e.message || e);
            throw new Error("Failed to retrieve bikes from the database.");
        }
    },

    // Not yet refactored
    getAllBikesInCity: async function getAllBikesInCity(cityName) {
        try {
            const cities = await getCities();
            const city = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());


            if (!city) {
                console.error(`City '${cityName}' not found.`);
                throw new Error(`City '${cityName}' not found.`);
            }
    
            // Return the bikes for the found city
            return city.bikes;
        } catch (e) {
            console.error(`Failed to retrive bikes from ${cityName}.`, e.message || e);
            throw new Error(`Failed to retrive bikes from ${cityName}.`);
        }
    },

        // Not yet refactored
    startBike: async function startBike(bikeId) {
        // For now this only makes the bike unavailable 
        const result = await bike.start(bikeId)

        return result;
    },

    // Not yet refactored
    stopBike: async function stopBike(bikeId) {
        // For now this only makes the bike available and returns the location
        // assuming the trip logic i handled elsewhere and just needs
        // bike parking coordinates

        const location = await bike.stop(bikeId)

        // We should consider where to put the trip logic, ex:
        // await trip.end(tripId)
        return location;
    },

    bikeToService: async function bikeToService(bikeId) {
        const result = await bike.inService(bikeId)
        return result;
    },

    //maybe this should be elsewhere?
    findCityId: async function findCityId(cityName) {
        let cities = await getCities();
        const city = cities.find(city => city.name === cityName);
        return city._id
    }

}

export default bikeManager