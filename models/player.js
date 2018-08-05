const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  username        : { type : String, required: true },
  description     : { type: String},
  imgurl          : { required: false },
  pending         : { type: Boolean, default: true },
  comments : [{}]
});

module.exports = mongoose.model('Player', PlayerSchema);
