---
layout: post
title: "NodeJs本地模式与全局模式的区别 "
description: "创建SSH key的方法很简单，执行如下命令就可以"
category: "记事本"
category-substitution: 原创
tags: [NodeJs]
---

安装命令比较：

    npm  [install/i]  [package_name]  #本地模式(当前目录)
    npm  [install/i]  -g  [package_name] #全局模式

本地模式：npm命令默认情况下会将包安装到当前目录下，避免了不同程序依赖不同版本包的冲突；减少了包开发者API的兼容性的问题；缺点是会出现一个包安装多次的情况。

全局模式：提高程序重复利用，避免一个程序多个版本的情况；但是缺点是难以处理不同版本的依赖。