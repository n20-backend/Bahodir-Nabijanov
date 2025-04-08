import express from 'express';
import { getallstudents, getByIdstudents, createstudents, updatestudents, deletestudents } from '../controller/student.controller.js';


const router = express.Router();


router.get('/', getallstudents);
router.get('/:id', getByIdstudents);
router.post('/', createstudents);
router.put('/:id', updatestudents);
router.delete('/:id', deletestudents);

export {router as studentsRouter};