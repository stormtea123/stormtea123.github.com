/**
 * Name JavaScript AV库
 * Author 阿狼
 * Url http://www.w3cmm.com
 */
(function() {
	if(!window.av) {
		window["av"] = {}
	}

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


	function addHandler(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	};
	window["av"]["addHandler"] = addHandler;

	//移除事件


	function removeHandler(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
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

})();
