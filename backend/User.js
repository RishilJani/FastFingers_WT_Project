const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        username : String,
        password : String,
        speed : [Number],
        accuracy : [Number],
        currentDate : [String]
    }
);
module.exports = mongoose.model("User",schema,"Users");
// matrial theme
// schien UI
// tosert / tostify
// CodePen For ideas