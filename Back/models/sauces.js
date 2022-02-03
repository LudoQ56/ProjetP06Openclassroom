const mongoose = require('mongoose');
const ModelsSauce = mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String},
    imageUrl: { type: String},
    heat: { type: Number},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: ['String <userid>'] },
    usersDisliked: { type: ['String <userid>'] },
})
module.exports = mongoose.model('ModelsSauce', ModelsSauce)