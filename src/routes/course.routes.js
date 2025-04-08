import express from 'express';
import { getallcourses, getByIdcourses, createcourses, updatecourses, deletecourses } from '../controller/course.controller.js';

const router = express.Router();

router.get('/', getallcourses);
router.get('/:id', getByIdcourses);
router.post('/', createcourses);
router.put('/:id', updatecourses);
router.delete('/:id', deletecourses);

export {router as coursesRouter};