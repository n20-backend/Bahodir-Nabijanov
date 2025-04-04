const express = require('express');
const client = require("../config/db.js");

const app = express();

app.use(express.json());


app.get('user', async (req, res) => {
    try {
        const query = `SELECT * FROM user`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});


app.get('/user/:id', async (req, res) => {
    try {
        const query = `SELECT * FROM user WHERE user_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


app.post('/user', async (req, res) => {
    try {
        const query = `INSERT INTO
            user (
                email,
                user_name,
                password,
                role,
                created_at,
                updated_at
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            ) returning *`;
        const result = await client.query(query,
            [
                body.email,
                body.user_name,
                body.password,
                body.role,
                new Date(),
                new Date(),
            ]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



app.put('/user/:id', async (req, res) => {
    try {
        const body = req.body;
        
   
        const hashedPassword = body.password; 

        const query = `
            UPDATE user 
            SET email = $1, 
                user_name = $2, 
                password = $3, 
                role = $4, 
                updated_at = $5
            WHERE user_id = $6 
            RETURNING *`;

        const result = await client.query(query, [
            body.email,
            body.user_name,
            hashedPassword, 
            body.role,
            new Date(),
            req.params.id
        ]);

        res.status(200).json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});



app.delete('user/:id', async (req,) => {
    try {
        const query = `DELETE FROM user WHERE user_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.status(204).json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


module.exports = app;
