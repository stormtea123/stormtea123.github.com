---
layout: post
title: "git push.default"
description: "你可能会在执行 git push 时看到如下消息：warning: push.default is unset; its implicit value is changing in "
category: "记事本"
category-substitution: 原创
tags: [git]
---
你可能会在执行 git push 时看到如下消息：

    warning: push.default is unset; its implicit value is changing in 
    Git 2.0 from 'matching' to 'simple'. To squelch this message 
    and maintain the current behavior after the default changes, use: 
      git config --global push.default matching
    To squelch this message and adopt the new behavior now, use: 
      git config --global push.default simple

###Matching

‘matching’ 参数是 Git 1.x 的默认行为，其意是如果你执行 `git push` 但没有指定分支，它将 push 所有你本地的分支到远程仓库中对应匹配的分支。

    git config --global push.default matching

###simple

而 Git 2.x 默认的是 simple，意味着执行 git push 没有指定分支时，只有当前分支会被 push 到你使用 `git pull` 获取的代码。

    git config --global push.default simple

