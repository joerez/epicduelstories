const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const UserSchema = new Schema({
  createdAt       : { type : Date },
  updatedAt       : { type : Date }
  username        : { type : String, required: true, maxLength: 16 },
  content         : { type: String},
  imgurl          : { type: mongoose.SchemaTypes.Url },
  pending: { type: Boolean, default: true },
});

UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }



module.exports = mongoose.model('User', UserSchema);
