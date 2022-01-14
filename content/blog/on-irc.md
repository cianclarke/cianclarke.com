---
title: "On IRC"
date: 2015-09-23T17:20:53.400Z
showDate: true
draft: false
tags: ["blog"]
---

IRC is the de-facto standard communication channel for Open Source projects. It's perfectly suited, since the protocol itself is open, and has no ties or leanings towards any industry or commercial backers.  
Where it's not so well suited is in the realm of corporate communications. 

## Protocol Lacks Critical Chat Functionality
The original IRC protocol had no built-in mechanism to protect nicknames or channel names, which resulted in the addition of a number of "bot" users (NickServ, ChanServ etc). 
The protocol also has no support for a user's "status", leading clients to implement this by renaming the user's nick from `username` to things such as `username|meeting`, `user|away` etc.
Worse still, if a previous session is still lying around in the channel, a user will be logged in twice - once as `username`, and again as `username2`. 

### Ill Suited to P2P Communication
IRC deals well with multicast communications in a chat room, but not so well for peer to peer communication. 
In a badly configured IRC client, these "bot" users mentioned above will result in many unnessesary pings from system users, which can be mistaken for notifications from real users.
In many clients, as a user changes nickname (because of status change to "away", or because they have logged in again), the context of a previous conversation will be lost, and the nick you're trying to IM no longer exists. 

### No Offline Support
It's not possible to retrieve IM or channel history when a client disconnects, without setting up a repeater service (complicated & time consuming), or paying for an online service like [IRCCloud](http://www.irccloud.com). 
This somewhat defeats the purpose of multicast chat amongst teams, where context gathered from conversation carried out in other time zones can be quite important.  

### Client Setup
Speaking of clients, it takes a lot of setup to get a functional IRC client. 
Clients do not come with a sensible set of defaults, which means lots of additional setup, including:

* Auto Reconnect  
* Disabling notifications for every channel join & leave event
* Configuring NickServ to automatically re-authenticate

## Quality of Clients
I've found the quality of clients (on OSX, at least) extremely lacking, unless opting for a paid option. 
The only client I've found which I've been remotely happy with is 

### No Media, no Code Snippet Support
As a developer, being able to paste muli-line code snippets is vital. Thankfully many clients come with integrations with PasteBin or GitHub Gists, but all too often I've seen another colleague's pasted snippet cut off midway due to flood protection. 
It's also useful to be able to drag & drop a file, and have it immediately transmit. None of this is supported out of the box by the protocol, or indeed many clients.

### Alienating
As a tool, IRC is also both confusing and somewhat alienating to non-technical users. For aforementioned reasons, it's often difficult to set up, and non-technical users will very quickly flock to an alternative product.

## Alternatives
The first product to offer a compelling alternative in a corporate environment was 37 Signals' CampFire, a tool which made distributed teams & remote workers far more viable. 
More recent additions include HipChat, and Slack. 
Slack is the real star of the party here, and having used all three alternative products, it's head and shoulders above the competition. 
The out-of-box configuration is sensible, and it's incredibly extensible. If you can, use Slack. 

## The Argument for Corporate IRC
There's one pretty compelling argument for the use of IRC in a corporate deployment. 
Unlike many competing products, an IRC server can be deployed on premise, behind a VPN. This makes it a very well suited product for communication of a private nature, unsuitable for external consumption.  
Companies (understandably) can be uncomfortable with this data living on a public cloud, and this can make IRC a compelling choice.

## Conclusion
IRC is the perfect protocol for open source project communication. Here, a technical user base is guaranteed, so the risk of alienation is much reduced. With a lot of configuration, it's possible to set up an IRC client that works very well (for me, this was [IRCCloud.com](http://irccloud.com)). I'll continue to use it for all things Open Source. 
In a corporate environment, however, I'd much rather use a richer, better-suited tool. I'd rather use Slack. 

