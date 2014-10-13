/**
 * Auth:李金标
 * Time:2013-5-2
 */
var Util = {
    //选择器
    $: function(id) {
        return "string" == typeof(id) ? document.getElementById(id) : id;
    },
    //绑定事件
    addHandler: function(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if(element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    //获取样式
    getDefaultStyle: function(obj, attribute) {
        return obj.currentStyle ? obj.currentStyle[attribute] : document.defaultView.getComputedStyle(obj, false)[attribute];
    }
};

function FixedLayer (element, options) {
    var obj =  Util.$(element);
    var that = this;
    if(!obj){
        alert("您要设置的\"" + arguments[0] + "\"初始化错误\r\n请检查标签ID设置是否正确!");
        return false;
    };
    options = options || {};
    this.left = (typeof options.left == 'undefined')?'':options.left;
    this.right = (typeof options.right == 'undefined')?'':options.right;
    this.top = (typeof options.top == 'undefined')?'':options.top;
    this.bottom = (typeof options.bottom == 'undefined')?'':options.bottom;
    this.fixed = options.fixed;
    if(typeof this.fixed === 'boolean'){
        this.fixed = options.fixed
    } else{
        this.fixed = true   
    }
    this.init(obj);
    this.setPosition(obj);
    this.bindResize(obj);

};
FixedLayer.prototype = {
    //初始化
    init: function(obj) {
        var isIE6 = navigator.userAgent.indexOf("MSIE 6") !== -1
        if (this.fixed) {
            if(isIE6) {
                if((Util.getDefaultStyle(document.documentElement,'backgroundAttachment') !== "fixed")&&(Util.getDefaultStyle(document.documentElement,'backgroundImage') === "none")){
                    document.documentElement.style.backgroundImage = "url(about:blank)";
                    document.documentElement.style.backgroundAttachment = "fixed"; 
                }
                obj.style.position = "absolute";
            } else {
                obj.style.position = "fixed";
            }
            obj.style.zIndex = "999";
        }
    },
    //设置位置
    setPosition: function(obj) {
        var that = this;
        var isIE6 = navigator.userAgent.indexOf("MSIE 6") !== -1
        var dom = '(document.documentElement || document.body)';
        var domWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        var domHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (obj) {

            if (this.top == "middle") {
                if(isIE6) {
                    obj.style.setExpression('top', dom + '.scrollTop+'+ (eval(dom).clientHeight-obj.offsetHeight)/2);
                } else {
                    obj.style.top = "50%";
                    obj.style.marginTop = (-obj.offsetHeight/2) + "px"
                }
            } else {
                if (this.top !== "") {
                    if(isIE6) {
                        obj.style.setExpression('top', dom + '.scrollTop+'+this.top);
                    } else {
                       obj.style.bottom = "auto"; 
                       obj.style.top = this.top+'px'; 
                    }
                }
            }

            if (this.left == "center") {
                obj.style.left = "50%";
                obj.style.marginLeft = -(obj.offsetWidth/2) + "px"
            } else {
                if (this.left !== "") {
                    obj.style.right = "auto";
                    obj.style.left = this.left+'px';
                }
            }


            if (this.bottom !== "") {
                if(isIE6) {
                   obj.style.setExpression('top', dom + '.scrollTop+'+(eval(dom).clientHeight-obj.offsetHeight-this.bottom));
                } else {
                   obj.style.top = (scrollTop+domHeight-obj.offsetHeight-this.bottom)+'px';
                }
            }
            if (this.right !== "") {
                //obj.style.left = "auto";
                obj.style.right = this.right+'px';
            }
        }
    },
    bindResize:function(obj) {
        var that = this;
        Util.addHandler(window, "resize", function () {
            that.setPosition(obj)
        });
    }
}


