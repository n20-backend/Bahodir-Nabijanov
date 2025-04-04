const express = require('express');
const userController = require('../controller/controllerFaculty');

const router = express.Router();

router.get('/student', userController.getAllUsers);
router.get('/student/:id', userController.getUsersById);
router.post('/student', userController.createUser);
router.put('/student/:id', userController.updateUser);
router.delete('/student/:id', userController.deleteUser);

module.exports = router;