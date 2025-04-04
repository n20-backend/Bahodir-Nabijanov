const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUsersById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;