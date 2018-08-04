const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const PlayerSchema = new Schema({
  username        : { type : String, required: true },
  description     : { type: String},
  imgurl          : { required: false, type: mongoose.SchemaTypes.Url },
  pending         : { type: Boolean, default: true }
});

module.exports = mongoose.model('Player', PlayerSchema);
