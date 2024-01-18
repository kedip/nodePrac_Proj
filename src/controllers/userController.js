import { pool } from "../models/model"

export const getUser = async (req, res) => {
    const data = pool.query("SELECT * FROM users")
    res.json({ "Data": data })
}

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const data = await pool.query("INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING *", [first_name, last_name, email, password]);
    console.log(data.rows);
    res.json({ "Data": data.rows });
}

export const deletUser = async (req, res) => {
    const {userId} = req.params;

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
  