var express = require('express');
var router = express.Router();

router.get("/aboutus", (req,res) => {
    res.write("About Consultant");
    res.end();
});

router.get("/qualification", (req,res) => {
    res.write("Consultant Qualifications");
    res.end();
});

module.exports = router;
