const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require("http");
const cors = require('cors');
const {config} = require('dotenv');
const {join} = require('path')

//Config env
const configPath = join(__dirname, '..', './config', '.dev.env') 
config({path : configPath})

//define variables 
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const {setupWebsocket} = require("./websocket");

const app = express(); 
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(MONGO_URI,
                
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }

);

mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(PORT, ()=>{
  console.log(`Server is running on PORT: ${PORT}`)
}); 