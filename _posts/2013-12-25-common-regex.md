---
layout: post
title: "常用正则表达式"
description: "整理一些常用正则表达式，以满足日常"
category: "记事本"
category-substitution: 整理
tags: [JavaScript]
---

<table cellspacing="0">
    <caption>表1.常用的元字符</caption>
    <thead>
        <tr>
            <th scope="col">代码</th>
            <th scope="col">说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="code">.</span></td>
            <td><span class="desc">匹配除换行符以外的任意字符</span></td>
        </tr>
        <tr>
            <td><span class="code">\w</span></td>
            <td><span class="desc">匹配字母或数字或下划线或汉字</span></td>
        </tr>
        <tr>
            <td><span class="code">\s</span></td>
            <td><span class="desc">匹配任意的空白符</span></td>
        </tr>
        <tr>
            <td><span class="code">\d</span></td>
            <td><span class="desc">匹配数字</span></td>
        </tr>
        <tr>
            <td><span class="code">\b</span></td>
            <td><span class="desc">匹配单词的开始或结束</span></td>
        </tr>
        <tr>
            <td><span class="code">^</span></td>
            <td><span class="desc">匹配字符串的开始</span></td>
        </tr>
        <tr>
            <td><span class="code">$</span></td>
            <td><span class="desc">匹配字符串的结束</span></td>
        </tr>
    </tbody>
</table>

<table cellspacing="0">
    <caption>表2.常用的限定符</caption>
    <thead>
        <tr>
            <th scope="col">代码/语法</th>
            <th scope="col">说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="code">*</span></td>
            <td><span class="desc">重复零次或更多次</span></td>
        </tr>
        <tr>
            <td><span class="code">+</span></td>
            <td><span class="desc">重复一次或更多次</span></td>
        </tr>
        <tr>
            <td><span class="code">?</span></td>
            <td><span class="desc">重复零次或一次</span></td>
        </tr>
        <tr>
            <td><span class="code">{n}</span></td>
            <td><span class="desc">重复n次</span></td>
        </tr>
        <tr>
            <td><span class="code">{n,}</span></td>
            <td><span class="desc">重复n次或更多次</span></td>
        </tr>
        <tr>
            <td><span class="code">{n,m}</span></td>
            <td><span class="desc">重复n到m次</span></td>
        </tr>
    </tbody>
</table>

<table cellspacing="0">
    <caption>表3.常用的反义代码</caption>
            <thead>
        <tr>
            <th scope="col">代码/语法</th>
            <th scope="col">说明</th>
        </tr>
            </thead>
    <tbody>
        <tr>
            <td><span class="code">\W</span></td>
            <td><span class="desc">匹配任意不是字母，数字，下划线，汉字的字符</span></td>
        </tr>
        <tr>
            <td><span class="code">\S</span></td>
            <td><span class="desc">匹配任意不是空白符的字符</span></td>
        </tr>
        <tr>
            <td><span class="code">\D</span></td>
            <td><span class="desc">匹配任意非数字的字符</span></td>
        </tr>
        <tr>
            <td><span class="code">\B</span></td>
            <td><span class="desc">匹配不是单词开头或结束的位置</span></td>
        </tr>
        <tr>
            <td><span class="code">[^x]</span></td>
            <td><span class="desc">匹配除了x以外的任意字符</span></td>
        </tr>
        <tr>
            <td><span class="code">[^aeiou]</span></td>
            <td><span class="desc">匹配除了aeiou这几个字母以外的任意字符</span></td>
        </tr>
    </tbody>
</table>

<table cellspacing="0">
    <caption>表4.常用分组语法</caption>
    <tbody>
        <tr>
            <th scope="col">分类</th>
            <th scope="col">代码/语法</th>
            <th scope="col">说明</th>
        </tr>
        <tr>
            <th rowspan="3">捕获</th>
            <td><span class="code">(exp)</span></td>
            <td><span class="desc">匹配exp,并捕获文本到自动命名的组里</span></td>
        </tr>
        <tr>
            <td><span class="code">(?&lt;name&gt;exp)</span></td>
            <td><span class="desc">匹配exp,并捕获文本到名称为name的组里，也可以写成(?'name'exp)</span></td>
        </tr>
        <tr>
            <td><span class="code">(?:exp)</span></td>
            <td><span class="desc">匹配exp,不捕获匹配的文本，也不给此分组分配组号</span></td>
        </tr>
        <tr>
            <th rowspan="4">零宽断言</th>
            <td><span class="code">(?=exp)</span></td>
            <td><span class="desc">匹配exp前面的位置</span></td>
        </tr>
        <tr>
            <td><span class="code">(?&lt;=exp)</span></td>
            <td><span class="desc">匹配exp后面的位置</span></td>
        </tr>
        <tr>
            <td><span class="code">(?!exp)</span></td>
            <td><span class="desc">匹配后面跟的不是exp的位置</span></td>
        </tr>
        <tr>
            <td><span class="code">(?&lt;!exp)</span></td>
            <td><span class="desc">匹配前面不是exp的位置</span></td>
        </tr>
        <tr>
            <th rowspan="1">注释</th>
            <td><span class="code">(?#comment)</span></td>
            <td><span class="desc">这种类型的分组不对正则表达式的处理产生任何影响，用于提供注释让人阅读</span></td>
        </tr>
    </tbody>
</table>
###零宽断言

`(?=exp)`也叫零宽度正预测先行断言，它断言自身出现的位置的后面能匹配表达式exp。比如`\b\w+(?=ing\b)`，匹配以ing结尾的单词的前面部分(除了ing以外的部分)，如查找I'm singing while you're dancing.时，它会匹配sing和danc。
`(?<=exp)`也叫零宽度正回顾后发断言，它断言自身出现的位置的前面能匹配表达式exp。比如`(?<=\bre)\w+\b`会匹配以re开头的单词的后半部分(除了re以外的部分)，例如在查找reading a book时，它匹配ading。

    (?<=\s)\d+(?=\s)匹配以空白符间隔的数字

###负向零宽断言

零宽度负预测先行断言`(?!exp)`，断言此位置的后面不能匹配表达式exp。例如：`\d{3}(?!\d)`匹配三位数字，而且这三位数字的后面不能是数字；`\b((?!abc)\w)+\b`匹配不包含连续字符串abc的单词。

`(?<=<(\w+)>).*(?=<\/\1>)`匹配不包含属性的简单HTML标签内里的内容。`(<?(\w+)>)`指定了这样的前缀：被尖括号括起来的单词(比如可能是`<b>`)，然后是`.*`(任意的字符串),最后是一个后缀`(?=<\/\1>)`。注意后缀里的`\/`，它用到了前面提过的字符转义；`\1`则是一个反向引用，引用的正是捕获的第一组，前面的(\w+)匹配的内容，这样如果前缀实际上是`<b>`的话，后缀就是`</b>`了。

###贪婪与懒惰

当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。考虑这个表达式：`a.*b`，它将会匹配最长的以a开始，以b结束的字符串。如果用它来搜索aabab的话，它会匹配整个字符串aabab。这被称为贪婪匹配。

有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。前面给出的限定符都可以被转化为懒惰匹配模式，只要在它后面加上一个问号?。这样`.*?`就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。现在看看懒惰版的例子吧：
`a.*?b`匹配最短的，以a开始，以b结束的字符串。如果把它应用于aabab的话，它会匹配aab（第一到第三个字符）和ab（第四到第五个字符）

>为什么第一个匹配是aab（第一到第三个字符）而不是ab（第二到第三个字符）？简单地说，因为正则表达式有另一条规则，比懒惰／贪婪规则的优先级更高：最先开始的匹配拥有最高的优先权

###注释

小括号的另一种用途是通过语法`(?#comment)`来包含注释。例如：`2[0-4]\d(?#200-249)|25[0-5](?#250-255)|[01]?\d\d?(?#0-199)`。
要包含注释的话，最好是启用“忽略模式里的空白符”选项，这样在编写表达式时能任意的添加空格，Tab，换行，而实际使用时这些都将被忽略。启用这个选项后，在#后面到这一行结束的所有文本都将被当成注释忽略掉。例如，我们可以前面的一个表达式写成这样：

    (?<=    # 断言要匹配的文本的前缀
    <(\w+)> # 查找尖括号括起来的字母或数字(即HTML/XML标签)
    )       # 前缀结束
    .*      # 匹配任意文本
    (?=     # 断言要匹配的文本的后缀
    <\/\1>  # 查找尖括号括起来的内容：前面是一个"/"，后面是先前捕获的标签
    )       # 后缀结束

###示例

    ^[1-9]\d*$   #匹配正整数  
    ^-[1-9]\d*$   #匹配负整数  
    ^-?[1-9]\d*$    #匹配整数
    ^[1-9]\d*|0$    #匹配非负整数（正整数 + 0）  
    ^-[1-9]\d*|0$   #匹配非正整数（负整数 + 0
    ^[A-Z]+$    #匹配由26个英文字母的大写组成的字符串   
    ^[a-z]+$    #匹配由26个英文字母的小写组成的字符串
    ^[A-Za-z0-9]+$  #匹配由数字和26个英文字母组成的字符串 注意\w包含下划线_
    ^\w+$   #匹配由数字、26个英文字母或者下划线组成的字符串 

    \d{3}-\d{8}|\d{4}-\d{7}  #电话号码，匹配形式如 0511-4405222 或 021-87888822  
    [1-9][0-9]{4,} #匹配腾讯QQ号,腾讯QQ号从10000开始
    [1-9]\d{5}(?!\d) #匹配中国邮政编码,中国邮政编码为6位数字
    [^\x00-\xff]即ASCII 编码不在0-255的字符






    






