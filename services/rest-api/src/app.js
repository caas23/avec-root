import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "../../db/db.js";
import { getUsers } from '../../db/users.js';
import { getCities, getCity } from '../../db/cities.js';
import { getParking } from '../../db/parking.js';
import { getBikes } from '../../db/bikes.js';
import bikeManager from "../../bike-logic/bikeManager.js"

dotenv.config();

if (!process.env.PORT) {
    console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT, 10) || 1338;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
    })
  );
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Greetings, friend of AVEC!");
});

// GET /users
app.get("/users", async (req, res) => {
    const result = await getUsers();
    res.json(result);
});

// GET /cities
app.get("/cities", async (req, res) => {
    const result = await getCities();
    res.json(result);
});

// GET /cities/{city_name}
app.get("/city/:city_name", async (req, res) => {
    const city_name = req.params.city_name;
    const result = await getCity(city_name);
    console.log(city_name);
    res.json(result);
});

// GET /bikes
app.get("/bikes", async (req, res) => {
    const result = await getBikes();
    console.log(result);
    res.json(result);
});

// GET all parking zones
app.get("/parking", async (req, res) => {
    const result = await getParking();
    console.log(result);
    res.json(result);
});

// TEST post /bikes/{city_name}
app.post("/add/bike/to/city", async (req, res) => {
    let newBike = req.body.bike;
    let city = req.body.city;

    // fake new test bike
    // comment these out when using actual post objects
    newBike =  {
        speed: 0,
        location: [55.7047,13.191],
        city_id: "674ec1e6d64b52c8cf519661",
        city_name: "Lund",
        status: {
            available: true,
            battery_level: 100,
            in_service: false
        }
    }

    // fake new test city object
    city =  {
        _id: "674ec1e6d64b52c8cf519661",
        name: "Lund",
    }

    const result = await bikeManager.createBike(newBike, city);

    console.log(result);
    res.json(result);
});

// TEST post /bikes/{city_name}
app.post("/add/many/bikes/to/city", async (req, res) => {
    let bikes = req.body.bikes;
    let city = req.body.city;


    // Fake test bike array
    bikes = [
        {
            speed: 0,
            location: [55.7047, 13.191],
            city_id: null,
            city_name: null,
            status: {
                available: true,
                battery_level: 100,
                in_service: false
            }
        },
        {
            speed: 0,
            location: [59.8586, 17.6389],
            city_id: "6e2b9a679b7e1f2387d06399",
            city_name: "Uppsala",
            status: {
                available: true,
                battery_level: 85,
                in_service: true
            }
        },
        {
            speed: 0,
            location: [57.7089, 11.9746],
            city_id: "4cf3dbfd6d43423e9d125ad1",
            city_name: "Gothenburg",
            status: {
                available: false,
                battery_level: 50,
                in_service: true
            }
        }
    ];

    // fake new test city object
    city =  {
        _id: "674ec1e6d64b52c8cf519661",
        name: "Lund",
    }


    const result = await bikeManager.createManyBikes(bikes, city);

    console.log(result);
    res.json(result);
});

// Start the server after connecting to the database
const startServer = async () => {
    try {
        // Connect to the database
        const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k5lbc.mongodb.net/avec?retryWrites=true&w=majority&appName=Cluster0`;

        await connectToDatabase(mongoUri);

        // Start the Express server
        const port = process.env.PORT || 1338;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

// Start the server
startServer();
