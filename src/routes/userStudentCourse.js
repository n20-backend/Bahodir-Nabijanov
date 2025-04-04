const express = require('express');
const userController = require('../controller/controllerFaculty');

const router = express.Router();

router.get('/student_courses', userController.getAllUsers);
router.get('/student_courses/:id', userController.getUsersById);
router.post('/student_courses', userController.createUser);
router.put('/student_courses/:id', userController.updateUser);
router.delete('/student_courses/:id', userController.deleteUser);

module.exports = router;