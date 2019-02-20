//connecting to db
const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/4000");

//export to 
module.exports = {
    GroupModel: require('./GroupModel'),
    RecommendationModel: require('./RecommendationModel')
};