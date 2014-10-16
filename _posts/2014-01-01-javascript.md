---
layout: post
title: "JavaScript常见疑惑解答"
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










    





