import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});
const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected successfully');
    }
    catch (err) {
        console.error('Ran into error connecting database:', err);
        process.exit(1);
    }
};
export { pool, connectDB };
