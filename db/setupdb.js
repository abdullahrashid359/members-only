const net = require('node:net');
net.setDefaultAutoSelectFamily(false);

process.loadEnvFile('.env');
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    membership_status BOOLEAN NOT NULL DEFAULT false,
    admin_status BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

`;

async function main() {
    console.log("seeding...");

    let client;

    try {
        client = new Client(process.env.DATABASE_URL);

        await client.connect();
        await client.query(SQL);

        console.log("done");
    } catch (err) {
        console.log("error seeding database: ", err);
    } finally {
        if(client)
            await client.end();
    }
}

main();