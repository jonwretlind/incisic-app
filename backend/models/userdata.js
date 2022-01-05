const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userData = new Schema({
    firstname:      String,
    lastname:       String,
    email:          String,
    age:            Number,
    relationships:  String,
    spousename:     String,
    num_children:   Number,
    child_1:        String,
    child_2:        String,
    child_3:        String,
    employer:       String,
    annual_income:  Number
}, {collection: 'userCollection'});
const userModel = mongoose.model("UserProfile", userData);
module.exports = userModel;
