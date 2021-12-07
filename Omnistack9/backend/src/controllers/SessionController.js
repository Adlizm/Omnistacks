const User = require("../models/User");

// Index , Show, Store, Update, Destroy 

module.exports = {
    async store(require ,response){
        const { email } = require.body;
        let user = await User.findOne({ email });
        
        if(user)
            return response.json(user);
        
        user = await User.create({ email });
        return response.json(user);
    }
}
