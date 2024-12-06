// Replace with actual db location
const database = require("../db/database");
const bike = require("./bike.js");

const manager = {
    createBike: async function createBike(data) {
        // This line might change depending on how the db object is returned
        let db = await database.getDb();

        // When are coordinates introduced?
        // This code assumes coordinates arrive with request
        const newBike =  {
            speed: null,
            location: data.coordinates,
            city_id: data.city_id,
            city_name: data.city_name,
            status: {
                battery_level: 100,
                in_service: false,
                available: true
            }
        }

        try {
            const result = await db.bikeCollection.insertOne(newBike);
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

    createManyBikes: async function createManyBikes(data) {
        let db = await database.getDb();
    
        // Map through the data and prepare multiple bike documents
        const newBikes = data.map((bike) => ({
            speed: null,
            location: bike.location,
            city_id: bike.city_id,
            city_name: bike.city_name,
            status: {
                battery_level: 100,
                in_service: false,
                available: true
            }
        }));
    
        try {
            // Insert multiple bikes
            let result = await db.bikeCollection.insertMany(newBikes);
            if (result.ok) {
                result = cityManager.addNewBikes(newBikes, data.city_id);
            }

            return result;
        } catch (e) {
            console.error('Error inserting bikes:', e);
        } finally {
            await db.client.close();
        }
    },

    getAllBikes: async function getAllBikes() {
        // We should consider indexing here if request is too slow
        let db = await database.getDb();

        try {
            const result = await db.bikeCollection.find({}).toArray();

            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },


    getAllBikesInCity: async function getAllBikesInCity(cityId) {
        let db = await database.getDb();

        try {
            const result = await db.bikeCollection.find({ city_id: cityId }).toArray();

            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

    startBike: async function startBike(bikeId) {
        // For now this only makes the bike unavailable 
        const result = await bike.start(bikeId)

        return result;
    },

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

}