var express = require("express");
var app = new express();
var ejs = require('ejs');
var bodyparser = require('body-parser');
var cookie = require("cookie-parser");
var session = require('client-sessions');
var mysql = require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'email_accounts'
});

app.use(session({
    cookieName: 'session',
    secret: 'string',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.set('view engine','ejs');
app.use(cookie());


app.get('/',(req,res) =>{
        let msg;
        if(req.cookies.message)msg = req.cookies.message;
        else{
            msg = "";
        }
        res.render("login",{'message':msg})

    }
);
app.post('/inbox', (req,res) => {
    var user = {
        email: req.body.email,
        password: req.body.password,
    };
    var query = `SELECT * FROM email_users WHERE email='${user.email}'`;
    con.query(query,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            if(result.length > 0){
                result.forEach(users => {
                    if(users.email == user.email && users.password == user.password){
                        res.cookie('user',user);
                        req.session.user = user;
                        res.redirect("/inbox");
                    }
                })
            }
            else {
                res.cookie('message',"Email or Password incorrect");
                res.redirect('/')
            }
        }
    })
});

app.get("/logout",(req,res)=>{
    res.clearCookie("user");
    res.clearCookie("message");
    res.redirect("/");
});

app.get("/inbox",(req,res) => {
    if(!req.cookies.user){
        res.redirect("/")
    }else {

        var query = `SELECT * FROM email_inbox WHERE recipient='${req.cookies.user.email}'`;
        let emailList = [];
        con.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    result.forEach(emails => {
                        emailList.push({
                            e_id: emails.email_id,
                            sender: emails.sender,
                            date: emails.date.toLocaleDateString() + " - " + emails.date.toLocaleTimeString(),
                            subject: emails.subject,
                            content: emails.content
                        })
                    });
                }
                var renderObject = {
                    user: req.cookies.user,
                    emails: emailList,
                    emailType: "in"
                };
                res.render('inbox', {renderObject: renderObject})
            }
        });
    }
});
app.get("/sent",(req,res) => {
    if(!req.cookies.user){
        res.redirect("/")
    }else {

        var query = `SELECT * FROM email_inbox WHERE sender='${req.cookies.user.email}'`;
        let emailList = [];
        con.query(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    result.forEach(emails => {
                        emailList.push({
                            e_id: emails.email_id,
                            sender: emails.sender,
                            date: emails.date.toLocaleDateString() + " - " + emails.date.toLocaleTimeString(),
                            subject: emails.subject,
                            content: emails.content
                        })
                    });
                }
                var renderObject = {
                    user: req.cookies.user,
                    emails: emailList,
                    emailType: "out"
                };
                res.render('inbox', {renderObject: renderObject})
            }
        });
    }
});



app.listen(9000);
