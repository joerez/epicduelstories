const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const FactionSchema = new Schema({
  name        : { type : String, required: true },
  description     : { type: String},
  imgurl          : { type: String, required: false },
  pending         : { type: Boolean, default: true },
  comments : [{}]
});

module.exports = mongoose.model('Faction', FactionSchema);
