define(["jquery", "jquery.alert", "jquery.event"], function($) {
    //确定jquery.alert.js, jquery.event.js 加载完毕.
    $(function() {
        $("#handler-btn").click(function(){
        	alert("我是jquery.alert.js, jquery.event.js 加载完毕，弹出的窗口！")
        })
    });
});