---
layout: post
title: "JavaScript总结"
description: "经常看到，整理一下备忘"
category: "记事本"
category-substitution: 转载
tags: [JavaScript]
---


##JavaScript中双叹号(!!)作用

经常看到，整理一下备忘

    var foo;  
    alert(!foo);//undifined情况下，一个感叹号返回的是true;  
    alert(!goo);//null情况下，一个感叹号返回的也是true;  
    var o={flag:true};  
    var test=!!o.flag;//等效于var test=o.flag||false;  
    alert(test);  

这段例子，演示了在undifined和null时，用一个感叹号返回的都是true,用两个感叹号返回的就是false,所以两个感叹号的作用就在于，如果明确设置了变量的值（非null/undifined/0/""等值),结果就会根据变量的实际值来返回，如果没有设置，结果就会返回false。

##concat

    var a = [].concat([[1],[2]]);
    var b = [].concat.apply([],[[1],[2]]);
    console.log(a) //[[1],[2]]
    console.log(b) //[1,2]

##js函数前面的加号，叹号

    +function(){}();

这里的加号，也可以替换成!,~等其他一元操作符，其效果相当于：

    (function() { console.log("Foo!"); })();
    // or
    (function() { console.log("Foo!"); }());

如果没有这个加号的话，解析器会认为function是一个函数声明的开始，而后面（）将会导致语法错误。在function前面加上+号时，就变成了一个函数表达式，而函数表达式后面又添加了一个()就变成了一个立即执行的函数了。

尝试使用try catch
if判断多的时候使用swtch?
99.99% of the time, you shouldn't care.

For just a few items, the difference is small. If you have many items you should definitely use a switch.

http://stackoverflow.com/questions/767821/is-else-if-faster-than-switch-case








    






