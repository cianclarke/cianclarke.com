---
title: "How Popular Apps Access APIs"
date: 2014-09-26T13:30:11.000Z
showDate: true
draft: false
tags: ["blog"]
---


Ever wanted to glean insight into how modern mobile apps communicate with their APIs, but not had the means? As a developer, it’s easy to see this information – all it takes is the right tools. A debugging proxy is a proxy server which is run on the same network as the mobile device. When we force web traffic thru this proxy, and install it’s certificate on the device, we see inside the communications of all apps, whether they use HTTPS security or not. A form of man in the middle attack, these proxys are incredibly useful for developers to debug web requests happening within their applications on-device. It’s also fun to peek inside other apps! Today, we’re going to look at the integrations some popular apps make back to home-base, the backend APIs which they interact with. It’s always fun to see the design decisions other engineers have made, especially when it involves services which we use every day. It’s a good way to learn API design as applied in the real world, too. We’ll be looking at these integrations from a number of criteria. I’ve supplied as much information as possible about each API, but in request bodies, response bodies, query strings and otherwise, I’ve replaced anything which looks like a unique identifier with the text **GUID**, and obfuscated any sensitive information (sorry, no bank balances here!). Let’s get started.

###  gMail

In gMail, I did an inbox refresh action, and observed the HTTP traffic.

<table border="0"><tbody><tr><td>Method</td><td>POST</td></tr><tr><td>URL</td><td>https://mail.google.com/mail/u/1/s/</td></tr><tr><td>Request Format</td><td>Form Data</td></tr><tr><td>Request Body</td><td>[Gist](https://gist.github.com/cianclarke/7d542187fd694a4b043c)</td></tr><tr><td>Query Strings?</td><td>[Gist](https://gist.github.com/cianclarke/ca3335273136060d4734)</td></tr><tr><td>Response Code</td><td>200</td></tr><tr><td>Response Body</td><td>[Gist](https://gist.github.com/cianclarke/0498affc5c0a5f72811f) (Limited subset)</td></tr><tr><td>Total Payload</td><td>7.95kb</td></tr><tr><td>Duration</td><td>500ms average (varies lots)</td></tr></tbody></table>
  
Everything about the gMail requests & response screams “reduce payload size”. From QueryString data for presumably non-sensitive information, to form data in the request, to JSON arrays in the response. The request body is a formData key, with an array as the value. The response also contains a JSON array. The response is prefixed with the string

    )]}'

This prefix is likely a means of preventing the content from being evaluated, ajax hijacking – some discussion of this on Stack Overflow[1].

Stripping off this prefix, and pasting the response body into a javascript console, we immediately get an object we can interact with. It’s an array of arrays (of arrays of arrays), so I’m guessing the indexes mean something to the mobile client.  
 It seems Google has done as much as possible here to trim the size of request bodies, rather than create a usable API – an understandable compromise, considering the traffic this must receive.

###  Citizens Bank

My local bank here in the US is Citizens Bank, a New England chain. The app has a rather neat feature which allows me to retrieve my balance without logging into the app, so I’ve used this request as the base.

<table border="0"><tbody><tr><td>Method</td><td>POST</td></tr><tr><td>URL</td><td>https://services.citizensbank.com/fastbalance/soap/balances</td></tr><tr><td>Request Format</td><td>SOAP+XML</td></tr><tr><td>Request Body</td><td>[Gist](https://gist.github.com/cianclarke/2fba8fafe8e88cfab20e)</td></tr><tr><td>Query Strings?</td><td>None</td></tr><tr><td>Response Code</td><td>200</td></tr><tr><td>Response Body</td><td>[Gist](https://gist.github.com/cianclarke/131d2428a5dcd211357d)</td></tr><tr><td>Total Payload</td><td>1.98kb</td></tr><tr><td>Duration</td><td>709ms</td></tr></tbody></table>
  
The Citizens Bank API operates over SOAP, as the URL and XML scattered everywhere suggest. Unlike expected from SOAP services however, request and responses are relatively concise for the format. The request is interesting – it identifies me using some proprietary citizens identifier `CTZ_IOS_APP` as an iOS app, and supplies a device ID. This tells me there’s likely a binding on their server which links my device ID to my accounts, meaning I don’t have to authenticate. I’d long been curious as to how this worked – it’s interesting that a bank can supply balances with just one unique identifier, but a great convenience for end users. The response is a little more verbose – account names, the last 4 digits of account numbers (nice security addition), along with the balance is returned. This is a simple and concise API, and the only potential improvement is moving the payloads to JSON – which would massively reduce the quantity of information sent across the wire.

###  AirBnB

I performed a search on AirBnB for accommodation on Nantucket, a beautiful (albeit incredibly expensive) island off the coast of Massachusetts.

<table border="0"><tbody><tr><td>Method</td><td>GET</td></tr><tr><td>URL</td><td>https://api.airbnb.com/v1/listings/search</td></tr><tr><td>Request Format</td><td>JSON</td></tr><tr><td>Request Body</td><td>N/A</td></tr><tr><td>Query Strings?</td><td>[Gist](https://gist.github.com/cianclarke/76423d4862b414833eaf)</td></tr><tr><td>Response Code</td><td>200</td></tr><tr><td>Response Body</td><td>[Gist](https://gist.github.com/cianclarke/ee97644ef3fb9eabcde3)</td></tr><tr><td>Total Payload</td><td>9kb</td></tr><tr><td>Duration</td><td>500ms</td></tr></tbody></table>
  
The AirBnB API is a very well designed interface which illustrates good REST design principles. Although there isn’t a publicly documented REST API, it looks like this would be a breeze to consume. It’s versioned – and although ‘v1′ pollutes the top level namespace so early on, the flipside to this is maintaining backwards compatibility with older editions of, for example, their mobile phone application should they ever change their APIs. The API is paginated – my request for listings on nantucket has 107 results, but only 20 of these get returned initially. This helps to reduce payload size – when I scroll beyond a certain point in the app, a subsequent request for the next 20 is triggered.

Listings have an interesting property `has_double_blind_reviews`, which tells me they take review metrics pretty seriously. There’s also a property, `in_cta_copy_experiment` – in which I suspect certain listings are experimenting with a Call to Action in the copy? Things get a little less ideal when we navigate into a listing – a total of 5 API requests are generated for things like reviews for this property, profile information of reviewers, and further information about the property. It’s possible these could be rolled up into one request, which would help performance on lossy connections – but it’s still a nice API.  
 An interesting aside I noted while browsing the AirBnB app is static images are hosted on a website called `muscache.com` – a funny word play. WHOIS information for the domain appears to be fronted by another company, but this must be their CDN.

###  JetBlue

With JetBlue, I searched for a flight from Boston to San Francisco & observed the traffic. It turns out JetBlue uses a partner company to power it’s app through a mobile web container. It’s HTML going across the wire, boring! Surprising that such a large airline hasn’t implemented a native mobile experience, rather than taking a shortcut route however.

[1] http://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses



