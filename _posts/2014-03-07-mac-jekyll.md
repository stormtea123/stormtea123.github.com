---
layout: post
title: "mac配置jekyll"
description: "如何在Mac下配置jekyll，最近刚换mac，在尝试配置一些工具，英文不太好，整理几个常用的命令"
category: "记事本"
category-substitution: 原创
tags: [mac]
---

    
最近刚换mac，在尝试配置一些工具，英文不太好，整理几个常用的命令

###Install with RubyGems

	gem install jekyll
	
	jekyll build
	# => The current folder will be generated into ./_site
	
	jekyll build --watch
	# => The current folder will be generated into ./_site,
	#    watched for changes, and regenerated automatically.
	
	jekyll serve
	# => A development server will run at http://localhost:4000/
	
	jekyll serve --detach
	# => Same as `jekyll serve` but will detach from the current terminal.
	#    If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
	#    If you cannot find the PID, then do, `ps aux | grep jekyll` and kill the instance. [Read more](http://unixhelp.ed.ac.uk/shell/jobz5.html).
	
	jekyll serve --watch
	# => Same as `jekyll serve`, but watch for changes and regenerate automatically.

	