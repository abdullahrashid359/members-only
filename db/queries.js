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

async function updateMembershipStatus(id) {
    await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [id]);
}

async function createMessage(title, text, userId) {
    await pool.query("INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)", [title, text, userId]);
}

module.exports = { getUserById, getUserByUsername, createUser, updateMembershipStatus, createMessage };