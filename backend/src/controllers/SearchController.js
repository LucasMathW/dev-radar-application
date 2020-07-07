const Dev = require("../models/Dev");
const parseStingAsArray = require("./utils/parserStringAsArray")

module.exports = {
    async index(req, res){
        const {latitude, longitude, techs} = req.query;

        const techsArray = parseStingAsArray(techs); 

        console.log(latitude);
        console.log(longitude);

        const devs = await Dev.find({
                techs:{
                    $in: techsArray,
                },
                location:{
                    $near:{
                        $geometry:{
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000,
                    },
                },
            });

        return res.json( {devs} );

    }
}