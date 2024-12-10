// import database from "../db/db.js"

const bike = {
    reportState : async function reportState(bikeId) {
        let db = await database.getDb();
        try {
            const result = await db.bikeCollection.findOne(bikeId);
            //const warning = await this.checkForWarning(result)
            
            // if (warning) {
            //     // do something
            // }
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

    start : async function start(bikeId) {
        let db = await database.getDb();
        try {
            const result = await db.bikeCollection.updateOne(
                { _id: bikeId },
                {
                    $set: {
                        status: { available: false }
                    }
                }
            );

            return result;

        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

    stop : async function stop(bikeId) {
        let db = await database.getDb();
        try {
            const result = await db.bikeCollection.findOneAndUpdate(
                { _id: bikeId },
                {
                    $set: {
                        status: { available: true }
                    }
                },
                { returnDocument: "after" } // Return the updated document
            );

            return result.location;

        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    },

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