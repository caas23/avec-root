import { getCollection } from "../db/collections.js"
import { getCities } from "../db/cities.js"

const bike = {
    reportState : async function reportState(bikeId) {
        let bikeCollection = getCollection("bikes");
        console.log(bikeId);

        try {
            const result = await bikeCollection.findOne({ bike_id: bikeId });
            //const warning = await this.checkForWarning(result)
            
            // if (warning) {
            //     // do something
            // }
            return result;
        } catch (e) {
            console.error("Error retrieving bike:", e.message || e);
            throw new Error(`Failed to find bike with bike_id: ${bikeId}.`);
        }
    },

    start : async function start(bikeId) {
        let bikeCollection = getCollection("bikes");
        try {
            const result = await bikeCollection.updateOne(
                { _id: bikeId },
                {
                    $set: {
                        status: { available: false }
                    }
                },
                { returnDocument: "after" }
            );

            return result;

        } catch (e) {
            console.error(e);
        }
    },

    stop : async function stop(bikeId) {
        let bikeCollection = getCollection("bikes");

        try {
            const result = await db.bikeCollection.findOneAndUpdate(
                { _id: bikeId },
                {
                    $set: {
                        status: { available: true }
                    }
                },
                { returnDocument: "after" }
            );

            return result.location;

        } catch (e) {
            console.error(e);
        }
    },

    // Not yet refactored
    checkForWarning : async function checkForWarning(bike) {
        let db = await database.getDb();
        const city = await db.cityCollection.findOne(bike.city_id)

        if (!city) {
            throw new Error(`City not found for city_id: ${bike.city_id}`);
        }

        const cityZone = city.area
        const citySpeedLimit = city.speedLimit

        let warning = false;

        if (!cityZone.includes(bike.location)) {
            
            warning = true;
            // stop bike or something
        }

        // I guess bike speed is already capped?

        // if (bike.speed > citySpeedLimit) {
        //     // stop bike or something
        //     warning = true;
        // }

        if (bike.status.battery_level < 15) {
            warning = true;
        }

        return warning
    },

    inService: async function inService(bikeId) {
        let db = await database.getDb();

        try {
            const result = await db.bikeCollection.updateOne(
                { _id: bikeId },
                { $set: {
                    status: {
                        in_service: true,
                        available: false
                    },
                    }
                }
            );

            return result;
        } catch (e) {
            console.error(e)
        } finally {
            db.client.close()
        }
    },

    serviceCompleted: async function serviceCompleted(bikeId) {
        let db = await database.getDb();

        try {
            const result = await db.bikeCollection.updateOne(
                { _id: bikeId },
                { $set: {
                    status: {
                        in_service: false,
                        available: true,
                        battery_level: 100
                    },
                    }
                }
            );

            return result;
        } catch (e) {
            console.error(e)
        } finally {
            db.client.close()
        }
    }
}

export default bike;