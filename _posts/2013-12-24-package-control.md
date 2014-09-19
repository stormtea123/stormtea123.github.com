---
layout: post
title: "sublime text安装Package Control "
description: "最简单的安装方法是通过sublime text控制台，通过ctrl+`快捷键调出控制台，打开后，粘贴和你subulime text相应版本的 Python代码到控制台中，敲回车"
category: "记事本"
category-substitution: 翻译
tags: [Sublime Text]
---

最简单的安装方法是通过sublime text控制台，通过<code>ctrl+\`</code>快捷键调出控制台或者通过菜单栏执行`View > Show Console`命令，打开后，把和你subulime text相应版本的 Python代码粘贴到控制台中，敲回车。

##快速安装

###Sublime text 3

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

###Sublime text 2

    import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')

##手册

如果安装失败（例如你的网络是代理），执行下面的命令手动安装Package Control：

1.  点击菜单 `Preferences > Browse Packages`
2.  打开进入安装Packages/ folder
3. 下载 [Package Control.sublime-package](https://sublime.wbond.net/Package%20Control.sublime-package) ，然后把下载的文件复制到到刚才打开的文件夹中
4. 重启sublime text









    






