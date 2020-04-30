const Database = require("../database");
const Kjv = require("../model/verse");
const router = require("express").Router();
const Book = require("../model/book");

router.get("/:book_name", function(req, res){
    Book.find({book_name: req.params.book_name}, 
        function(err, data){
            if(data){
                res.json(data);
            }
            
            else{
                res.json({message: "Book Name was Not Found"})
            }
    });
});

router.get("/:book/:chapter/:verse",function (req, res) {
        Kjv.findOne({ book_name: req.params.book, chapter: req.params.chapter, verse: req.params.verse },
            function (err, data) {
                if (data) {
                    res.json(data);
                }
                else
                    res.json({message: "The Bible Verse was not found"});
            });
    });
router.route("/:book/:chapter/:firstverse/:lastverse")
    .get(function (req, res) {
        const dataArray = [];
        const verseArray = [];
        Kjv.find({ book_name: req.params.book, chapter: req.params.chapter },
            function (err, data) {
                if (data) {
                    dataArray.push(data);
                    // console.log(dataArray);
                    dataArray.forEach(function (element) {
                        // res.json(element);
                        for (i = req.params.firstverse - 1; i < req.params.lastverse; i++) {
                            if(element[i])
                            verseArray.push(element[i]);

                            else{
                            return res.json({ message: "The Bible Verse(s) was not found" });
                            
                            }
                        }
                        if (!verseArray.length)
                            res.json({ message: "The Bible Verse(s) was not found" });
                        else
                            res.json(verseArray);
                    });
                }

                else
                    res.json({ message: "The Bible Verse was not found" });
            }).sort({ verse: 1 });
    });

module.exports= router;