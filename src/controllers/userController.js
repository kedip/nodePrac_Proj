import { pool } from "../models/model"
import bcrypt from "bcrypt";
import { passwordHas } from "../helpers/passwordhas";
import { generateJwtAccessToken, generateJwtIdToken } from "../helpers/jwtHelper";






export const getUser = async (req, res) => {
  const data = await pool.query("SELECT * FROM users")
  console.log(data.rows);
  res.json({ "Data": data.rows })
}



export const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = passwordHas(password);
    console.log(hashedPassword);
    // Store the hashed password in the database
    const data = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email, password",
      [first_name, last_name, email, hashedPassword]
    );
    console.log(data.rows);
    res.json({ "Data": data.rows });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deletUser = async (req, res) => {
  const { userId } = req.query;

  console.log(userId);
  try {
    const deletedUser = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [userId]);

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser: deletedUser.rows[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateUser = async (req, res) => {
  const userId = req.query.userId;
  const { first_name, last_name, email } = req.body;

  try {
    const updatedUser = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4 RETURNING *",
      [first_name, last_name, email, userId]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', updatedUser: updatedUser.rows[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    // Retrieve the user data from the database
    const userData = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userData.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Verify the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userData.rows[0].password);
    console.log(userData.rows);
    if (passwordMatch) {
      let tokenData = {
        first_name: userData.rows[0].first_name,
        last_name: userData.rows[0].last_name,
        email: userData.rows[0].email,
        user_id: userData.rows[0].user_id
      }
      const AccessToken = generateJwtAccessToken(userData.rows[0].user_id);
      const IdToken = generateJwtIdToken(tokenData);

      let data = {
        AccessToken: AccessToken,
        IdToken: IdToken
      }

      res.json({ message: 'Login successful', data });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};