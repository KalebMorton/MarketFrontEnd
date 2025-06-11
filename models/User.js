//  placeholders for DB queries. use SQL/pg here.
const db = require('../db'); 

exports.findUserByUsername = async (username) => {
  // Replace this with DB query
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

exports.createUserInDB = async (username, hashedPassword) => {
  const result = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );
  return result.rows[0];
};
