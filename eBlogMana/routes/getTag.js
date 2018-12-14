var express = require('express');
var router = express.Router();
var tagMana = require("../service/tagMana");
//MongoDB = new MongoDB();

router.get('/',function(req, res, next){  
   res.json(tagMana.getTag());
})
router.post('/',function(req, res, next){  
    var tmp=tagMana.addTag(req.body.tagName);
    res.json(tmp);
 })

module.exports = router;