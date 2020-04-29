const mongoose = require("mongoose");
require("dotenv").config();
const database= mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true});


module.exports = database;
