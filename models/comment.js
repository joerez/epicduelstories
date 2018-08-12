const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    createdAt: Date,
    title: String,
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    playerId: {type: Schema.Types.ObjectId, ref: 'Player'},
    playerUserName: String,
    factionName: String,
    factionId: {type: Schema.Types.ObjectId, ref: 'Faction'},
    commentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
    commentIdStr: String,
    username: String,
    day: String,
    onAPlayer: {type: Boolean, default: false},
    onAFaction: {type: Boolean, default: false},
    onAComment: {type: Boolean, default: false},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    commentLength: String,
    updatedAt: Date,
    initialTime: String,
    day: String,
    initialTime: String
});

module.exports = mongoose.model('Comments', CommentSchema);
