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

    bikeToService: async function bikeToService(bikeId) {
        const result = bike.inService(bikeId)
        return result;
    }
}