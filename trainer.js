var express = require('express');
var router = express.Router();

router.get("/aboutus", (req,res) => {
    res.write("About Trainers");
    res.end();
});

router.get("/qualification", (req,res) => {
    res.write("Trainer Qualifications");
    res.end();
});

module.exports = router;
