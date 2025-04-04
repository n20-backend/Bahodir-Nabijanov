import client from "../config/db.js";

import express from 'express';


export const getAllFaculties = async (req, res) => {
    try {
        const query = `SELECT * FROM faculty`;
        const result = await client.query(query);
        res.json(result.rows);
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
};



export const getFacultyById = async (req, res) => {
    try {
        const query = `SELECT * FROM faculty WHERE faculty_id = $1`;
        const result = await client.query(query, [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Faculty not found');
        }
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
};


export const createFaculty = async (req, res) => {
    try {
        const { name, description } = req.body;
        const query = `INSERT INTO faculty (name, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await client.query(query, [
            name,
            description,
            new Date(),
            new Date()
        ]);
        res.status(201).json(result.rows[0]);
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
};


export const updateFaculty = async (req, res) => {
    try {
        const { name, description } = req.body;
        const query = `UPDATE faculty SET name = $1, description = $2, updated_at = $3 WHERE faculty_id = $4 RETURNING *`;
        const result = await client.query(query, [
            name,
            description,
            new Date(),
            req.params.id
        ]);
        if (result.rows.length === 0) {
            return res.status(404).send('Faculty not found');
        }
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
};

export const deleteFaculty = async (req, res) => {
    try {
        const query = `DELETE FROM faculty WHERE faculty_id = $1 RETURNING *`;
        const result = await client.query(query, [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Faculty not found');
        }
        res.status(204).send();
    } catch (e) {
        res.status(500).send(`Error: ${e.message}`);
    }
};
