<?php  
	$text = "访问信息：".$_POST["ip"];  
	// 将邮箱地址改成你的  
	$mail = '1280597658@qq.com';   
	// 发送邮件  
	mail($mail, "jsonp访问统计", $text);  
	echo "信息已经发送成功 !";  
?>