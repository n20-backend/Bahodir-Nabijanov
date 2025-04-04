const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/grade', userController.getAllUsers);
router.get('/grade/:id', userController.getUsersById);
router.post('/grade', userController.createUser);
router.put('/grade/:id', userController.updateUser);
router.delete('/grade/:id', userController.deleteUser);

module.exports = router;