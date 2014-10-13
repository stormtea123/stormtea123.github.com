/**
 * Name JavaScript AV库
 * Author 阿狼
 * Url http://www.w3cmm.com
 */
(function() {
	if(!window.av) {
		window["av"] = {}
	}

	function isCompatible(other) {
	    // 使用能力检测来检查必要的条件
	    if( other===false 
	        || !Array.prototype.push
	        || !Object.hasOwnProperty
	        || !document.createElement
	        || !document.getElementsByTagName
	        ) {
	        alert('TR- if you see this message isCompatible is failing incorrectly.');
	        return false;
	    }
	    return true;
	}
	window['av']['isCompatible'] = isCompatible;
	//选择器

	function $() {
		var elements = new Array();
		for(var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if(typeof element == "string") {
				element = document.getElementById(element);
			}
			//如果只提供了一个参数，则立即返回这个元素
			if(arguments.length == 1) {
				return element;
			}
			elements.push(element);
		}
		return elements;
	};
	window["av"]["$"] = $;

	//选择类

	function getElementsByClassName(className, tag, parent) {
		parent = parent || document;
		if(!(parent = $(parent))) {
			return false;
		}
		//查找所有匹配的标签
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		//创建正则表达式，来判断className是否正确
		className = className.replace(/\-/g, "\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var element;
		//检查每个元素
		for(var i = 0; i < allTags.length; i++) {
			element = allTags[i];
			if(regex.test(element.className)) {
				matchingElements.push(element);
			}
		}
		//返回任何匹配的元素
		return matchingElements;
	};
	window["av"]["getElementsByClassName"] = getElementsByClassName;

	//绑定事件
	function addHandler( element, type, Handler ) {
	    if (element.addEventListener) {
	        element.addEventListener(type, Handler, false );
	    } else if(element.attachEvent) {
	        element['e'+type+Handler] = Handler;
	        element[type+Handler] = function(){element['e'+type+Handler]( window.event );}
	        element.attachEvent( 'on'+type, element[type+Handler] );
	    }
	    //return false;
	};
	window["av"]["addHandler"] = addHandler;

	//移除事件


	function removeHandler(node, type, listener ) {
	    if (node.removeEventListener) {
	        node.removeEventListener( type, listener, false );
	        return true;
	    } else if (node.detachEvent) {
	        // MSIE method
	        node.detachEvent( 'on'+type, node[type+listener] );
	        node[type+listener] = null;
	        return true;
	    }
	    // Didn't have either so return false
	    return false;
	};
	window["av"]["removeHandler"] = removeHandler;

	//获取事件


	function getEvent(event) {
		return event ? event : window.event;
	}
	window["av"]["getEvent"] = getEvent;

	//获取事件对象


	function getTarget() {
		return event.target || event.srcElement;
	}
	window["av"]["getTarget"] = getTarget;

	//阻止默认事件


	function preventDefault (event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
	window["av"]["preventDefault"] = preventDefault;

	//阻止冒泡


	function stopPropagation(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
	window["av"]["stopPropagation"] = stopPropagation;
	//鼠标按钮


	function getButton(event) {
		event = event || getEvent(event);
		var buttons = {
			"left": false,
			"middle": false,
			"right": false
		};
		//检查event对象的toString()方法的值
		if(event.toString && event.toString().indexOf("MouseEvent") != -1) {
			switch(event.button) {
			case 0:
				buttons.left = true;
				break;
			case 1:
				buttons.middle = true;
				break;
			case 2:
				buttons.right = true;
				break;
			}
		} else if(event.button) {
			//MSIE方法
			switch(event.button) {
				case 1:
					buttons.left = true;
					break;
				case 2:
					buttons.right = true;
					break;
				case 3:
					buttons.left = true;
					buttons.right = true;
					break;
				case 4:
					buttons.middle = true;
					break;
				case 5:
					buttons.left = true;
					buttons.middle = true;
					break;
				case 6:
					buttons.middle = true;
					buttons.right = true;
					break;
				default:
					break;
			}
		}
	}
	window["av"]["getButton"] = getButton;
	//load事件
	function addLoadEvent(loadEvent, waitForImages) {
		//如果需要等待图片载入则使用常规的添加事件方法
		if(waitForImages) {
			return addEvent(window, "load", loadEvent);
		}
		var init = function() {
			//如果这个函数已经被调用过了则返回
			if (arguments.callee.done) return;
			//标记这个函数以便检验它是否运行过
			arguments.callee.done = true;
			//在document的环境中运行载入事件
			loadEvent.apply(document, arguments);
		};
		//DOMContLoaded事件会在文档标记被载入完成时被调用
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", init, false);
		}
		//对于Safari使用setInterval()函数检测document的readyState属性，监控文档是否完成
		if (/Webkit/i.test(navigator.userAgent)) {
			var _timer = setInterval(function() {
				if(/loaded|complete/.test(document.readyState)) {
					clearInterval(_timer);
					init();
				}
			},10);
		}
		//写入script标签，该标签会延迟到文档的最后载入
		//然后，使用script对象的onreadystatechange方法进行类似的readyState检查后载入事件
		/*@if (@_win32)
		document.write("<script id=_ie_onload defer src=javascript:void(0)></script>");
		var script = document.getElementById("_ie_onload");
		script.onreadystatechange = function() {
			if(this.readyState == "complete") {
				init();
			}
		};
		/*@end @*/
		return true;
	}
	window["av"]["addLoadEvent"] = addLoadEvent;
	//获取鼠标的位置坐标
	function getPointerPositionInDocument(event) {
		event = event || getEvent(event);
		var x = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		var y = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		return {
			"x": x,
			"y": y
		};
	}
	window["av"]["getPointerPositionInDocument"] = getPointerPositionInDocument;
	//键盘命令
	function getKeyPressed(event) {
		event = event || getEvent(event);
		var code = event.keyCode;
		var value = String.fromCharCode(code);
		return {"code":code, "value":value};
	}
	window["av"]["getKeyPressed"] = getKeyPressed; 

	//切换显示


	function toggleDisplay(node, value) {
		if(!(node = $(node))) {
			return false;
		}
		if(node.style.display != "none") {
			node.style.display = "none";
		} else {
			node.style.display = value || " ";
		}
		return true;
	}
	window["av"]["toggleDisplay"] = toggleDisplay;

	function insertAfter(node, referenceNode) {
		if(!(node = $(node))) {
			return false;
		}
		if(!(referenceNode = $(referenceNode))) {
			return false;
		}
		return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	};
	window["av"]["insertAfter"] = insertAfter;

	//移除节点

	function removeChildren(parent) {
		if(!(parent = $(parent))) {
			return false;
		}
		//当存在子节点时删除该子节点
		while(parent.firstChild) {
			parent.firstChild.parentNode.removeChild(parent.children);
		}
		return parent;
	}
	window["av"]["removeChildren"] = removeChildren;

	//插入节点

	function prependChild(parent, newChild) {
		if(!(parent = $(parent))) {
			return false;
		}
		if(!(newChild = $(newChild))) {
			return false;
		}
		if(parent.firstChild) {
			//如果存在子节点，则在这个节点之前插入
			parent.insertBefore(newChild, parent.firstChild);
		} else {
			//如果没有子节点则直接添加
			parent.appendChild(newChild);
		}
		//再返回父元素
		return parent;
	}
	window["av"]["prependChild"] = prependChild;
	//获取浏览器窗口大小

	function getBrowserWindowSize() {
		var de = document.documentElement;
		return {
			"width": (window.innerWidth || (de && de.clientWidth) || document.body.clientHeight),
			"height": (window.innerHeight) || (de && de.clientHeight) || document.body.clientHeight
		}
	};
	window["av"]["getBrowserWindowSize"] = getBrowserWindowSize;
	//错误日志

	function myLogger(id) {
		id = id || "avLogWindow";
		var logWindow = null;
		var createWindow = function() {
				var browserWindowSize = av.getBrowserWindowSize();
				var top = ((browserWindowSize.height - 250)) || 0;
				var left = ((browserWindowSize.width - 360) / 2) || 0;
				logWindow = document.createElement("ul");
				logWindow.setAttribute("id", id);
				logWindow.style.position = "absolute";
				logWindow.style.top = top + "px";
				logWindow.style.left = left + "px";
				logWindow.style.width = "360px";
				logWindow.style.height = "200px";
				logWindow.style.overflow = "scroll";
				logWindow.style.padding = "0";
				logWindow.style.margin = "0";
				logWindow.style.border = "1px solid black";
				logWindow.style.blackgroundColor = "white";
				logWindow.style.listStyle = "none";
				logWindow.style.font = "12px/1.5 Verdana";
				document.body.appendChild(logWindow);
			}
		this.writeRaw = function(message) {
			if(!logWindow) createWindow();
			var li = document.createElement("li");
			li.style.padding = "2px";
			li.style.border = "0";
			li.style.borderBottom = "1px dotted black";
			li.style.color = "#000";
			if(typeof message == "undefined") {
				li.appendChild(document.createTextNode("Message was undefined"));
			} else if(typeof li.innerHTML != undefined) {
				li.innerHTML = message;
			} else {
				li.appendChild(document.createTextNode(message));
			}
			logWindow.appendChild(li);
			return true;
		}
	}
	myLogger.prototype = {
		write: function(message) {
			if(typeof message == 'string' && message.length == 0) {
				return this.writeRaw("av.log: null message");
			}
			if(typeof message != "string") {
				if(message.toString) {
					return this.writeRaw(message.toString())
				} else {
					return this.writeRaw(typeof message)
				}
			}
			//转换<和>防止innerHTML不会将message作为HTML进行解析
			message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			return this.writeRaw(message);
		},
		//插入一个标题
		header: function(message) {
			message = '<span style="color:white; background-color:black; padding:0px 5px;">' + message + '</span>';
			return this.writeRaw(message);
		}
	};
	window["av"]["log"] = new myLogger();
	if(!console) var console = av.log;

	//重复一个字符串
	if(!String.repeat) {
		String.prototype.repeat = function(l) {
			return new Array(l + 1).join(this);
		}
	}
	//清除结尾和开头处的空白符
	if(!String.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, "")
		}
	}

	//把word-word转换成wordWord
	function camelize(s) {
	    return s.replace(/-(\w)/g, function (strMatch, p1){
	        return p1.toUpperCase();
	    });
	}
	window['av']['camelize'] = camelize;

	//把wordWord转换成word-word
	function uncamelize(s, sep) {
		sep = sep || "-";
		return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2) {
			return p1 + sep + p2.toLowerCase();
		})
	}
	window["av"]["uncamelize"] = uncamelize;

	//通过ID修改单个元素的样式
	function setStyleById(element, styles) {
		if(!(element = $(element))) {
			return false;
		}
		for (property in styles) {
			if(!styles.hasOwnProperty(property)) continue;
			if(element.style.setProperty) {
				element.style.setProperty(uncamelize(property, "-"),styles[property], null);
			} else {
				//备用方法
				element.style[camelize(property)] = styles[property];
			}
		}
		return true;
	}
	window["av"]["setStyle"] = setStyleById;
	window["av"]["setStyleById"] = setStyleById;


	//通过类名修改多个元素的样式
	function setStylesByClassName(parent, tag, className, styles) {
		if(!(parent = $(parent))) {
			return false;
		}
		var elements = getElementsByClassName(className, tag, parent);
		for (var e=0; e< elements.length; e++) {
			setStyleById(elements[e], styles);
		}
		return true;
	}
	window["av"]["setStylesByClassName"] = setStylesByClassName;
	//通过标签名修改元素的样式
	function setStylesByTagName(tagname, styles, parent) {
		parent = $(parent) || document;
		var elements = parent.getElementsByTagName(tagname);
		for (var e=0; e<elements.length; e++) {
			setStyleById(elements[e], styles);
		}
	}
	window["av"]["setStylesByTagName"] = setStylesByTagName;
	//取得包含元素类名的数组
	function getClass(element) {
		if(!(element = $(element))) return false;
		return element.className.replace(/\s+/," ").split(" ");
	};
	window["av"]["getClass"] = getClass;
	//检查元素中是否存在某个类
	function hasClass(element, className) {
		if(!(element = $(element))) return false;
		var classes = getClass(element);
		for ( var i = 0; i< classes.length; i++) {
			if (classs[i] == className) {
				return true;
			}
		}
		return false;
	};
	window["av"]["hasClass"] = hasClass;
	//为元素添加类
	function addClass(element, className) {
		if (!(element = $(element))) return false;
		element.className += (element.className ? " ": "") + className;
		return true;
	}
	window["av"]["addClass"] = addClass;
	//从元素删除类
	function removeClass(element, className) {
		if (!(element = $(element))) return false;
		var classes = getClass(element);
		var length = classes.length;
		for (var i= length-1; i>=0; i--) {
			if (classes[i] === className) {
				delete(classes[i]);
			}
		}
		element.className = classes.join(" ");
		alert(classes.length)
		return (length == classes.length ? false : true );
	};
	window["av"]["removeClass"] = removeClass;
	//添加样式表
	function addStylesSheet(url, media) {
		media = media || "screen";
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", url);
		link.setAttribute("media", media);
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	window["av"]["addStylesSheet"] = addStylesSheet;
	//移除样式表
	function removeStyleSheet(url,media) {
		var styles = getStyleSheets(url, media);
		alert(styles.length)
		for (var i=0; i<styles.length; i++) {
			var node = styles[i].ownerNode || styles[i].owningElement;
			//禁用样式表
			styles[i].disabled = true;
			node.parentNode.removeChild(node);
		}
	}
	window["av"]["removeStyleSheet"] = removeStyleSheet;
	//通过URL取得包含所有样式的数组
	function getStyleSheets(url, media) {
		var sheets = [];
		for (var i=0; i< document.styleSheets.length; i++) {
			if(url && document.styleSheets[i].href.indexOf(url) == -1) {
				continue;
			}
			if(media) {
				media = media.replace(/,\s*/,",");
				var sheetMedia;
				if(document.styleSheets[i].media.mediaText) {

					//DOM方法
					sheetMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/,",");
					//Safari会添加额外的逗号和空格
					sheetMedia = sheetMedia.replace(/,\s*/,",");
				} else {
					//MSIE方法
					sheetMedia = document.styleSheets[i].media.replace(/,\s*/,",");
				}
				if (media != sheetMedia) {
					continue;
				}
			}
			sheets.push(document.styleSheets[i]);
		}
		return sheets;
	}
	window["av"]["getStyleSheets"] = getStyleSheets;
	//获取元素的样式
	function getStyle(element, property) {
		if(!(element = $(element)) && !property) {
			return false
		}
		var value = element.style[camelize(property)];
		if (!value) {
			if(document.defaultView && document.defaultView.getComputedStyle) {
				var css = document.defaultView.getComputedStyle(element, null);
				value = css ? css.getPropertyValue(property) : null;
			} else if (element.currentStyle) {
				value = element.currentStyle[camelize(property)];
			}
		}
		return value == "auto" ? " " : value;
	}
	window["av"]["getStyle"] = getStyle;
	window["av"]["getStyleById"] = getStyle;

	//解析JSON文本
	function parseJSON(s, filter) {
		var j;

		function walk(k, v) {
			var i;
			if(v && typeof v === 'object') {
				for(i in v) {
					if(v.hasOwnProperty(i)) {
						v[i] = walk(i, v[i]);
					}
				}
			}
			return filter(k, v);
		}
		//通过正则表达式检测JSON文本，查找非JSON字符。其中，特别关注"()
		//"和"new"，因为它们会引起语句的调用，还有“=”，因为它会导致变量的值发生改变
		//不过，为安全起见这里会拒绝所有不希望出现的字符
		if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {

			try {
				j = eval('(' + s + ')');
			} catch(e) {
				throw new SyntaxError("parseJSON");
			}
		} else {
			throw new SyntaxError("parseJSON");
		}

		if(typeof filter === 'function') {
			j = walk('', j);
		}
		return j;
	};
	//设置XMLHttpRequest对象的各个不同的部分
	function getRequestObject(url,options) {
	    
	    //初始化请求
	    var req = false;
	    if(window.XMLHttpRequest) {
	        var req = new window.XMLHttpRequest();
	    } else if (window.ActiveXObject) {
	        var req = new window.ActiveXObject('Microsoft.XMLHTTP');
	    }
	    if(!req) return false;
	    
	    //定义默认的选项
	    options = options || {};
	    options.method = options.method || 'GET';
	    options.send = options.send || null;

	    //为请求的每个阶段定义不同的侦听器
	    req.onreadystatechange = function() {
	        switch (req.readyState) {
	            case 1:
	                //载入中
	                if(options.loadListener) {
	                    options.loadListener.apply(req,arguments);
	                }
	                break;
	            case 2:
	                //载入完成
	                if(options.loadedListener) {
	                    options.loadedListener.apply(req,arguments);
	                }
	                break;
	            case 3:
	                //交互
	                if(options.ineractiveListener) {
	                    options.ineractiveListener.apply(req,arguments);
	                }
	                break;
	            case 4:
	                //完成
	                try { 
	                if (req.status && req.status == 200) {
	                    
	                    //针对content-type的特殊侦听器
	                    //由于content-Type头部中可能包含字符集，如Content-type:text/html;charset=ISO-8859-4
	                    //因此通过正则表达式提取出所需的部分
	                    var contentType = req.getResponseHeader('Content-Type');
	                    var mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
	                                        
	                    switch(mimeType) {
	                        case 'text/javascript':
	                        case 'application/javascript':
	                            // 相应是JavaScript，因此以req.responseListener作为回调参数
	                            if(options.jsResponseListener) {
	                                options.jsResponseListener.call(
	                                    req,
	                                    req.responseText
	                                );
	                            }
	                            break;
	                        case 'application/json':
	                            // 响应是JSON，因此需要匿名函数对req.responseText进行解析
	                            // 以返回作为回调参数的JSON对象
	                            if(options.jsonResponseListener) {
	                                try {
	                                    var json = parseJSON(
	                                        req.responseText
	                                    );
	                                } catch(e) {
	                                    var json = false;
	                                }
	                                options.jsonResponseListener.call(
	                                    req,
	                                    json
	                                );
	                            }
	                            break;
	                        case 'text/xml':
	                        case 'application/xml':
	                        case 'application/xhtml+xml':
	                            //相应是XML，因此以
	                            // req.responseXML作为回调函数，此时是Document对象
	                            if(options.xmlResponseListener) {
	                                options.xmlResponseListener.call(
	                                    req,
	                                    req.responseXML
	                                );
	                            }
	                            break;
	                        case 'text/html':
	                            // 响应是HTML，因此以req.responseText作为回调参数
	                            if(options.htmlResponseListener) {
	                                options.htmlResponseListener.call(
	                                    req,
	                                    req.responseText
	                                );
	                            }
	                            break;
	                    }
	                
	                    //针对相应成功完成的侦听器
	                    if(options.completeListener) {
	                        options.completeListener.apply(req,arguments);
	                    }

	                } else {
	                    // 响应完成但却存在错误
	                    if(options.errorListener) {
	                        options.errorListener.apply(req,arguments);
	                    }
	                }
	                

	                } catch(e) {
	                    //忽略错误
	                }
	                break;
	        }
	    };
	    //开启请求
	    req.open(options.method, url, true);
	    //添加特殊的头部信息以标识请求
	    req.setRequestHeader('X-ADS-Ajax-Request','AjaxRequest');
	    return req;
	}
	window['av']['getRequestObject'] = getRequestObject;
	function ajaxRequest(url,options) {
		var req = getRequestObject(url,options);
		return req.send(options.send);
	}
	window["av"]["ajaxRequest"] = ajaxRequest;
	var XssHttpRequestCount=0;

	//XMLHttpRequest对象的一个
	//跨站点<script>标签实现
	var XssHttpRequest = function(){
	    this.requestID = 'XSS_HTTP_REQUEST_' + (++XssHttpRequestCount);
	}
	XssHttpRequest.prototype = {
	    url:null,
	    scriptObject:null,
	    responseJSON:null,
	    status:0,
	    readyState:0,
	    timeout:30000,
	    onreadystatechange:function() { },
	    
	    setReadyState: function(newReadyState) {
	        //如果比当前状态更新，则只更新就绪状态
	        if(this.readyState < newReadyState || newReadyState==0) {
	            this.readyState = newReadyState;
	            this.onreadystatechange();
	        }
	    },
	    
	    open: function(url,timeout){
	        this.timeout = timeout || 30000;
	        // Append a special variable to the URL called XSS_HTTP_REQUEST_CALLBACK
	        // that contains the name of the callback function for this request
	        this.url = url 
	            + ((url.indexOf('?')!=-1) ? '&' : '?' ) 
	            + 'XSS_HTTP_REQUEST_CALLBACK=' 
	            + this.requestID 
	            + '_CALLBACK';    
	        this.setReadyState(0);        
	    },
	    
	    send: function(){
	        var requestObject = this;
	        
	        // Create a new script object to load the external data
	        this.scriptObject = document.createElement('script');
	        this.scriptObject.setAttribute('id',this.requestID);
	        this.scriptObject.setAttribute('type','text/javascript');
	        // Don't set the src or append to the document yet...
	        
	        
	        // 创建一个在给定的毫秒之后触发的
	        // setTimeout()方法。如果在给定的时间
	        // 内脚本没有载入完成，则取消载入
	        var timeoutWatcher = setTimeout(function() {
	            // 在脚本晚于我们假定的停止时间之后载入的情况下
	            // 通过一个空方法来重新为window方法赋值
	            window[requestObject.requestID + '_CALLBACK'] = function() { };
	            
	            //移除脚本以防止进一步加载
	            requestObject.scriptObject.parentNode.removeChild(
	                requestObject.scriptObject
	            );

	            //将状态设置为错误
	            requestObject.status = 2;
	            requestObject.statusText = 'Timeout after ' 
	                + requestObject.timeout 
	                + ' milliseconds.'            
	            
	            //更新就绪状态
	            requestObject.setReadyState(2);
	            requestObject.setReadyState(3);
	            requestObject.setReadyState(4);
	                    
	        },this.timeout);
	        
	        
	        // 在window对象中创建一个与请求中的回调方法匹配的方法，在调用时负责处理请求的其他部分
	        window[this.requestID + '_CALLBACK'] = function(JSON) {
	            // 当脚本载入时将执行这个方法
	            // 同时传入预期的JSON对象
	        
	            // 在请求载入成功时
	            // 清除timeoutWatcher方法
	            clearTimeout(timeoutWatcher);

	            // 更新就绪状态
	            requestObject.setReadyState(2);
	            requestObject.setReadyState(3);
	            
	            // 将状态设置为成功
	            requestObject.responseJSON = JSON; 
	            requestObject.status=1;
	            requestObject.statusText = 'Loaded.' 
	        
	             // 更新就绪状态
	            requestObject.setReadyState(4);
	        }

	        // Set the initial state
	        this.setReadyState(1);
	        
	        // Now set the src property and append to the document's 
	        // head. This will load the script
	        this.scriptObject.setAttribute('src',this.url);                    
	        var head = document.getElementsByTagName('head')[0];
	        head.appendChild(this.scriptObject);
	        
	    }
	}
	window['av']['XssHttpRequest'] = XssHttpRequest;

	//设置XssHttpRequest对象的不同部分
	function getXssRequestObject(url,options) {
	    var req = new  XssHttpRequest();
	 
	    options = options || {};
	    // Default timeout of 30 sec
	    options.timeout = options.timeout || 30000;

	    req.onreadystatechange = function() {
	        switch (req.readyState) {
	            case 1:
	                // Loading
	                if(options.loadListener) {
	                    options.loadListener.apply(req,arguments);
	                }
	                break;
	            case 2:
	                // Loaded
	                if(options.loadedListener) {
	                    options.loadedListener.apply(req,arguments);
	                }
	                break;
	            case 3:
	                // Interactive
	                if(options.ineractiveListener) {
	                    options.ineractiveListener.apply(req,arguments);
	                }
	                break;
	            case 4:
	                // Complete
	                if (req.status == 1) {
	                    // The request was successful
	                    if(options.completeListener) {
	                        options.completeListener.apply(req,arguments);
	                    }
	                } else {
	                    // There was an error
	                    if(options.errorListener) {
	                        options.errorListener.apply(req,arguments);
	                    }
	                }
	                break;
	        }
	    };
	    req.open(url,options.timeout);
	    
	    return req;
	}
	window['av']['getXssRequestObject'] = getXssRequestObject;

	//发送XssHttpRequest请求
	function xssRequest(url,options) {
	    var req = getXssRequestObject(url,options);
	    return req.send(null);
	}
	window['av']['xssRequest'] = xssRequest;

	var actionPager =  {
	    // The previous hash
	    lastHash : '',
	    // A list of the methods registered for the hash patterns
	    callbacks: [],
	    // The safari history list
	    safariHistory : false,
	    // A reference to the iframe for Internet Explorer
	    msieHistory: false,
	    // The class name of the links that should be converted
	    ajaxifyClassName: '',
	    // The root URL of the application. This will be stripped off the URLS
	    // when creating the hashes
	    ajaxifyRoot: '',
	    
	    
	    init: function(ajaxifyClass,ajaxifyRoot,startingHash) {

	        this.ajaxifyClassName = ajaxifyClass || 'ADSActionLink';
	        this.ajaxifyRoot = ajaxifyRoot || '';

	        if (/Safari/i.test(navigator.userAgent)) {
	            this.safariHistory = [];
	        } else if (/MSIE/i.test(navigator.userAgent)) {
	            // In the case of MSIE, add a iframe to track override the back button
	            this.msieHistory = document.createElement("iframe");
	            this.msieHistory.setAttribute("id", "msieHistory");
	            this.msieHistory.setAttribute("name", "msieHistory");
	            setStyleById(this.msieHistory,{
	                'width':'100px',
	                'height':'100px',
	                'border':'1px solid black',
	                'visibility':'visible',
	                'zIndex':'-1'
	            });
	            document.body.appendChild(this.msieHistory);
	            this.msieHistory = frames['msieHistory'];
	            
	        }

	        // Convert the links to AJAX links
	        this.ajaxifyLinks();

	        // Get the current location
	        var location = this.getLocation();

	        // Check if the location has a hash (from a bookmark)
	        // or if a hash has bee provided
	        if(!location.hash && !startingHash) { startingHash = 'start'; }

	        // Store the hash as necessary
	        ajaxHash = this.getHashFromURL(location.hash) || startingHash;
	        this.addBackButtonHash(ajaxHash);

	        // Add a watching event to look for changes in the location bar
	        var watcherCallback = makeCallback(this.watchLocationForChange,this);
	        window.setInterval(watcherCallback,200);
	    },
	    ajaxifyLinks: function() {
	        // Convert the links to anchors for ajax handling
	        links = getElementsByClassName(this.ajaxifyClassName, 'a', document);
	        for(var i=0 ; i < links.length ; i++) {
	            if(hasClassName(links[i],'ADSActionPagerModified')) { continue; }
	        
	            // Convert the herf attribute to #value
	            links[i].setAttribute(
	                'href',
	                this.convertURLToHash(links[i].getAttribute('href'))
	            );
	            addClassName(links[i],'ADSActionPagerModified');

	            // Attach a click event to add history as necessary
	            addEvent(links[i],'click',function() {
	                 if (this.href && this.href.indexOf('#') > -1) {
	                     actionPager.addBackButtonHash(
	                        actionPager.getHashFromURL(this.href)
	                    );
	                 }
	            });
	        }
	    },
	    addBackButtonHash: function(ajaxHash) {
	        // Store the hash
	        if (!ajaxHash) return false;
	        if (this.safariHistory !== false) {
	            // Using a special array for Safari
	            if (this.safariHistory.length == 0) {
	                this.safariHistory[window.history.length] = ajaxHash;
	            } else {
	                this.safariHistory[window.history.length+1] = ajaxHash;
	            }
	            return true;
	        } else if (this.msieHistory !== false) {
	            // By navigating the iframe in MSIE
	            this.msieHistory.document.execCommand('Stop');
	            this.msieHistory.location.href = '/fakepage?hash='
	                + ajaxHash
	                + '&title='+document.title;
	            return true;
	        } else {
	            // By changing the location value
	            // The function is wrapped using makeCallback so that this 
	            // will refer to the actionPager from within the timeout method
	            var timeoutCallback = makeCallback(function() {
	                if (this.getHashFromURL(window.location.href) != ajaxHash) {
	                    window.location.replace(location.href+'#'+ajaxHash);
	                }
	            },this);
	            setTimeout(timeoutCallback, 200);
	            return true;
	        }
	        return false;
	    },
	    watchLocationForChange: function() {
	        
	        var newHash;
	        // Retrieve the value for the new hash
	        if (this.safariHistory !== false) {
	            // From the history array for safari
	            if (this.safariHistory[history.length]) {
	                newHash = this.safariHistory[history.length];
	            }
	        } else if (this.msieHistory !== false) {
	            // From the location of the iframe in MSIE
	            newHash = this.msieHistory.location.href.split('&')[0].split('=')[1];
	        } else if (location.hash != '') {
	            // From the window.location otherwise
	            newHash = this.getHashFromURL(window.location.href);

	        }

	        // Update the page if the new hash doesn't equal the last hash
	        if (newHash && this.lastHash != newHash) {
	            if (this.msieHistory !== false 
	            && this.getHashFromURL(window.location.href) != newHash) {
	                // Fix the location bar in MSIE so it bookmarks properly
	                location.hash = newHash;
	            }
	            
	            // Try executing any registered listeners
	            // using try/catch incase of an exception
	            try {
	                this.executeListeners(newHash);
	                // Update the links again incase any new
	                // ones were added with the handler
	                this.ajaxifyLinks();
	            } catch(e) {
	                // This will catch any bad JS in the callbacks.
	                alert(e);
	            }
	            
	            // Save this as the last hash
	            this.lastHash = newHash;
	        }
	    },
	    register: function(regex,method,context){
	        var obj = {'regex':regex};
	        if(context) {
	            // A context has been specified
	            obj.callback = function(matches) { method.apply(context,matches); };
	        } else {
	            // Use the window as the context
	            obj.callback = function(matches) { method.apply(window,matches); };
	        }
	        
	        // Add listeners to the callback array
	        this.callbacks.push(obj)
	    },
	    convertURLToHash: function(url) {
	        if (!url) {
	            // No url so return a pound
	            return '#';
	        } else if(url.indexOf("#") != -1) {
	            // Has a hash so return it
	            return url.split("#")[1];
	        } else {
	            // If the URL includes the domain name (MSIE) strip it off.
	            if(url.indexOf("://") != -1) {
	                url = url.match(/:\/\/[^\/]+(.*)/)[1];
	            }
	            // Strip off the root as specified in init()
	            return '#' + url.substr(this.ajaxifyRoot.length)
	        }
	    },
	    getHashFromURL: function(url) {
	        if (!url || url.indexOf("#") == -1) { return ''; }
	        return url.split("#")[1];
	    },
	    getLocation: function() {
	        // Check for a hash
	        if(!window.location.hash) {
	            // Not one so make it
	            var url = {host:null,hash:null}
	            if (window.location.href.indexOf("#") > -1) {
	                parts = window.location.href.split("#")[1];
	                url.domain = parts[0];
	                url.hash = parts[1];
	            } else {
	                url.domain = window.location;
	            }
	            return url;
	        }
	        return window.location;
	    },
	    executeListeners: function(hash){
	        // Execute any listeners that match the hash
	        for(var i in this.callbacks) {
	            if((matches = hash.match(this.callbacks[i].regex))) {
	                this.callbacks[i].callback(matches);
	            }
	        }
	    }
	}
	window['av']['actionPager'] = actionPager;
})();
