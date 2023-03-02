---
title: "ChatGPT has an API"
date: 2023-03-02T10:17:44.014Z
showDate: true
draft: false
tags: ["blog", "openai", "gpt-3", "chatgpt"]
---
<span class='alignright'>

  ![nerdy tech evangelist frolicking in the scotish highlands, digital art](/images/highlands.png)

</span>

For months now (ok - about 3 months), we've been confusing ChatGPT with the underlying model, GPT-3, and the things one can do with it's API.  
There's been a good amount of "Now with ChatGPT" in the conversational AI landscape when of course people mean
using the GPT-3 API, but it's always felt like a bit of a nerdy clarification. 
  
With today's release of API access to ChatGPT, it feels as though the rules of engagement have changed a bit. We now know we are using the same underlying model as ChatGPT - specifically, `gpt-3.5-turbo`.   
Can we now just use the term interchangeably?  
"With GPTTurbo"? Turbo has a nice ring to it, doesn't it. 
  
I didn't see mention in the release notes of any reference to the specific overlaid training biases performed with ChatGPT to help produce less risqué output, a big concern in general with enterprises. We can only hope that functionality was intrinsic to the model, and not some specific adaption for the ChatGPT application. 
  
## Snapchat and Instacart get on board
[Today's release](https://openai.com/blog/introducing-chatgpt-and-whisper-apis) is the first time I've seen some big consumer brands get involved, with Snap Inc. and Instacart amongst others showcasing uses of GPT-3.5 and Whisper either already in their product, or coming later this year.   
  
This should be an indication of how quick adoption will be of new generative AI technology.  
With big consumer brands overcoming the valid fears of generative AI content (and some clever safeguards I'm sure), more innovative enterprises will soon follow.  
  
## How turbo is turbo?

I decided to run a quick, simple, and quite small benchmark test using Apache Bench to see just how **turbo** is turbo? 

| Model | Median | Max | Min |
| -------------- | ------ |------ |------ |
| Turbo | 2253 | 2463 | 658 |
| DaVinci | 1271 | 1689 | 1067 |
| Ada | 805 | 924 |  714 |

<small>(10 requests, concurrency of 2 - gotta save dem tokens)</small>
  
Turbo - slower than DaVinci? To be fair, it is launch day - huge demand, so we'll give the folks at OpenAI a pass on that one :-) 

## Hidden gems
There were a few other items in today's release which were confined to the footnotes, but are also a rather big deal. 

### OpenAI Whisper APIs
The demo showcase for Whisper which caught my eye was a thickly accented Scotsman telling us about the landscape, which was transcribed almost perfectly by this speech-to-text model.  
API access to Whisper means no expensive hosting costs, and the pricing is competitive. I haven't yet evaluated latency on recordings - the pricing makes me suspicious of the suitability for real-time uses.  

We've been using Azure's Speech to Text in production for a while now in a real-time voice use case in regions where strong accents are the norm, and this gives a pretty compelling reason to eventually consider a switch. 
  
| Provider | STT cost per minute | 
| -------------- | ------ |
| OpenAI Whisper | $0.006 |
| Azure STT | $0.016* |
| Amazon | $0.024* | 

<small>* volume pricing available</small>

## Data Retention & Dedicated
Also buried in the footnote of today's announcement is the news that a new 30-day data retention policy is being enforced, with data sent via the API (as opposed to ChatGPT's UI, I assume) no longer being used for training purposes. There have also been some modifications to terms of service, including clarifications on ownership of input and output (which does not lie with OpenAI). 
These sound like features geared towards encouraging adoption to those who may previously have been hesitant.   
  
  
For those with more extreme data privacy expectations or extremely high volumes, dedicated instances are now also available through OpenAI (previously only available via gated access with use case justification on Azure).  
  
Microsoft's 10bn investment in OpenAI is paying dividends - the underlying provider of these instances is still Azure, and Amazon seems at risk of being left behind in the world of Large Language Models.
