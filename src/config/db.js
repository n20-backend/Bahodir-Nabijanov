import pg from "pg";
const { Client } = pg;

const client = new Client({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "talaba",
    password: process.env.PG_PASSWORD || "root",
    port: process.env.PG_PORT || 5432,
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('PostgreSQL muvaffaqiyatli ulandi!');
    } catch (err) {
        console.error('Ulanishda xatolik!', err);
    }
}

connectToDatabase();

export default client;
