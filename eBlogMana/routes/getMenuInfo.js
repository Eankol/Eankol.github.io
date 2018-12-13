var express = require('express');
var router = express.Router();
//var MongoDB = require("../service/dbUtils");
//MongoDB = new MongoDB();

router.get('/',function(req, res, next){  
   // MongoDB.findData("blogs",{"title":"第一篇日志"},res);
})

module.exports = router;