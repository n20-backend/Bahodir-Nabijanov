import express from 'express';
import { getallfaculty, getByIdfaculty, createfaculty, updatefaculty, deletefaculty } from '../controller/faculty.controller.js';


const router = express.Router();

router.get('/', getallfaculty);
router.get('/:id', getByIdfaculty);
router.post('/', createfaculty);
router.put('/:id', updatefaculty);
router.delete('/:id', deletefaculty);

export {router as facultyRouter};
