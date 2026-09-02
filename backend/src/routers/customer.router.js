const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { deleteCustomer, updateCustomer, getCustomer, getCustomers } = require('../controllers/customer.controller');

customerRouter = express.Router();

customerRouter.post('/register', register);
customerRouter.post('/customer-login',login);
customerRouter.get('/get-customers', authMiddleware, getCustomers);
customerRouter.get('/get-customer/:id', authMiddleware, getCustomer);
customerRouter.patch('/update-customer/:id', authMiddleware, updateCustomer);
customerRouter.delete('/delete-customer/:id', authMiddleware, deleteCustomer);
module.exports = customerRouter;