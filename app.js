const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://admin-david:superFAITH@cluster0-gkvf1.mongodb.net/BibleDB", {useNewUrlParser: true});
const kjvSchema= new mongoose.Schema({
    chapter: Number,
    verse: Number,
    translation_id: String,
    book_id: String,
    book_name: String
});
const Kjv = mongoose.model("Kjv", kjvSchema);
app.route("/:book/:chapter/:verse")
.get(function(req, res){
Kjv.findOne({book_name: req.params.book, chapter: req.params.chapter, verse: req.params.verse}, 
    function(err, data){
        if(data){
        res.json(data);
        }
        else
        res.send("The Bible Verse was not found");
    } );
});
app.route("/:book/:chapter/:firstverse/:lastverse")
.get(function(req, res){
    const dataArray= [];
    const verseArray = [];
    Kjv.find({book_name: req.params.book, chapter: req.params.chapter}, 
        function(err, data){
            if(data){
                dataArray.push(data);
                dataArray.forEach(function(element){
                    // res.json(element);
                    for(i=req.params.firstverse-1;i<req.params.lastverse;i++){
                        verseArray.push(element[i]);
                    }
                    if(!verseArray.length)
                    res.send("The Bible Verse(s) was not found");
                    else
                    res.json(verseArray);
                });
            }

        else
        res.send("The Bible Verse was not found");
    });
});

app.listen(process.env.PORT||port, function(req, res){
    console.log("Connected at port "+ port);
});