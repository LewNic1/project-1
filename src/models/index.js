let mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/4000");

module.exports = {
    GroupModel: require('./group.model'),
    RecommendModel: require('./recommend.model')
}
