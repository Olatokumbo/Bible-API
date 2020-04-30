const Kjv = require("../app");
const router = require("express").Router();
const Book = require("../model/book");

router.get("/book_name", function(req, res){
    Kjv.find({book_name: req.params.book_name}, 
        function(err, data){
            if(data){
                res.json(data);
            }
            
            else{
                res.json({message: "Book Name was Not Found"})
            }
    });
});

module.exports= router;