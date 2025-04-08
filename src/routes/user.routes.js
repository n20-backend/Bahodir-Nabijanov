import express from 'express';
import { getallusers, getByIdusers, createusers, updateusers, deleteusers } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', getallusers);
router.get('/:id', getByIdusers);
router.post('/', createusers);
router.put('/:id', updateusers);
router.delete('/:id', deleteusers);

export {router as usersRouter};