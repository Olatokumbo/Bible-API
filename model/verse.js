const mongoose = require("mongoose");
const kjvSchema= new mongoose.Schema({
    chapter: Number,
    verse: Number,
    translation_id: String,
    book_id: String,
    book_name: String
});
const Kjv = mongoose.model("Kjv", kjvSchema);

module.exports=Kjv;