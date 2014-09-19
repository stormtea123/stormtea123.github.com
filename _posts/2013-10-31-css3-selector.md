---
layout: post
title: "CSS3选择器"
description: "这篇文章将介绍一些CSS3属性"
category: "记事本"
category-substitution: 原创
tags: [css]
---

`:root`  选取文档的根元素。在html中，始终是指html元素<br />
`:nth-child()` 选取其父元素的自元素的序号来选取元素<br />
`li:nth-child(5)`这个选择器将匹配某个列表里的第5个`li`元素。括号里还可以使用关键词odd(奇数)或even(偶数)来隔行选取元素，比如第2、4、6……个。`nth-child()`可以将算式作为参数传入其中。算式的语法是`an+b`，其中a是需要你来设置的循环周期，n是从0开始的计数器，b是你想设置的偏移值。

	li:nth-child(3n+1)

n从0开始，并按周期循环递增<br />

`:nth-last-child()` 与`:nth-cild()`相似，但计算序号的方式不是从前往后，而是从后往前<br />
`:nth-of-type()` 根据其父元素的子元素的序号来选取元素，但只有符合给定类型(如p、img或其它)的元素才能参与排序，接收的参数和`:nth-child()`一样<br />

`:nth-last-of-type()`与`:nth-of-type`相似，但计算序号的方式不是从前往后，而是从后往前（倒数）<br />
`:first-child` 选取某个父元素的第一个子元素<br />
`:last-child` 选取某个父元素的最后一个子元素<br />
`:first-of-type` 选取某个父元素的第一个同类型兄弟元素<br />

	`p:first-of-type` #选择第一个p元素
	
`:last-of-type` 选取父元素的最后一个同类型元素<br />
`:only-child` 选取某个父元素的唯一一个子元素，只有一个子元素的时候符合条件<br />
`:only-of-type` 选取某个父元素的唯一一个某类型的子元素<br />
`:empty` 选取没有子元素或不包含文本的元素

`:target`伪类选取链接的目标元素



