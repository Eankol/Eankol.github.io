var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/eBlog";

function dbUtils(){
    this.getConnect = function (){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("数据库已创建");
            db.close();
        })
    }
    this.addData = function (dataType,doc){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("eBlog");
            //var doc = {title:"第一篇日志",inner:"测试内容"};
            dbo.collection(dataType).insertOne(doc, function(err, res){
                if (err) throw err;
                console.log("插入成功");
                db.close();
            })
        })
    }
    this.findData = function (dataType,params,res){
        var datas="";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("eBlog");
            dbo.collection(dataType).find(params).toArray(function(err, result){
                if (err) throw err;
                res.json(result);
                db.close();
            });
        });
    }
}

module.exports = new dbUtils();