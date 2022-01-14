---
title: "On the Perfect PaaS"
date: 2014-04-04T22:57:21.000Z
showDate: true
draft: false
tags: ["blog"]
---


PaaS, or “Platform as a Service” is a technology in it’s absolute infancy. Today, I discovered this the hard way. My Amazon Web Services free tier expired. To continue using my EC2 instance that I use to host my NodeJS, I’d have to start paying by the hour. Considering trendy.ie generates no revenue, I wasn’t going to renew. As a replacement, I went in search of a free PaaS provider.

To begin with, I had to re-architect the app. Originally, Trendy was an AJAX website served by Apache. Only the twitter streaming portion was run under Node, and was written for Node 0.4.*. A natural choice was to rewrite the application using Express, EJS templates and Socket.IO. The app is now written for node 0.6, and all it’s dependencies and PaaS deployment settings are managed by NPM and a package.json file.


##  Criteria

After rewriting the app, I had to find a place to deploy it. I drew up a shortlist of PaaS services to evaluate based on a set of criteria specific to my needs:

- Ease of Deployment
- WebSocket Support
- Dependency management through package.json
- Node 0.6+
- Free?!

The perfect PaaS would fulfill all of the above. Bonus points for configuring additional stuff through package.json, and a nice list of bindable services for expansibility.


##  The Contenders

A shortlist of PaaS services that I’d come across in the past was drawn up, along with the input of some folk on Twitter. All the services I used were either public, or I already had an invite to. This is by no means an extensive list, and is instead an attempt to evaluate all the major players.

- Cloud Foundry
- Heroku
- dotCloud
- Joyent’s [no.de](http://no.de)
- nodejitsu


##  CloudFoundry

[http://www.cloudfoundry.com](http://www.cloudfoundry.com)

Through my work with FeedHenry I’ve had extensive exposure to Cloud Foundry – we’ve partnered with them to provide an instance of FeedHenry that stages the serverside of a mobile app to Cloud Foundry, [http://mobilecf.feedhenry.com](http://mobilecf.feedhenry.com). I’ve also deployed some personal projects to CloudFoundry before, so I’ve plenty of prior experience, and it was my first port of call.  
 Deployment with Cloud Foundry is through their CLI, ‘vmc’ – a ruby gem. The CLI is well documented, and it’s very easy to get up and running. The deploy command is very lightweight, and as of very recently now supports package.json for dependencies.

[![](http://cianclarke.com/blog/wp-content/uploads/2012/06/cloudfoundry1.png "cloudfoundry")](http://cianclarke.com/blog/wp-content/uploads/2012/06/cloudfoundry1.png)

The documentation can lead users to believe that they need to download the MicroCloud VM as a required step – although incredibly useful, it’s not necessary for deployment to Public Cloud Foundry.

Service bindings are handled through the CLI, or at deploy time, and although the list of supported services is not extensive, the key players are there: Redis, MongoDB, MySQL and RabidMQ. Redis use in Node is not documented, but works perfectly fine!

Unfortunately, WebSockets are alas not supported, causing me to move on in search of a new PaaS.


##  Heroku

[http://www.heroku.com](http://www.heroku.com)

Traditionally, I’d have associated Heroku with deployment of Ruby apps, but it seems they’ve been doing Node with a while now.  
 Deployment is through adding heroku as a git remote, which is a little different to the others. To me, this feels even more natural than some “heroku deploy” command. If you don’t use git in your workflow (i.e. doing it wrong), it may feel a little strange.  
 Dependencies are through package.json, and all documentation is exceptional.

Services are bind through the use of what Heroku term ‘add-ons’. The list is staggering, however for a lot of services a third party commercial provider is used (e.g. Mongo, MySQL).

But what’s this – no WebSocket support? Worse still, Heroku state “The WebSockets protocol is still in changing rapidly and is not yet supported on the Cedar stack.”[1]  
 Sure it is, but Heroku deals with an entire stack of rapidly changing technologies. Sorry, doesn’t cut it!


##  dotCloud

[http://www.dotcloud.com](http://www.dotcloud.com)

DotCloud’s website promises it all – WebSocket suport, a range of node versions, a huge selection of services to bind to, and all for free. Unfortunately, when it comes to deployment, there are some flaws.

[![](http://cianclarke.com/blog/wp-content/uploads/2012/06/dotcloud.png "dotcloud")](http://cianclarke.com/blog/wp-content/uploads/2012/06/dotcloud.png)

dotCloud’s documentation first suggests your entire application be wrapped within a subdirectory, and a configuration file is needed at root and app directory level[2].  Enforcing such a strict app structure reduces portability, and strikes as awfully inelegant.  
 After setting up the application & the relevant configuration files, it didn’t work out of the box. Onwards!


##  Joyent’s no.de

[http://no.de](http://no.de)

My first port of call when I began searching for NodeJs hosting over 12 months ago was to the guys at Joyent. At the time, no.de was private invitation, and mine got lost in the post. The guys at Joyent support picked up on my tweet, and one of their employees personally sent me an invite. Alas, since acquiring an account, I’d never tried to deploy something until today. Requesting a new instance, I’m told “The free no.de service is currently at full capacity”. After tweeting about the same, I even received a tweet from them directing me to their paid service – on a sunday! They sure love their customer support.  
 This was a shame, as Joyent has full WebSocket support, and just so happens to be one of the coolest companies in the world right now! If I’m looking for commercial hosting, they’ll likely be a first port of call.


##  nodejitsu

[http://www.nodejitsu.com](http://www.nodejitsu.com)

I had given up on my quest for the perfect Node PaaS, when a FeedHenry colleague [@maleck13](https://twitter.com/maleck13/status/209333189087461376) reminded me of the guys at nodejitsu. Websockets are supported. All configuration is through package.json, and if anything is missing, you’re prompted at deploy time. Deployment is a lightweight command, and operations like retrieving logs or app statistics is a breeze.

[![](http://cianclarke.com/blog/wp-content/uploads/2012/06/nodejitsu.png "nodejitsu")](http://cianclarke.com/blog/wp-content/uploads/2012/06/nodejitsu.png)

The app worked out of the box first time, setup was a breeze, and the domain is pretty nice (trendy.jit.su). As a bonus, also offered is a sort of microcloud  to trial locally how your app performs under their environment. The only downside to nodejitsu is the lack of services to bind to. Trendy is a standalone Node app, but a lot of my projects recently have required an instance of Redis – I could see no simple way to do this on nodejitsu.


##  Conclusion

If I required bindable services, and didn’t need WebSocket support it’s likely I’d be returning to the old reliable of CloudFoundry. Both Redis and Mongo are available as free, bindable services within the PaaS, which is very appealing. For any future WebSocket projects though, it’s got to be nodejitsu.

 

[1] https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku  
 [2]http://docs.dotcloud.com/services/nodejs/



