const axios = require("axios");
const Dev = require('../models/Dev');
const parseStringAsArray = require("./utils/parserStringAsArray");
const {findConnections, sendMessage} = require("../websocket");
      
module.exports = {
    async index(req, res){
        
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res){

        const {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const {name = login, avatar_url, bio} = apiResponse.data;

            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            const sendSocketMessagerTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            console.log(sendSocketMessagerTo);
            sendMessage(sendSocketMessagerTo, 'new-dev', dev);
        }

        return res.json(dev);

    },

    async show(req, res){

        const dev = await Dev.findById(req.params.id)

        return res.json(dev)
    },

    async update(req, res){
        const dev = await Dev.findByIdAndUpdate(req.params.id, req.body, {new:true})

        return res.json(dev)
    },

    async remove(req, res){
        
        await Dev.findByIdAndRemove(req.params.id)

        return res.send("Este intem foi removido")
    },
    
};