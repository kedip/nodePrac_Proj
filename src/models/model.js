import { pool } from "../helpers/db";
 
let createTable = `
 
 
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  initials VARCHAR(255),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
`;
 
pool.query(createTable, function (err, result, field) {
  if (err) {
    console.log(err.message);
  }
});
 
export { pool };