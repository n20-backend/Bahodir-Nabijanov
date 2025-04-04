const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/course', userController.getAllUsers);
router.get('/course/:id', userController.getUsersById);
router.post('/course', userController.createUser);
router.put('/course/:id', userController.updateUser);
router.delete('/course/:id', userController.deleteUser);

module.exports = router;