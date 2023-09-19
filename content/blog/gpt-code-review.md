---
title: "GPT Models for PR Review"
date: 2023-07-11T13:17:44.014Z
showDate: true
draft: false
tags: ["blog", "openai", "chatgpt", "development", "software"]
---
<span class='alignright'>

  ![Nerdy tech evangelist on a sailboat digital art](/images/dall_e_nerdy_tech_evangelist_on_a_sailboat_digital_art.png)

</span>

We had a problem all to familiar to development teams recently: Important feature needs releasing, but there is a backlog of pull requests which need reviewing.   
I decided to give GPT-assisted PR review another try.  
**TL;DR** - it's promising but still needs work.  
  

## The Output
I ran GPT against some spike (i.e. crap) code used to generate some statistics for this website, and here's what it found:  
    
* 1x potentially valid review comment that I would've made as a human.
* 2x generic "Cover Your Ass" type suggestions (review documentation, check variable names, write tests)
* 6x items that linter/CiCd tools could've caught with better semantics, readability, and IDE integration.


## The Challenges

The open source tools in this space are still evolving. I'm on waitlist for [Github Next's Co-Pilot PR Review](https://githubnext.com/projects/copilot-for-pull-requests), which seems to be the most promising.   
The token limit (4k or 10k) barely fits small PRs, and splitting them across multiple requests limits static analysis capabilities.  
  
Here are the tools I reviewed:  
https://github.com/anc95/ChatGPT-CodeReview  
https://github.com/vibovenkat123/review-gpt  
  
Here is the sample review output for the crapcode PR reviewed:
https://github.com/cianclarke/cianclarke.com/pull/3#discussion_r1259484521
  
If you've got any experience with GPT-assisted PR review, I'd love to hear about it.