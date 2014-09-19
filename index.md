---
layout: page
title: Hello World
tagline:
---
{% include JB/setup %}

{% for post in site.posts %}
{% if post.pgroup == null %}
<article ckass="article-list">
    <header class="article-list-hd">
      <span>[{{ post.category-substitution }}]</span>
      <h2>
        {% if post.link == null %}
          <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
        {% else %}
          <a href="{{ post.link }}" target="_blank">{{ post.title }}</a>
        {% endif %}
      </h2>
      <span style="color: #999;">{{ post.date | date: "%Y-%m-%d" }}</span>
    </header>

    {% if post.description != null %}
    <p class="article-summary">{{ post.description }}</p>
    {% endif %}

    {% if post.subgroup != null %}
    <p class="aritcle-summary">
      {% for subpost in site.posts %}
        {% if subpost.pgroup == post.subgroup %}
          {% if subpost.link == null %}
            <a href="{{ BASE_PATH }}{{ subpost.url }}">
              {% if subpost.short != null %} {{ subpost.short }}
              {% else %} {{ subpost.title }}
              {% endif %}
            </a>、
          {% else %}
            <a href="{{ subpost.link }}" target="_blank">
              {% if subpost.short != null %} {{ subpost.short }}
              {% else %} {{ subpost.title }}
              {% endif %}
            </a>、
          {% endif %}
        {% endif %}
      {% endfor %}
    </p>
    {% endif %}
</article>
{% endif %}
{% endfor %}