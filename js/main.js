	function telnull()
			{
				alert("暂无内容")
				}
			
			//读取json
				
			$(function(){
				$(window).scroll(function(){
				if($(window).scrollTop()>=107){
					$('.tx').hide(200);
					$('nav').addClass('navbar-fixed-top');
					$('*').tooltip('hide')
				}
				if($(window).scrollTop()<107){
					$('.tx').show(200);
					$('nav').removeClass('navbar-fixed-top')
				}
				
			})
				var getStr=$.ajax({
					type:"get",
					url:"text/uplogs.txt",
					async:false
				});
				document.getElementById('up_log').innerHTML=getStr.responseText;
			})
			$(function(){
				$.ajax({
					type:"get",
					url:"text/preatc.txt",
					async:true,
					success:function(data){
						var getJson=eval('('+data+')');
						$('#rds_title').html(getJson.title)
						$('#rds_date').html(getJson.date)
						$('#pre_rds').hide();
						var preatc=getJson.preurl;
						var atc=getJson.url;
						var getatc;
						function showatc(url){
							getatc=$.ajax({
								type:"get",
								url:url,
								async:false
							});
							var texts=getatc.responseText;
							return texts;
						}
						$('#rds_paper').html(showatc(preatc));
						$('#pre_rds').click(function(){
							$('#rds_paper').html(showatc(preatc));
							$('#all_rds').show()
							$('#pre_rds').hide();
						});
						$('#all_rds').click(function(){
							$('#rds_paper').html(showatc(atc));
							$('#all_rds').hide();
							$('#pre_rds').show();
						})
					}
				});
			})
			$(function(){
				$.ajax({
					type:"get",
					url:"text/stblog.txt",
					async:false,
					success:function(data){
						var getJson=eval("("+data+")");
						var selJson=getJson.length;//获取数据长度
						$('#indexs').empty();
						for (var i=1;i<=Math.ceil((selJson+1)/10);i++) {//根据长度来翻页
							var temp=$('<span value=\"'+i+'\">'+i+'</span>');
							$('#indexs').append(temp);
						}
						function lodstlog(j){
							$('#sh_blog_main').empty();
						    for (var i=selJson-((j-1)*10);i>(selJson-(10*j))&&i>=1;i--) {//倒着翻页查询
							var h=$('<h5>'+getJson[i-1].date+'</h5>');
							var p=$('<p>'+getJson[i-1].inner+'</p>');
							$('#sh_blog_main').append(h);
							$('#sh_blog_main').append(p);
						}
						}
						lodstlog(1);
						$('#indexs').delegate("span","click",function(){//动态绑定页码
							
							lodstlog(this.innerText);
						})
						
					}
				});
				
			})
			var ctop=2000
			var times=0;
			var settimes;
			var cndoms;
			$('.tx').click(function(){
				times+=1;
				if (times==4) {
					alert("难道被你发现了我的秘密？")
				}
				if (times==5) {
					cndoms=$('body').clone(true)
					var doms=$('*');
				for (var i=0;i<doms.length;i++) {
					$(doms[i]).draggable()
				}
				premovedom()
				settimes=setInterval(movedom,1000/60)
				}
				if (times==6) {
					//window.location.reload()
					clearInterval(settimes)
					$('body').replaceWith(cndoms)
					$('.tooltip').hide()
				}
				
			})
			function premovedom(){
				var lis=$('li')
				var lis1=$('p')
				var lis2=$('a')
				var lis3=$('span')
				var lis4=$('h3')
				var lis5=$('h4')
				var lis6=$('h5')
				var lis7=$('img')
				premin(lis)
				premin(lis1)
				premin(lis2)
				premin(lis3)
				premin(lis4)
				premin(lis5)
				premin(lis6)
				premin(lis7)
			}
			function premin(lis){
				for (var i=0;i<lis.length;i++) {
					var tr='rotate('+getRandom1(0,180)+'deg)'
					$(lis[i]).css({'transform':tr,'position':'absolute'})
				}
			}
			function movedom(){
				var lis=$('li')
				var lis1=$('p')
				var lis2=$('a')
				var lis3=$('span')
				var lis4=$('h3')
				var lis5=$('h4')
				var lis6=$('h5')
				var lis7=$('img')
				movins(lis)
				movins(lis1)
				movins(lis2)
				movins(lis3)
				movins(lis4)
				movins(lis5)
				movins(lis6)
				movins(lis7)
			
			}
			function movins(lis){
		
				for (var i=0;i<lis.length;i++) {
					var speed=getRandom1(0,10)
					
					if (!((lis[i].offsetTop+lis[i].offsetHeight)>ctop)) {
						var top=(lis[i].offsetTop+speed)+'px'
						$(lis[i]).css({'top':top,'position':'absolute'})
					}
					
				}
			}
			function getRandom1(start, end) {//随机数
				var length = end - start + 1;
				var num = parseInt(Math.random() * (length) + start);
				return num;
			}
			
	
		
