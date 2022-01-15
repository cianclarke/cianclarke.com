---
title: "On Building an Online Tap List with BeerSmith"
date: 2015-03-23T22:53:48.383Z
showDate: true
draft: false
tags: ["blog"]
---

<span class="alignright" style="width: 270px;">
![Tap listing](http://i.imgur.com/MocBwR3.png)  
My current tap list  
</span>
BeerSmith seems to have established itself as the most popular recipe construction & inventory management system available to brewers. Unfortunately, this information contained within the product is not normally available to end users in an easy-to-consume format.  
I was interested in driving a website-based tap listing using BeerSmith rather than having to hard code onto my site, or use some other system. Here's how to achieve something similar to [the tap listing on my site](http://cianclarke.com/beers).

## Prerequisites
1. BeerSmith 2
2. Some place to deploy a Node.js application - we'll use an account on Heroku.
3. A web site on which you can edit the HTML.

## Setup
1. The first thing needed is to make the BeerSmith recipes file publically accessible. I achieved this by moving my BeerSmith documents directory to DropBox, but any file syncing service should work, once you can access that file over some external web address. 2. 
![Change documents directory](http://i.imgur.com/gQXBAwl.png)  
2. Once in DropBox, I navigated to the data directory, and copied a public sharing link for this file.  
![Copy public link](http://i.imgur.com/bFIMQO7.png)  
**Make sure to share this file, and this file only - your password is stored in another file in this directory. Do not copy your BeerSmith data directory to your DropBox Public folder.**
3. Set the Assistent Brewer field on every recipe you want to appear - I recommend setting "On Deck" and "On Tap". 
4. You'll need a Heroku account to do this. Click the Deploy button at the top of the [GitHub Page for BeerSmith Taplist](https://github.com/cianclarke/beersmithtaplist). Once logged in, Heroku will ask you to fill in a text box in the ENV section. It'll look something like this:    
![env screen](http://i.imgur.com/E9V9Vjy.png)  
In this box, fill in the public URL of your recipe file from the above dropbox step. 
The name of your application doesn't matter - now click the Deploy button. This step might take a few minutes.  
![Done](http://i.imgur.com/Yr7cDjH.png)
Once completed, click the "View it" link. You should see a page full of funnily formatted text starting with `{` - this is your tap listing formatted as JSON data, and means everything worked OK. Take the URL of this page, and make a note of it. 
5. Include the BeerSmith Taplist Code Snippet in the HTML of your web site where you want your listing to appear. Be sure to replace PUT_YOUR_APP_URL_HERE with the URL of your heroku app from the previous "Deploy to Heroku" step. 
    
    <div id="beersmithtaplist"></div>
    <script>
      var beersmith_app_url = "PUT_YOUR_APP_URL_HERE";
      // Don't edit below here
      (function(){
        var bstlscript = document.createElement('script'); bstlscript.type = 'text/javascript'; bstlscript.async = true;
        bstlscript.src = 'https://cdn.rawgit.com/cianclarke/BeersmithTaplist/master/static/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bstlscript);
      })()
    </script>
    
You can now style the tap listing using CSS to your hearts content!  
If you're a more advanced user who uses Node.js to build their site, you can also do some more advanced stuff with this - see the instructions on GitHub. 

## See it in action
I'm using this on my personal website here: [http://cianclarke.com/beers](http://cianclarke.com/beers) I'm using the Node.js version, but with a little JavaScript knowledge similar could be achieved using the above code. 

##  What's next
Next, I'd like to try and add a route to the app which gets deployed in Heroku that returns a transparent PNG with the user's tap listing. This would allow people to embed their tap listing in places like online forums. If I don't get around to it, pull requests welcome!
