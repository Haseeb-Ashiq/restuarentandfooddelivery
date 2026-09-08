const express = require('express');
const { addOrder, getOrders } = require('../controllers/order.controller');
// const { authMiddleware } = require('../middlewares/auth.middleware');
// const { addTable, getTables, getTable, updateTable, deleteTable } = require('../controllers/table.controller');

orderRouter = express.Router();

orderRouter.post('/add-order', addOrder);
orderRouter.get('/get-orders', getOrders);
// orderRouter.get('/get-table/:id', authMiddleware, getTable);
// orderRouter.patch('/update-table/:id', authMiddleware, updateTable);
// orderRouter.delete('/delete-table/:id', authMiddleware, deleteTable);

module.exports = orderRouter;