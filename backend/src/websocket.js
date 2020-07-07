const socketio = require("socket.io");
const parserStringAsArray = require("./controllers/utils/parserStringAsArray");
const calculateDistance = require("./controllers/utils/calculateDistance");

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket =>{
        console.log(socket.id);
        const {latitude, longitude, techs} = socket.handshake.query;

        /* FAZENDO UM TESTE NO SOCKET
        setTimeout(()=>{
            socket.emit('message', 'Hellow World');
        }, 3000)*/

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parserStringAsArray(techs)
        });
    });
};

//FUNÇÃO QUE FILTRA CONECXÕES 
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => { 
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

//FUNÇÃO RESPONSÁVEL POR ENVIAR DADOS PARA A CONEXÃO SOCKET ESTABELECIDA NO FRONT-END
exports.sendMessage = (to, message, data) => {
     to.forEach(connection => {
        io.to(connection.id).emit(message, data) ;
     })
}
