const express = require('express');
const userController = require('../controller/controllerFaculty');

const router = express.Router();

router.get('/faculty', userController.getAllUsers);
router.get('/faculty/:id', userController.getUsersById);
router.post('/faculty', userController.createUser);
router.put('/faculty/:id', userController.updateUser);
router.delete('/faculty/:id', userController.deleteUser);

module.exports = router;
