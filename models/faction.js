const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const FactionSchema = new Schema({
  name        : { type : String, required: true },
  description     : { type: String},
  imgurl          : { required: false, type: mongoose.SchemaTypes.Url },
  pending         : { type: Boolean, default: true },
  comments : [{}]
});

module.exports = mongoose.model('Faction', FactionSchema);
