const mongoose = require('mongoose');
const Schema = mongoose.Schema;

Recommendation = require('./recommendation.model')

const GroupSchema = new Schema({
      name: String, // <- To identify the group, will become picklist with a couple options
      password: String, // <---- we need to set this
      Recommendation: {type: Schema.Types.ObjectId, ref: 'RecommendationModel'}
    });

      // Our group model
  const GroupModel = mongoose.model('Group', GroupSchema);

  module.exports = GroupModel;