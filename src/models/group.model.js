const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
      password: String, // <---- we need to set this
      Recommendation: {type: Schema.Types.ObjectId, ref: 'Recommendation'}
    });

      // Our group model
  const GroupModel = mongoose.model('Group', GroupSchema);

  module.exports = GroupModel;