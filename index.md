---
layout: page
title: Hello World
tagline:
---
{% include JB/setup %}

<ul>
  {% for post in site.posts %}
  {% if post.pgroup == null %}
  <li class="article-item">
    <h2 class="article-item-tit">
      {% if post.link == null %}
        <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
      {% else %}
        <a href="{{ post.link }}" target="_blank">{{ post.title }}</a>
      {% endif %}
    </h2>
    <span>[{{ post.category-substitution }}]</span>
    <span style="color: #999;">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
  {% endif %}
  {% endfor %}
</ul>