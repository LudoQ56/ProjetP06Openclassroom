/*************************/
/******import des modules*/

// const DB=require ('../db.config')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
/***********défnition du model user */
const user = mongoose.Schema({

        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }



});
user.plugin(uniqueValidator);
module.exports = mongoose.model('user', user)
