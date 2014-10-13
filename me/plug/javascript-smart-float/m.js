var Util = {
    //选择器
    $: function(id) {
        return "string" == typeof(id) ? document.getElementById(id) : id;
    },
    addHandler: function(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if(element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getScrollY: function() {
        if(typeof window.pageYOffset != 'undefined') {
            return window.pageYOffset;
        }

        if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            return document.documentElement.scrollTop;
        }

        return document.body.scrollTop;
    },
    getElementTop: function(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while(current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
};
(function() {
    function SmartFloat(element, referElement) {
        this.options = {
            element: Util.$(element),
            referElement: Util.$(referElement)
        }
        //初始化
        this.init();
    };
    SmartFloat.prototype = {
        init: function() {
            var that = this
            var obj = that.options.element;

            //检查是否设置对象
            if(!obj) {
                return;
            }
            var thisTop = Util.getElementTop(obj);
            if(that.options.referElement) {
                var referTop = Util.getElementTop(that.options.referElement);
            }
            var pos = obj.style.position;
            //绑定事件
            Util.addHandler(window, "scroll", function() {
                if(Util.getScrollY() > thisTop) {
                    var isIE6 = !! window.ActiveXObject && !window.XMLHttpRequest;
                    //如果不是是IE6
                    if(!isIE6) {
                        //如果需要根据相对元素定位
                        if(that.options.referElement) {
                            if(Util.getScrollY() + obj.offsetHeight < referTop) {
                                obj.style.position = "fixed";
                                obj.style.top = "0";
                            } else {
                                obj.style.position = pos;
                                obj.style.top = "";
                            }
                        } else {
                            obj.style.position = "fixed";
                            obj.style.top = "0";
                        }
                    } else {
                        //如果需要根据相对元素定位
                        if(that.options.referElement) {
                            if(Util.getScrollY() + obj.offsetHeight < referTop) {
                                obj.style.position = "absolute";
                                obj.style.top = Util.getScrollY();
                            } else {
                                obj.style.position = pos;
                                obj.style.top = "";
                            }
                        } else {
                            obj.style.position = "absolute";
                            obj.style.top = Util.getScrollY();
                        }

                    }
                } else {
                    obj.style.position = pos;
                    obj.style.top = "";
                }
            });
        }
    };
    new SmartFloat("nav1", "nav2");
    new SmartFloat("nav2");
})();