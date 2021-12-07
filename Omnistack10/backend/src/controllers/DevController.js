const axios = require("axios");

const Dev = require("../models/Dev");

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    
    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
        const techsArray = techs.split(",").map(tech => tech.trim());

        const location =  {
            type: "Point",
            coordinates: [longitude, latitude]
        }
        
        let dev = await Dev.findOne({ github_username });
        if(dev){
            await dev.updateOne({techs: techsArray, location});
            return response.json(dev);
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);  
        const { bio, avatar_url, name = login } = apiResponse.data;
        
        dev = await Dev.create({
            name, 
            github_username, 
            bio, 
            avatar_url, 
            techs: techsArray,
            location
        });

        return response.json(dev);
    }
}