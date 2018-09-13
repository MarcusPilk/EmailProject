var express = require("express");
var app = new express();
let loggedin = false;

app.get("/",function (req,res) {
    res.write("<h1>Index</h1>" +
        "<hr>" +
        "<a href='/login'>login</a>" +
        "<hr>" +
        "<a href='/logout'>logout</a>" +
        "<hr>" +
        "<a href='/restricted'>restricted access</a>");
    res.end();
});
app.use("/restricted",function (req,res,next) {

    if(loggedin){
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write("Logged in <hr>");
        next();
    }else{
        res.writeHead(302, {'Location': '/'});
        res.end();
    }
});

app.all("/add/:A/:B",function (req,res) {
    var a = parseInt(req.params.A);
    var b = parseInt(req.params.B);
    var result = a + b;
    res.write("<h1>"+result+"</h1>");
    res.end();
});

app.get("/login",function (req,res) {
    res.writeHeader(200, {"Content-Type": "text/html"});

    loggedin = true;
    res.write("Logged in <hr>" +
        "<a href='/'> go home</a>");
    res.end();
});
app.get("/logout",function (req,res) {
    res.writeHeader(200, {"Content-Type": "text/html"});

    loggedin = false;
    res.write("Logged out <hr>" +
        "<a href='/'>go home</a>");
    res.end();
});
app.get("/restricted",function (req,res) {
    res.write("Restricted information");
    res.end();
});


app.listen(8000);
