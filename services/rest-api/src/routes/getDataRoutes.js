import express from 'express';
import { getCities } from '../../../db/cities.js';
import { getBikes } from '../../../db/bikes.js';
import bikeManager from "../../../bike-logic/bikeManager.js"


const router = express.Router();

// GET /bikes
router.get("/", async (req, res) => {

    res.json("hej getData routes");
});

// GET /cities
router.get("/all/cities", async (req, res) => {
    const result = await getCities();
    res.json(result);
});

router.get("/all/bikes", async (req, res) => {
    const result = await bikeManager.getAllBikes();

    res.json(result);
});

router.post("/all/bikes/in/city", async (req, res) => {
    // fake post variable
    let city = req.body.city;
    city = "Lund";
    console.log(city);

    const result = await bikeManager.getAllBikesInCity(city);
    console.log("hello");

    res.json(result);
});

export default router;