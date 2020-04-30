const mongoose = require("mongoose");
const bookSchema= new mongoose.Schema({
    book_name: String,
    chapters: Number
});
const Book = mongoose.model("Book", bookSchema);

module.exports=Book;