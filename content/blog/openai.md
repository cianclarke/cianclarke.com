---
title: "ChatGPT, GPT-2 & What This Means for Conversational AI"
date: 2023-01-19T14:47:44.014Z
showDate: true
draft: false
tags: ["blog"]
---

Time for a brief return to my past life as bundle-of-red-hair-jetting-about-on-a-stage tech evangelist, to share some thoughts on ChatGPT. 
    
I’ve lost track of the number of friends and colleagues who have reached out asking “Hey you work in AI, what do you think about ChatGPT”? 
  
The first thing I need to explain is that I’m an unashamed hipster. I was into ChatGPT /before it was cool/. 
That’s not to claim I’m some grand visionary - but transformer and large language models (LLM herein, the technologies driving ChatGPT) have been around for a while. 
  
  ![Nerdy Preamble](/images/preamble.jpg)
  
Back in mid-2021, I wrote an elaborate description of the world-changing applications I had planned should OpenAI be kind enough to extend an invite to the closed beta of their product.
A few weeks later, an invite appeared, and it quickly became apparent that the latest LLM release by OpenAI, GPT-3, truly was a generational leap in the capabilities of this technology. 
  
The evolution of ChatGPT has resulted in some additional training steps to improve the accuracy of information delivered, and reduce the  [racial](https://time.com/6092078/artificial-intelligence-play)   [bias](https://www.wired.com/story/efforts-make-text-ai-less-racist-terrible/)  evident in some earlier releases of models. 
Add a user-friendly interface, and I can see why ChatGPT is becoming the AI zeitgeist of the decade.  
  
## Industry Responses
Companies working in the AI space I’ve seen broadly have two different responses to the phenomenon: 
  
### The defensive:
  
<blockquote>
  “ChatGPT is a novelty” 
</blockquote>
  
  
<blockquote>
“Unleashing a large language model (LLM) on your customers …. is a spectacularly bad idea.” 
</blockquote>
  
I get it - if you’ve invested a non-trivial amount of research $ into your own AI models, OpenAI is a threat - but to deny the step change that this brings is equivalent to burying one’s head in the sand. 
Nobody in the AI space can or will compete with the $1b OpenAI has already invested in bringing next-generation models to market - that is a ship that has already sailed. 

### The overly enthusiastic branding exercise:
  
<blockquote>
"Powered by ChatGPT"
</blockquote>
  
<blockquote>
“Now with more GPT-3”!
</blockquote>
  
Companies are flocking to claim they “support ChatGPT”. 
This statement makes very little sense - the latest evolution of the GPT-3 model in the form of ChatGPT is not yet available as a service for other companies to use within their products. 
Let’s assume anybody claiming as such in fact means “GPT-3 support”.
For the rest of this post, I’ll refer to benefits GPT-3 can bring to a business. 
The improvements which exist in ChatGPT, when it eventually is available for programmatic use by a business, will still apply - it’ll just all work /even better/.
  
If your business requires AI to generate responses to a set of questions that are highly specific to your business, and the answers to these questions do not exist in the public domain, a pre-trained model of GPT-3 will not be all that useful out of the box. 
  
It’s worth examining that statement a little closer, however. Unless your business is involved exclusively in the production of some highly specific, proprietary product, some sort of flux capacitor discombobulators, chances are some knowledge exists about your business in the public domain. 
No business exists in a vacuum, and GPT-3 can infer surprisingly results about questions users may have about your business. 
  
## A question of balance
My take - the truth lies somewhere in between the head-in-the-sand approach, and the all-in on GPT-3 approach. 
  
I queried ChatGPT with the queries of some of our most popular customers, and the results were nothing short of impressive. 
  
Some examples:
  
<pre style="white-space: pre-wrap;">
Q: Why might I consider Acme health insurance? 
A: Acme health insurance is a great option for those looking for comprehensive coverage. It offers a wide range of benefits, including coverage for doctor visits, hospital stays, prescription drugs, and more. Additionally, Acme offers competitive rates and flexible payment options, making it an attractive option for those looking for quality coverage at an affordable price.
</pre>
  
<pre style="white-space: pre-wrap;">
Q: Why was my mortgage transferred to Acme?
Your mortgage may have been transferred to Acme because it is a mortgage loan servicing company. This means that they handle the day-to-day management of mortgage loans, such as collecting payments from borrowers and communicating with them about their loans.
</pre>
  
Clearly, valuable uses for GPT-3 exist today for many businesses. 
In the short term, for most enterprises I think the best use cases will utilize some element of supervised learning - that is, a human in the loop reviewing any generated content, even if only briefly. 
  
Despite my best efforts, I couldn’t cause either GPT-3 or ChatGPT to generate any controversial statements about businesses which surfaced any racial bias or sexism built into the training data of the model.  
Nonetheless, you do run the risk of a questionable response appearing on a widget embedded in your website. 
  
## Where could a business using Conversational AI incorporate this technology today?
### Realtime Fallback Responses
A frequently touted use-case for GPT-3, and any future releases of LLMs is for real time fallback responses - cases in which your existing bot is unable to answer a user’s query definitively. 
Whether this is a good fit for your company depends on how risk-tolerant you are as a business. 
  
We have had very good results with using free text search technology on a closed-domain corpus of documents, delivering a paragraph of information found elsewhere in a document, where a custom crafted response (intent) may not exist  for a user’s query. 
Replacing this style of model with a LLM brings some risk. You will no longer be able to review the full list of potential responses the model can generate. 
  
If your legal team reviews all bot content for approval, this probably won’t be a good fit.
  
### Overcoming Cold-start by bootstrapping intent training
When developing a new bot, or even a new intent for an existing bot to handle, ChatGPT has proven very useful in generating training phrases or utterances. It can phrase questions very creatively when given a topic. 
  
Remember - be specific, and ask for a list, rather than free form text. 
![Utterance Generation using OpenAI](/images/chatgpt.png)
  
### Managing Intent Fallback: What your bot misses
Once a bot has gone live, data science and business analysis teams are often left with the arduous task of managing all the things a bot cannot yet respond to. 
In many cases, the response may exist, but the training data does not capture some new and unique way of phrasing a question. 
In the event a response does not exist, a suggested LLM response may help bootstrap a new bot response, generating both the training data for how a customer may ask the question, and even the fulfillment response itself. 
  
### Agent Assist
When a live-chat agent is receiving high volumes of queries, a common feature of live-chat systems is to automatically suggest the response an agent may consider sending. These can often be trained using relatively naive language models, with limited capabilities. 
An obvious extension of such a feature would be the integration of a GPT-3 based model. 
  
## What still needs improving in the world of LLM?
  
### Ingesting Knowledge in the closed domain
As we’ve already mentioned, GPT-3 works exceedingly well against knowledge in the public domain. 
What is still missing is the ability for a less technically inclined user to ingest information about their business to the model. 
While the model can be accentuated with what OpenAI calls “fine tuning”, this is not a simple task. To achieve meaningful results will require some data science skills. 
There’s a clear gap right now in tooling to index a corpus of documents, pre-process the content, and populate a fine-tuned model for a business. 
Does OpenAI fill this gap, or some other company? I’d be surprised if something wasn’t already in the works. 
  
### Sensitive workloads
Some businesses are not yet comfortable ingesting proprietary business information into a multi-tenanted cloud service like OpenAI. 
While these businesses could go and train their own model, estimates of the cost to do so range between $0.5m and $4m per training run. 
Meanwhile, while pre-trained models are available for download and offline inference, the far more cost effective “fine tuning” process is not yet available as an offline activity. 
  
### Guardrails
As already mentioned, opening up such a wide domain of knowledge as a business exposes some risk. 
By limiting the domain that responses can come from, some of this risk could be reduced. For example:
-A blacklist of competitors to a business which should not be mentioned in responses
-A whitelist of topics the model is permitted to respond with, restricting access to a substantial portion of the domain of the model
  
I’m not sure how achievable or realistic these guardrails may be, but without them, many businesses may struggle to implement LLMs into real time workloads. 
  
# Conclusion
There is a lot of hype around ChatGPT in the industry right now, with polarizing opinions on the technology. I’ve focused on applications which might benefit the users of our Conversational AI platform, which is a narrow focus - but the real world applications are far broader. 
Hopefully this is a useful dissemination of the merits of the technology of the underlying model as it exists today for a business (GPT-3), and where the drawbacks lie.  
Did GPT-3 generate some of the content of blog post? I’ll leave you to decide. 
  
