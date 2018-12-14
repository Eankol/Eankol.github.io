let isChange=false;
let blogCode='';
let dates=document.getElementById('date');
let baseUrl='http://127.0.0.1:3000';
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

function changeTagOpt(data){
  var topt=document.getElementsByName('tag')[0];
  topt.innerHTML='';
  if(data.length!==0){
    for(let i=0;i<data.length;i++){
      let tmp="<option value=\""+data[i].id+"\">"+data[i].name+"</option>";
      topt.innerHTML+=tmp;
    }
  }
}

function saveBlog(){
  let blogTitle=document.getElementsByName('blogTitle')[0].value;
  let dataTime=document.getElementById('date').innerText;
  let tag=document.getElementsByName('tag')[0].value;
  if (blogTitle.trim()=='') {
    swal("请输入标题！");
    return false;
  }
  let sendmsg={
    blogTitle:blogTitle,
    dataTime:dataTime,
    tag:tag,
    inner:editor.txt.html()
  };
  axios.post(baseUrl+'/getBlog',sendmsg).then(function (response) {
    //TODO
    console.log(response.data)
  }).catch(function (error) {
    console.log(error);
  });
  console.log(editor.txt.html());
}
function saveTag(){
  axios.post(baseUrl+'/getTag', {
    tagName:document.getElementsByName('newTag')[0].value
  })
  .then(function (response) {
    changeTagOpt(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

axios.get(baseUrl+"/getTag").then((res)=>{
  changeTagOpt(res.data);
}).catch((err)=>{console.log(err)}).finally(()=>{});

