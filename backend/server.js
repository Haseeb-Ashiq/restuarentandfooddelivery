const app = require("./src/app");
const http=require('http');
require('dotenv').config();
(()=>{
console.log(process.env.REDIS_HOST,process.env.REDIS_PORT)
})()
const httpServer=http.createServer(app)
httpServer.listen(5000,()=>console.log('server is running at 5000'))