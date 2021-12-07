const Booking = require("../models/Booking");

module.exports = {
    async store(require, response){
        const { date } = require.body;
        const { user_id } = require.headers;
        const { spot_id } = require.params;
        
        const booking = await Booking.create({
            date,
            user: user_id,
            spot: spot_id
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = require.connectedUser[booking.spot.user]
        if(ownerSocket)
            require.io.to(ownerSocket).emit('booking_request', booking);        
        return response.json(booking);
    }
}