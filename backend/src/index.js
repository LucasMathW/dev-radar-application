const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require("http");
const cors = require('cors');

const {setupWebsocket} = require("./websocket");

const app = express(); 
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://lucasonminstack:bolachamagica@cluster0-0r3ap.mongodb.net/week10?retryWrites=true&w=majority',
                
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }

);

mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);

// Métodos HTTP: GET, POST, PUT, DELETE
//Tipos de parâmentos:
//Query Params: request.query (Filtros, ordenação, paginação)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para a criação ou alteração de um registro) 