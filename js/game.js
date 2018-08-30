$(function() {
	var wolf_timer1;
	//游戏规则的显示和隐藏
	$('.info').click(function() {
		$('.rules').stop().fadeIn(100);
	});
	$('.rules>a').click(function() {
		$('.rules').stop().fadeOut(100);
	});
	//开始按钮点击事件
	$('.start').click(function() {
		$(this).stop().fadeOut();
		counter();
		//动画处理函数
		wolfAnimation();
	});
	//重新开始点击事件
	$('.gameover>button').click(function() {
		$('.gameover').stop().fadeOut();
		$('.time').html('60');
		$('.score').html('0');
		$('.start').stop().fadeIn();
		$('.start').prop('disabled',false);
	});
	//倒计时函数
	function counter(){
		var current = parseInt($('.time').html());
		var timer = setInterval(function(){
			current -= 1;
			$('.time').html(current);
			if(current==0){
				$('.gameover').stop().fadeIn(100);
				$('.start').prop('disabled',true);
				//停止动画
				$('.wolfImg').remove();
				clearInterval(wolf_timer1);
				clearInterval(timer);
			}
		},1000);
	}
	//var i=0;
	function wolfAnimation(){
		//图片数组
		var htl=['img/h10.png','img/h9.png','img/h8.png','img/h7.png','img/h6.png','img/h5.png','img/h4.png','img/h3.png','img/h2.png','img/h1.png'];
		var xhh=['img/x10.png','img/x9.png','img/x8.png','img/x7.png','img/x6.png','img/x5.png','img/x4.png','img/x3.png','img/x2.png','img/x1.png'];
		//洞位置数组
		var holeP=[
			{left:'33px',top:'220px'},
			{left:'30px',top:'294px'},
			{left:'48px',top:'384px'},
			{left:'131px',top:'164px'},
			{left:'138px',top:'259px'},
			{left:'158px',top:'359px'},
			{left:'241px',top:'197px'},
			{left:'254px',top:'284px'},
			{left:'264px',top:'387px'},
		];
		//随机生成holeP数组下标（0~8）
		var num = Math.round((Math.random()*8));
		//随机生成图片数组类型
		var wolf_type = Math.round(Math.random())==0?htl:xhh;
		//创建img标签
		var $Img = $("<img src='' class='wolfImg'>");
		$Img.css({
			position:"absolute",
			left:holeP[num].left,
			top:holeP[num].top,
		});
		//定时器 用于播放动画
		window.iStart=0;
		window.iEnd = 6;
		wolf_timer1 = setInterval(function() {
			if(iStart==iEnd){
				clearInterval(wolf_timer1);
				iStart=5;
				$Img.remove();
				wolfAnimation();
			}
			else{
				//探出脑袋
				$Img.attr('src',wolf_type[iStart]);
				iStart++;				
			}
		},180);
		//挨打动画
		$('.content').append($Img);
		//得分处理函数
		gameScore($Img);
	}
	function gameScore($str){
		$str.one('click',function() {
			var type = $str.attr('src').charAt(4)=='h'?0:1;
			if(type==0){	//打到灰太狼
				$('.score').html(parseInt($('.score').html())+10);
			}
			else{			//打到小灰灰
				$('.score').html(parseInt($('.score').html())-10);
			}
			window.iStart=5;
			window.iEnd = 10;
		});
	}
});