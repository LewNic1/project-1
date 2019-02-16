const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
      name: String,
      yelp: String,
      description: String,
      email: {
        type: String,
        required: true,
        unique: true
    }
    });

  
  const RecommendationModel = mongoose.model('Recommendation', RecommendationSchema);

  module.exports = RecommendationModel;