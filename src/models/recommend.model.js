const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecommendSchema = new Schema({
      name: String,
      yelp: String,
      description: String,
      email: {
          type: String,
          required: true,
          unique: true
      }
    });

      // models/author.js
  const RecommendModel = mongoose.model('Recommend', RecommendSchema);

  module.exports = RecommendModel;