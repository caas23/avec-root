import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectToDatabase } from "./db/db";
import { getUsers } from './db/users';
import { getCities } from './db/cities';
import { getBikes } from './db/bikes';

dotenv.config();

if (!process.env.PORT) {
    console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10) || 1338;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Greetings, friend of AVEC!");
});

// GET /users
app.get("/users", (req, res) => {
    getUsers(req, res);
});

// GET /cities
app.get("/cities", (req, res) => {
    getCities(req, res);
});

// GET /bikes
app.get("/bikes", (req, res) => {
    getBikes(req, res);
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
