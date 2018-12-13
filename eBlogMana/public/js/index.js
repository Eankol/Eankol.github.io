let isChange=false;
let blogCode='';
let dates=document.getElementById('date');
function frshDate(){
    let ndate = new Date();
    let nowTime =  ndate.getFullYear()+"-"+
    ((ndate.getMonth()+1)<10?("0"+(ndate.getMonth()+1)):(ndate.getMonth()+1))+"-"+
    ((ndate.getDate())<10?("0"+(ndate.getDate())):(ndate.getDate()))+" "+
    ((ndate.getHours())<10?("0"+(ndate.getHours())):(ndate.getHours()))+":"+
    ((ndate.getMinutes())<10?("0"+(ndate.getMinutes())):(ndate.getMinutes()))+":"+
    ((ndate.getSeconds())<10?("0"+(ndate.getSeconds())):(ndate.getSeconds()));
    dates.innerText = nowTime;
}
frshDate();

function showAddBtn(){
    document.getElementById('newTag').classList.remove('hideElement');
    document.getElementById('newTag').classList.add('showElement');
}
function hideAddBtn(){
    document.getElementById('newTag').classList.add('hideElement');
    document.getElementById('newTag').classList.remove('showElement');
}
hideAddBtn();
let E = window.wangEditor;
let editor= new E('#editor');
editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'image',  // 插入图片
    'table',  // 表格
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
];
editor.customConfig.uploadImgShowBase64 = true  ;
editor.create();
function newBlog(){
    var title = document.getElementsByName('blogTitle')[0];
    var blogs = editor.txt.getJSON();
    swal("内容已保存？", {
        buttons: {
          cancel: "去保存内容",
          catch: {
            text: "新建文章",
            value: "catch",
          }
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            title.value="";
            editor.txt.clear();
            isChange=false;
            blogCode='';
            break;
          default:
        }
      });
}
function addLisen(){
  let blogList = document.getElementsByName('blog');
  for(let i=0;i<blogList.length;i++){
  blogList[i].addEventListener('click',function(){
    swal("内容已保存？", {
      buttons: {
        cancel: "去保存内容",
        catch: {
          text: "新建文章",
          value: "catch",
        }
      },
    }).then((value) => {
      switch (value) {
        case "catch":
          console.log(this)
          break;
        default:
      }
    });
  })
  }
}
addLisen();


