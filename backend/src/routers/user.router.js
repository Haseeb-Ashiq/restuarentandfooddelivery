const express = require('express');
const { register, getUsers, getUser, updateUser, deleteUser, login } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/user-login',login);
userRouter.get('/get-users', authMiddleware, getUsers);
userRouter.get('/get-user/:id', authMiddleware, getUser);
userRouter.patch('/update-user/:id', authMiddleware, updateUser);
userRouter.delete('/delete-user/:id', authMiddleware, deleteUser);
module.exports = userRouter;