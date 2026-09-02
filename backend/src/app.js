const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/user.router');
const customerRouter=require('./routers/customer.router');
const dbConnection = require('./utils/db');
const app = express();
dbConnection();
app.use(cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE,UPDATE",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({ limit: '5gb' }));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/customer',customerRouter);

module.exports = app;