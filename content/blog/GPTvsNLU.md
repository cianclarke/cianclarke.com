---
title: "ChatGPT's model v.s. \"Traditional\" Chatbot NLU"
date: 2023-02-15T22:17:44.014Z
showDate: true
draft: false
tags: ["blog", "openai", "gpt-3", "chatgpt"]
---
<span class='alignright'>

  ![Nerdy tech evangelist on a sailboat digital art](/images/dall_e_nerdy_tech_evangelist_on_a_sailboat_digital_art.png)

</span>

ChatGPT, and it's underlying model, GPT-3 is all the rage right now - but how does it perform against "traditional" Natural Language Understanding (NLU herein)?  

I decided to pitch GPT-3 against the tried-and-tested approach for building chatbots for many years. For this test I chose Dialogflow, but similar results could likely be achieved with Lex, Dialogflow, Watson, WIT, et al.. 

## The Dataset
The dataset comprises the different ways that a customer can inquire about the company's common services. It was divided with a standard 80/20 split of training and test data.  
  
The training data consists of **3,177 training utterances**, representing **100 intents**. The test data consistes of **794 examples**.  
  
  
  
## The Results
Effectively, it's a tie - note accuracies for Dialogflow and GPT-3 are within 1% of one another. 
  
| Model | Accuracy | Training Cost | Inference Cost | Correct/Total | Average Latency |
| -------------- | ------ |------ |------ |------ |------ |
| Dialogflow ES | **75%** | (free) | $1.59 | 592/793 | 551ms |
| OpenAI GPT-3 DaVinci | **74%** | $4.85 | $0.38 | 584/793 | 1179ms |
| OpenAI GPT-3 Curie | 74% | $0.40 |  $0.04 | 584/793 | 1089ms |

  
### Accuracy
OpenAI makes available several models which I have listed in order of their capabilities. Of these results, the accuracy of Curie  was what most surprised me - just a percentage point below that of Dialogflow.  
   
Classification is not the bread and butter of these models, and I had expected the gap in accuracies to be far more pronounced.   
Clearly, no benefits are to be gained by upgrading to the most advanced OpenAI model, Davinci - the accuracies between it and Curie are identical. 

### Training Cost & Latency
GPT-3 has a reputation for being expensive to run training jobs (known as "fine tunes") - but for a reasonably large chatbot training set, the fine tune was only costing $0.40!   
  
  
Latencies on GPT-3 are almost double that of a roundtrip to Dialogflow - but I expected the gap to be even wider. Likely fine for chat, but these long inference latencies may prove problematic for voice applications, where delays can feel more pronounced.  
  
   
Most surprising of the fine tune jobs is how long things were stuck in queue. During Irish morning time, where I'm based, jobs were taking a minimum of 1hr to leave the queue and start processing. Once the east coast of the USA is up, this time increases to almost 3hrs+. 
  

## What does this mean for Natural Language Understanding? 
**I don't see any practical advantages to using GPT-3** for intent detection workloads right now - it's much easier to load a model into a tool purpose built for these types of workloads like Dialogflow, and run inference against it. 
That's not to say there aren't an abundance of other uses for GPT-3 in your bots - this just probably isn't yet it.  
Although the results are effectively a tie, the training process on OpenAI was pretty arduous - see my aside below.  
 
What I do see, is something which enables a shift away from the traditional building blocks of a chat bot: 
the arduous process of gathering thousands of utterance examples, splitting data into test and training, optimising for accuracy by balancing the classes, then spending the rest of eternity searching for the eternal F1-score euphoria.  
  
With the advent of GPT-3, the world is moving towards  clever prompt engineering. So, with the usual warning that my crystal ball is no more precise than any of the other host of pundits, here is my bold prediction:   <br />
    
**In the next 2-3 years, we'll no longer be creating enterprise chatbots using intents.**  
  
Instead, we'll be feeding a transformer model knowledge about our business, and using its generative capabilities to allow users to query increasingly vast troves of data.
  
  <br /><br /><br /><br />
  
  
#### An aside on GPT-3 as a Multi-Class Classifier
<small>
Intent detection is not a primary use case for generative models - and just because we can does not, strictly, mean we should - but of course, I did. Had to be done.   
Making GPT-3 even reliably perform classifications took some effort. In my first attempts, output was were frequently taking some unwelcome creative licence with class labels, even with a low `temperature` param. Where the correct label was file_a_complaint , we'd get output which looked like file_a_complaint_**with_acme_inc**. Completion would not only create the correct prediction, but - well - predict subsequent sequences.  
  
To counteract this, I had tor replace all class labels with numbers, and perform a lookup table - e.g. the intent file_a_complaint would become `53`.  
  
Even still, completions would occasionally output `53 -> 53 -> 53 -> 53 ->`, or some other unwelcome sequence - so to retrieve reliable class labels, I was having the model log probable tokens (`logprobs`), and then taking the most likely token from the response (`choices[0].logprobs.tokens[0]`). This approach worked great, but felt clunky.  
Some researchers are now suggesting the use of GPT-2's Fast Tokenizer to encode the class labels, and use a param called `logit_bias` to restrict the output potential of the model using weights - something to next dig into. 
</small>
