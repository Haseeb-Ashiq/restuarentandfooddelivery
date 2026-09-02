const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path=require('path');
const userRouter = require('./routers/user.router');
const customerRouter=require('./routers/customer.router');
const catagoryRouter=require('./routers/catagory.router');
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
app.use("/public/", express.static(path.join(__dirname, "uploads")));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/customer',customerRouter);
app.use('/api/v1/catagory',catagoryRouter);
module.exports = app;