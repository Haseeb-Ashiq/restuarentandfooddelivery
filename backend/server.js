const app = require("./src/app");
const http=require('http');

const httpServer=http.createServer(app)

httpServer.listen(5000,()=>console.log('server is running at 5000'))