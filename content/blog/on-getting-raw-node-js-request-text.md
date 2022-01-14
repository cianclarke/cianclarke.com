---
title: "On Raw Requests from the Request Module in Node.js"
date: 2015-09-17T19:05:20.957Z
showDate: true
draft: false
tags: ["blog"]
---

I've been working on creating an API mapper for RedHat Mobile, the first phase of which involves a basic REST client. Part of the debugging output is a RAW view of the outbound HTTP request, and the incoming HTTP response, line for line - always a useful thing to have, since HTTP clients can inject their own content unbeknownst to us. 

Some googling of "mikeal request raw request response" didn't yield results, so here's how I solved it.

## Getting the Raw Response
This isn't so difficult - we first perform our request.
````
var request = require('request'),
rawHttpResponse = '';

var r = request.get({
  url : 'http://www.google.ie'
}, function(error, response, body){
  if (error){
    return console.error(error);
  }
  console.log(rawHttpResponse);
});
```
  
Now that we've done our request, we wait for it to get assigned a socket - but only listen for this event once, since it can fire multiple times.  
Once the request is assigned a socket, we overwrite the socket's ondata function.  
Unfortunately, we can't just rely on `socket.on('data')` events, we need to overwrite the function the underlying stream implements, `ondata`. Nasty, but it gets worse! ;-)

```
r.once('socket', function(socket){
  var oldOnDataFunction = socket.ondata;
  // Every ondata event, append to our raw request buffer
  // NB this can't be achieved by socket.on('data')..
  socket.ondata = function(buf, start, end) {
    rawHttpResponse += buf.slice(start, end).toString();
    return oldOnDataFunction.apply(this, arguments);
  };
});
````
##Getting the Raw Request
Here, it gets a little harder. As before, we construct our request - this time, let's do a POST to add the challenge of getting the response body. 
The first thing we want is the request headers which get sent. 
These are available to us under a "private" property (not really private, but not intended for our use - one prefixed with an `_`), which we can see once the socket gets assigned - `socket._httpMessage._header`.  
We want to prepend this to our `rawHttpRequest` variable, and we'll see why in a while. 

```
var request = require('request'),
rawHttpRequest = '',
r = request.post({
  url : 'http://www.google.ie',
  body : 'helloworld'
}, function(error, response, body){
  if (error){
    return console.error(error);
  }
  console.log(rawHttpRequest);
});

r.once('socket', function(socket){
  // Once the socket is assigned, prepend the headers
  rawHttpRequest = socket._httpMessage._header + rawHttpRequest;
});
```
  
Now we have the headers, let's try and get the send body. There's no useful `write` event emitted on either a socket or an outbound http request. We could, of course, just take the raw body string - but if we sent form data under the `form` property to the request module, or JSON data under the `json` property, we won't be seeing exactly what gets sent across the wire. 
Instead, we're going to have to overwrite request's write function - sorry.

(Skip this paragraph, if you don't care about the "why" here)  
<small>When the request module writes data, [it does so via the Node.js HTTP module](https://github.com/request/request/blob/master/request.js#L1383). This immediately ends up getting dispatched to Node core's [_send](https://github.com/nodejs/node/blob/c7be08cec18b0591381126e149cac96a05125966/lib/_http_outgoing.js#L464) function, without emiting any useful event to us. </small>

So, we overwrite the `write` function of request, so we can see the raw string it sends through to Node's http module after it's done it's data conversion. This write function will happen before we are even assigned a socket, hence why we prepended our headers earlier whenever they become available, and always *app*end to the string down here.
Beware - this is nasty stuff!

```
// Listen to all request body write events
var oldWriteFunction = request.Request.prototype.write;
request.Request.prototype.write = function(data){
  rawHttpRequest += data.toString();
  oldWriteFunction.apply(this, arguments);
};
```

## Conclusion
So, a pretty nasty hack - but there we have it. Raw request & response text as it goes across the wire.  
There's probably an infinitely better way of doing this by attaching to the stream which request exposes - if anybody knows what it is, let me know in the comments!
