const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");
const app = express();
const Book = require("./model/book");
const cors = require('cors');
const port = 8000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", api);

app.get("/", function(req, res){
    Book.find({}, function(err, data){
        if(data){
            res.json(data);
        }
        else{
            res.json({message: "Invalid Request"});
        }
    });
});

app.get("*", function(req, res){
    res.json({message: "Invalid Request"});
})
app.listen(process.env.PORT || port, function (req, res) {
    console.log("Connected at port " + port);
});