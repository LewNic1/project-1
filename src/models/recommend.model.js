const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecommendSchema = new Schema({
      name: String,
      placeId: String,
      description: String,
      email: {
          type: String,
          required: true
      },
      latitude: Number,
      longitude: Number,
      author: String
    });

     
  const RecommendModel = mongoose.model('Recommend', RecommendSchema);

  module.exports = RecommendModel;