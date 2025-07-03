const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    speed : Number,
    accuracy : Number,
    currentDate : String
});
const schema = mongoose.Schema(
    {
        username : String,
        password : String,
        userData : [userSchema]
    }
);
module.exports = mongoose.model("User",schema,"Users");
// matrial theme
// schien UI
// tosert / tostify
// CodePen For ideas