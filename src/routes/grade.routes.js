import express from 'express';
import { getallgrades, getByIdgrades, creategrades, updategrades, deletegrades } from '../controller/grade.controller.js';

const router = express.Router();

router.get('/', getallgrades);
router.get('/:id', getByIdgrades);
router.post('/', creategrades);
router.put('/:id', updategrades);
router.delete('/:id', deletegrades);

export {router as gradeRouter}