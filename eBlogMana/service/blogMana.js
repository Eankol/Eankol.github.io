var fs = require("fs")
var filePath='../datas/blogs.json'; // blog文件路径；
//var buf = new Buffer.alloc(1024); 以后优化？？？

function blogMana(){
    
    this.saveBlog=function(blogData){
       //console.log("****"+JSON.stringify(blogData))
        var saveData = [];
        fs.exists(filePath,(exists)=>{
            if (!exists) {
                fs.open(filePath,'w+',(err,fd)=>{ // 用open的w+模式创建blogs;
                    if (err) {
                        console.log("blog创建失败");
                    }
                })
            }
        })
        var fsData=fs.readFileSync(filePath,'utf-8'); // 读取blogs内容给fsDate;
        fsData+=(fsData==""?"[]":"");
        saveData=JSON.parse(fsData);
        //console.log(saveData+"%^$^$^");
        var nextId=(saveData.length==0?1:(saveData[saveData.length-1].id+1)); // 下一个id;
        var addBlog={
                    title:blogData.blogTitle,
                    time:blogData.dataTime,
                    tag:blogData.tag,
                    id:nextId,
                    src:"blogs/blogPages/"+nextId+".html"
                };
        saveData.push(addBlog);
        fs.writeFile(filePath,JSON.stringify(saveData),(err)=>{ // 追加后的Blog写入到tag文件;
            if (err) {
                console.log("写入log列表失败");
            }
        })
        fs.exists("../blogs/blogs/"+nextId,(exists)=>{
            if (!exists) {
                fs.open("../blogs/blogs/"+nextId,'w+',(err,fd)=>{ // 用open的w+模式创建blog;
                    if (err) {
                        console.log("blog创建失败");
                    }
                })
            }
        })
        fs.writeFile("../blogs/blogs/"+nextId,blogData.inner,(err)=>{ // 追加后的Blog写入到tag文件;
            if (err) {
                console.log("写入log信息失败");
            }
        })

        return saveData;
    }

}
module.exports=new blogMana()