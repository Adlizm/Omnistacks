const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
    async index(require, response){
        const { tech } = require.query;

        const spots = await Spot.find({ techs: tech });
        
        return response.json(spots);
    },

    async store(require, response){
        const {price, company, techs} = require.body;
        const {filename} = require.file;
        const {user_id} = require.headers;

        const user = await User.findById(user_id);
        if(!user)
            return response.json({error: "User id invalid"});

        const spot = await Spot.create({
            price,
            company,
            techs: techs.split(',').map((tech) => tech.trim()),
            thumbnail: filename,
            user: user_id 
        });

        return response.json(spot);
    },
}