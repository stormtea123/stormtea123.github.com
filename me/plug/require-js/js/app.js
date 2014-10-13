requirejs.config({
	//路径
    "baseUrl": "js/lib",
    //目录
    "paths": {
      "app": "../app"
    }
});

//加载主要的 app module 开始执行app
requirejs(["app/main"]);