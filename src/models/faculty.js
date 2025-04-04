const express = require('express');
const client = require("../config/db.js");

const app = express();

app.use(express.json());



app.get("/faculty", async (req, res) => {
    try {
        const query = `SELECT * FROM faculty`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});


app.get("/faculty/:id", async (req, res) => {
    try {
        const query = `SELECT * FROM faculty WHERE faculty_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


app.post("/faculty", async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO 
            faculty (
                name,
                description,
                created_at,
                updated_at
            )
            VALUES (
                $1,
                $2,
                $3,
                $4
            ) returning *`;
        const result = await client.query(query, 
            [
                body.name,
                body.description,
                new Date(),
                new Date()
            ]);
        
        res.status(201).json(result.rows);
    
    } catch (e) {
        res.send(e.message);
    }
});


app.put("/faculty/:id", async (req, res) => {
    try {
        const body = req.body;
        const query = `UPDATE faculty SET 
            name = $1,
            description = $2,
            updated_at = $3
            WHERE id = $4 returning *`;
        const result = await client.query(query, 
            [
                body.name,
                body.description,
                new Date(),
                req.params.id
            ]);
        
        res.status(201).json(result.rows);
    
    } catch (e) {
        res.send(e.message);
    }
});


app.delete("/faculty/:id", async (req, res) => {
    try {
        const query = `DELETE FROM faculty WHERE id = $1 returning *`;
        const result = await client.query(query, [req.params.id]);
        res.status(204).json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


module.exports = app;