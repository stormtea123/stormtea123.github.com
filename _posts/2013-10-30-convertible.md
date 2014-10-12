---
layout: post
title: "jekyll 中文编码问题"
description: "今天在本地预览jekyll搭建的小博客出现如下错误Conversion error: There was an error converthing 'index.md'."
category: "记事本"
category-substitution: 原创
tags: [jekyll]
---

今天在本地预览jekyll搭建的小博客出现如下错误：

	Conversion error: There was an error converthing 'index.md'.

找到*C:\Ruby200-x64\lib\ruby\gems\2.0.0\gems\jekyll-1.2.1\lib\jekyll\convertible.rb*

修改：

	self.content = File.read(File.join(base, name));

为：

	self.content = File.read(File.join(base, name), :encoding => "utf-8");
