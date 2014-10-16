---
layout: post
title: "RequireJs"
description: "The optimizer can be run using Node, Java with Rhino, or in the browser. The requirements for each option"
category: "记事本"
category-substitution: 原创
tags: [RequireJS]
---


##optimizer
The optimizer can be run using Node, Java with Rhino, or in the browser. The requirements for each option:

* Node: (preferred) Node 0.4.0 or later.
* Java: Java 1.6 or later.

If you are using Node with NPM, you can install r.js globally as part of the "requirejs" package in NPM:

    npm install -g requirejs
    r.js -o app.build.js


If you want to install requirejs locally in a project as an npm package, instead of globally:

    npm install requirejs


###配置文件
####示例1

    ({
        mainConfigFile : "js/main.js",
        baseUrl: "js",
        removeCombined: true,
        findNestedDependencies: true,
        dir: "dist",
        modules: [
            {
                name: "main",
                exclude: [
                    "infrastructure"
                ]
            },
            {
                name: "infrastructure"
            }
        ]
    })

###配置参数

* `appDir`：项目目录，相对于参数文件的位置。
* `baseUrl`：js文件的位置。
* `dir`：输出目录。
* `modules`：一个包含对象的数组，每个对象就是一个要被优化的模块。
* `fileExclusionRegExp`：凡是匹配这个正则表达式的文件名，都不会被拷贝到输出目录。
* `optimizeCss`: 自动压缩CSS文件，可取的值包括“none”, “standard”, “standard.* keepLines”, “standard.keepComments”, “standard.keepComments.keepLines”。
* `removeCombined`：如果为true，合并后的原文件将不保留在输出目录中。
* `paths`：各个模块的相对路径，可以省略js后缀名。
* `shim`：配置依赖性关系。如果某一个模块不是AMD模式定义的，就可以用shim属性指定模* 块的依赖性关系和输出值。
* `generateSourceMaps`：是否要生成source map文件。





    






