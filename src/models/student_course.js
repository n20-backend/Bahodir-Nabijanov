const express = require('express');
const client = require('../config/db.js');

const app = express();
app.use(express.json());



app.get('/student_course', async (req, res) => {
    try {
        const query = "SELECT * FROM student_courses";
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});



app.get('/student_course/:id', async (req, res) => {
    try {
        const query = "SELECT * FROM student_courses WHERE student_course_id = $1";
        const result = await client.query(query, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Talaba topilmadi yoki kursga yozilmagan" });
        }

        res.json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});



app.post('/student_course', async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
        const query = "INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2) RETURNING *;";
        const result = await client.query(query, [student_id, course_id]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});



app.put('/student_course/:id', async (req, res) => {
    try {
        const body = req.body;
        const query = `
            UPDATE student_courses 
            SET student_id = $1, course_id = $2 
            WHERE student_course_id = $3 
            RETURNING *`;
        const result = await client.query(query, [student_id, course_id, req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Talaba kursga yozilmagan yoki topilmadi" });
        }

        res.json(result.rows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});



app.delete('/student_course/:id', async (req, res) => {
    try {
        const query = "DELETE FROM student_courses WHERE student_course_id = $1 RETURNING *;";
        const result = await client.query(query, [req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Bu yozuv mavjud emas" });
        }

        res.json({ message: "Talaba kursdan chiqarildi" });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = app;
