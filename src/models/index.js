let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/3000");

module.exports = {
    GroupModel: require('./GroupModel');
    RecommendationModel: require('./RecommendationModel');
}