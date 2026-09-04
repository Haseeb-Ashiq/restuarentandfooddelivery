const express = require('express');
const { addOrder } = require('../controllers/order.controller');
// const { authMiddleware } = require('../middlewares/auth.middleware');
// const { addTable, getTables, getTable, updateTable, deleteTable } = require('../controllers/table.controller');

orderRouter = express.Router();

orderRouter.post('/add-order', addOrder);
// orderRouter.get('/get-tables', authMiddleware, getTables);
// orderRouter.get('/get-table/:id', authMiddleware, getTable);
// orderRouter.patch('/update-table/:id', authMiddleware, updateTable);
// orderRouter.delete('/delete-table/:id', authMiddleware, deleteTable);

module.exports = orderRouter;