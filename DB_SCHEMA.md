|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|Member|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|username|email|password|bio|token|

```
```

____
|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|Posts|
|:-:|:-:|:---:|:---:|:---:|:---:|:---:|
|id|member_id|image|title|body|date_created|
____
|&nbsp;|&nbsp;   |&nbsp; |&nbsp;   |Comments|
|:----:|:-------:|:-----:|:-------:|:------:|
|id    |member_id|post_id|titlebody|&nbsp;  |
____
|&nbsp;|&nbsp;   |&nbsp; |&nbsp;      |Likes|
|:----:|:-------:|:-----:|:----------:|:---:|
|id    |member_id|post_id|date_created|     |
____
|&nbsp;|&nbsp;        |&nbsp;      |&nbsp; | &nbsp;     |Message|
|:----:|:------------:|:----------:|:-----:|:----------:|:-----:|
|id    |member_id_from|member_id_to|post_id|date_created|       | 



|&nbsp;|&nbsp;        |&nbsp;      |&nbsp; | &nbsp;     |Following|
|:----:|:------------:|:----------:|:-----:|:----------:|:-----:|
|id    |member_id_following|member_id_followed|date_created|       | 

|&nbsp;|&nbsp;|&nbsp;  |Tags   |
|:----:|:----:|:------:|:-----:|
|id    |name  |post_ids|&nbsp; |