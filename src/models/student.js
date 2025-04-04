const express = require('express');
const client = require("../config/db.js");


const app = express();

app.use(express.json());

app.get("/student", async (req, res) => {
    try {
            const query = `SELECT * FROM student`;
            const result = await client.query(query);
            res.json(result.rows);
        } catch (e) {
            res.send(e.message);
        }
});


app.get("/student/:id", async (req, res) => {
    try {
        const query = `SELECT * FROM student WHERE student_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


app.post("/student", async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO 
            student (
                first_name,
                last_name,
                email,
                birthdate,
                enrollment_date,
                status,
                address,
                phone_number,
                created_at,
                updated_at
            )
            values (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10
            ) returning *`;
        const result = await client.query(query, 
            [
                body.first_name,
                body.last_name,
                body.email,
                body.birthdate,
                body.enrollment_date,
                body.status,
                body.address,
                body.phone_number,
                new Date(),
                new Date()
            ]);    

        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



app.put("/student/:id", async (req, res) => {
    try {
        const body = req.body;
        const query = `UPDATE student SET
            first_name = $1,
            last_name = $2,
            email = $3,
            birthdate = $4,
            enrollment_date = $5,
            status = $6,
            address = $7,
            phone_number = $8,
            updated_at = $9
            WHERE student_id = $10 returning *`;
        const result = await client.query(query, 
            [
                body.first_name,
                body.last_name,
                body.email,
                body.birthdate,
                body.enrollment_date,
                body.status,
                body.address,
                body.phone_number,
                new Date(),
                req.params.id
            ]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



app.delete("/student/:id", async (req, res) => {
    try {
        const query = `DELETE FROM student WHERE student_id = $1 returning *`;
        const result = await client.query(query, [req.params.id]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



module.exports = app;