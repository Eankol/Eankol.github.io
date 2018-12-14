var express = require('express');
var router = express.Router();
var blogMana = require("../service/blogMana");
//MongoDB = new MongoDB();

router.get('/',function(req, res, next){  
   //TODO
})
router.post('/',function(req, res, next){  
    //TODO
    //console.log(req.body)
    var tmp=blogMana.saveBlog(req.body);
    //console.log(tmp);
    res.json(tmp);
 })

module.exports = router;