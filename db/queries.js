const pool = require('./pool');

async function getUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user)
        return null;

    return user;
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    if (!user)
        return null;

    return user;
}

async function createUser(firstName, lastName, username, passwordHash) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, passwordHash]);
}

module.exports = { getUserById, getUserByUsername, createUser, };