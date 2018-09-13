var t = require('./trainer.js');
var c = require('./consultant.js');
var express = require("express");
var app = new express();

app.use("/trainer",t);
app.use("/consultant",c);
app.use("/",(req,res) =>{
    res.write("index");
    res.end();
});

app.listen(5000);
