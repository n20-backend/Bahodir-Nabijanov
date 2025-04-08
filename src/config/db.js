import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "talaba",
    password: process.env.PG_PASSWORD || "root",
    port: process.env.PG_PORT || 5432,
});

pool.connect((err) => {
    if(err) {
        console.log('Ulanishda xatolik!');
    } else {
        console.log('Muvaffaqiyat!');
    }
});


export default pool;