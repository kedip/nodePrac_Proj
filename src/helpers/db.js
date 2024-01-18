import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();


const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL database connected');
    } catch (err) {
        console.error('Error connecting to PostgreSQL database', err);
    }
};


// connectToDatabase();



export { pool }