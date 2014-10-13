<!DOCTYPE html>
<html>
<head>
<title>科学测算你和TA的缘分指数，史上最准的缘分测试</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
h1 { font-size:4em; font-family:微软雅黑; }
html, body { font-size:90%; }
.wrap { text-align:center;}
.caption p { color:red; }
</style>
</head>
<body>
<div class="wrap">
	<div class="caption">
		<h1><img src="images/mail.gif">糟糕！</h1>
		<p>你的信息已经发送到QQ:<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1280597658&site=qq&menu=yes">1280597658</a>邮箱中</p>
	</div>
	<?php  
		$text = "你是：".$_POST["name1"]."，你喜欢的人：".$_POST["name2"];  
		// 将邮箱地址改成你的  
		$mail = '1280597658@qq.com';   
		// 发送邮件  
		mail($mail, "缘分测试", $text);  
		echo "信息已经发送成功 !";  
	?>  
</div>
</body>
</html>