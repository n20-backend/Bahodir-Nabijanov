const express = require('express');
const client = require("../config/db.js");

const app = express();

app.use(express.json());

app.get('/course', async (req, res) => {
    try {
        const query = `SELECT * FROM course`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});


app.get('/course/:id', async (req, res) => {
    try {
        const query = `SELECT * FROM course WHERE course_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});


app.post('/course', async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO 
            course (
                title,
                description,
                credits,
                faculty_id,
                status,
                created_at,
                updated_at
            )
            VALUES (
                $1, 
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            ) returning *`;

        const result = await client.query(query, 
            [
                body.title,
                body.description,
                body.credits,
                body.faculty_id,
                body.status,
                new Date(),
                new Date(),
            ]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message)
    }
});



app.put('/course/:id', async (req, res) => {
    try {
        const body = req.body;

        const query = `
            UPDATE course 
            SET 
                title = $1,
                description = $2,
                credits = $3,
                faculty_id = $4,
                status = $5,
                updated_at = now()
            WHERE course_id = $6
            RETURNING *`;

        const result = await client.query(query, [title, description, credits, faculty_id, status, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



app.delete('/course/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM course WHERE course_id = $1 RETURNING *`;
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted successfully", deleted: result.rows[0] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;