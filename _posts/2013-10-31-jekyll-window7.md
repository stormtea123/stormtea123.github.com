---
layout: post
title: "Window7下搭建jekyll"
description: "Jekyll其实是一个转换引擎，可以把markdown文本根据模板转成html文件，也就是静态网站，这样这些内容可以很方便的放置在你的服务器上，GitHub Pages 也是这么个实现，所以你可以把网站内容放到GitHub上。"
category: "记事本"
category-substitution: 原创
tags: [jekyll]
---

>Jekyll其实是一个转换引擎，可以把markdown文本根据模板转成html文件，也就是静态网站，这样这些内容可以很方便的放置在你的服务器上，GitHub Pages 也是这么个实现，所以你可以把网站内容放到GitHub上。

##下载rubyinstaller、rubydevkit

    http://rubyinstaller.org/downloads/


rubyinstaller安装结束后，运行`ruby -v`显示版本号。如果正常显示Ruby版本号，表示安装成功。

打开CMD进入DevKit解压后的目录，开始初始化安装

    ruby dk.rb init
    ruby dk.rb install


rubyinstaller、rubydevkit版本号要对应起来，否则会出现`“Invalid configuration. Please fix 'config.yml.'”` 

##安装jkeyll

    gem install jekyll

安装完成后，可以使用`jekyll -v`来检查是否安装成功

由于国内网络原因，导致 rubygems.org 存放在 Amazon S3 上面的资源文件间歇性连接失败(http://ruby.taobao.org/)。

    gem sources --remove https://rubygems.org/
    gem sources -a http://ruby.taobao.org/


####Running Jekyll on Windows
[http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)

