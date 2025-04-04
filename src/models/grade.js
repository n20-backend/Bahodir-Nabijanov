const express = require('express');
const client = require("../config/db.js");

const app = express();

app.use(express.json());


app.get('/grade', async (req, res) => {
    try {
        const query = `SELECT * FROM grade`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.send(e.message);
    }
});



app.get('/grade/:id', async (req, res) => {
    try {
        const query = `SELECT * FROM grade WHERE grade_id = $1`;
        const result = await client.query(query, [req.params.id]);
        res.json(result.rows[0]);
    } catch (e) {
        res.send(e.message);
    }
});



app.post('/grade', async (req, res) => {
    try {
        const body = req.body;
        const query = `INSERT INTO 
            grade (
                student_id,
                course_id,
                grade,
                created_at,
                updated_at
            )
            VALUES (
                $1, 
                $2,
                $3,
                $4,
                $5
            ) returning *`;

        const result = await client.query(query, 
            [
                body.student_id,
                body.course_id,
                body.grade,
                new Date(),
                new Date(),
            ]);
        res.status(201).json(result.rows);
    } catch (e) {
        res.send(e.message)
    }
});



app.put('/grade/:id', async (req, res) => {
    try {
        const body = req.body;

        const query = `
            UPDATE course 
            SET 
                student_id = $1,
                course_id = $2,
                grade = $3,
                updated_at = now()
            WHERE grade_id = $4
            RETURNING *`;

        const result = await client.query(query, [student_id, course_id, grade]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Grade not found" });
        }

        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



app.delete('/grade/:id', async (req, res) => {
    try {

        const query = `DELETE FROM grades WHERE grade_id = $1 RETURNING *`;
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Grade not found" });
        }

        res.json({ message: "Grade deleted successfully", deleted: result.rows[0] });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;