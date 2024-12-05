// Replace with actual db location
const database = require("../db/database");

const bike = {
    // Will this object need attributes like below?

    // speed: null,
    // location: null,
    // city_id: null,
    // city_name: null,
    // status: {
    //     battery_level: null,
    //     in_service: null,
    //     available: null
    // },


    // Is it more fitting to have this in manager?
    // Maybe it is nice to take some load of the manager..
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

    reportState : function reportState() {
        // Initially I was thinking something like this:
        return this.attributes
    },

    reportState2 : async function reportState2(bikeId) {
        // Maybe something like this makes more sense?
        let db = await database.getDb();
        try {
            const result = await db.bikeCollection.findOne(bikeId);
            return result;
        } catch (e) {
            console.error(e);
        } finally {
            await db.client.close();
        }
    }

}