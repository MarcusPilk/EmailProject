var express = require('express');
var app = express();
var cookie = require("cookie-parser");

app.use(cookie());

app.get("/",(req,res)  => {
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("<h1> Please choose a TimesTable </h1>");
    for (let i = 1; i <= 10 ; i++) {
        res.write("<a href='/start/"+i+"'>"+ i +"</a> <br>");
    }
    res.end();
});
app.get("/start/:A",(req,res) => {
    var t = req.params.A;
    res.cookie("t",t);
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("<h2>"+t+" - pick a starting number</h2>");
    for (let i = 1; i <= 10 ; i++) {
        res.write("<a href='/end/"+(i*t)+"'>"+ i*t +"</a> <br>");
    }
    res.end();
});

app.get("/end/:A",(req,res) => {
    var s = req.params.A;
    var t = req.cookies.t;
    res.cookie("s",s);
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("<h2>Start: "+s+" - pick an end point</h2>");
    for (let i = 1; i <= 10 ; i++) {
        if(!((i*t) < s)){
            res.write("<a href='/fin/"+(i*t)+"'>"+ i*t +"</a> <br>");
        }
    }
    res.end();
});

app.get("/fin/:A", (req,res) => {
    var e = req.params.A;
    var s = req.cookies.s;
    var t = req.cookies.t;

    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("<h1>TimesTable: "+ t + "</h1> <br>");
    res.write("<h1>Start: "+ s + "</h1><br>");
    res.write("<h1>End: "+ e + "</h1><br><hr>");

    for (let i = 1; i*t <= e ; i++) {
        if (!((i * t) < s)) {
            res.write(""+(i * t)+"<br>");
        }
    }
    res.end();
});

app.listen(5000);
