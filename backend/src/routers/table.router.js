const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { addTable, getTables, getTable, updateTable, deleteTable } = require('../controllers/table.controller');

tableRouter = express.Router();

tableRouter.post('/add-table', addTable);
tableRouter.get('/get-tables', getTables);
tableRouter.get('/get-table/:id', authMiddleware, getTable);
tableRouter.patch('/update-table/:id', authMiddleware, updateTable);
tableRouter.delete('/delete-table/:id', authMiddleware, deleteTable);

module.exports = tableRouter;