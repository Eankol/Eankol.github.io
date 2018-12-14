var fs = require("fs")
var filePath='../datas/tags.json'; // tag文件路径；
//var buf = new Buffer.alloc(1024); 以后优化？？？

function tagMana(){

    this.addTag=function(tagName){ //添加tag;
        var saveData = [];
        fs.exists(filePath,(exists)=>{
            if (!exists) {
                fs.open(filePath,'w+',(err,fd)=>{ // 用open的w+模式创建tag;
                    if (err) {
                        console.log("tag创建失败");
                    }
                })
            }
        })
        var fsData=fs.readFileSync(filePath,'utf-8'); // 读取tag内容给fsDate;
        fsData+=(fsData==""?"[]":"");
        saveData=JSON.parse(fsData);
        var nextId=(saveData.length==0?1:(saveData[saveData.length-1].id+1)); // 下一个id;
        var addtag={name:tagName,id:nextId};
        saveData.push(addtag);
        fs.writeFile(filePath,JSON.stringify(saveData),(err)=>{ // 追加后的tag写入到tag文件;
            if (err) {
                console.log("写入tag失败");
            }
        })
        return saveData;
    }

    this.getTag=function(){ //获取所有tag;
        fs.exists(filePath,(exists)=>{
            if (!exists) {
                fs.open(filePath,'w+',(err,fd)=>{ // 用open的w+模式创建tag;
                    if (err) {
                        console.log("tag创建失败");
                    }
                })
            }
        })
        var fsData=fs.readFileSync(filePath,'utf-8'); // 读取tag内容给fsDate;
        fsData+=(fsData==""?"[]":"");
        return JSON.parse(fsData);
    }
}
module.exports=new tagMana()