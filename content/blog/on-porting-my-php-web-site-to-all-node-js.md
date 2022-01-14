---
title: "On Porting this site to Node.js"
date: 2015-03-18T23:48:52.357Z
showDate: true
draft: false
tags: ["blog"]
---

Having had my first exposure to Node.js in the very early days, I’d always had much conviction that it would be the next big framework-of-choice for many developers. 
From the very beginning, I’d used the Express framework to wire up various sites. I’ve built Client’s websites using Express, even an entire product - but my personal homepage always remained a javascript single-page-application, with bits of PHP left lying about.
My personal homepage itself was built way back in 2004, when I was only 16 - and 10 years on, besides the odd facelift it hasn't seen too many updates. 
The gallery was built using Menalto Gallery - a sparsely maintained (& since abandoned) PHP gallery solution, and the blog also PHP in the form of Wordpress.  

When I first started toying with Express, I’d ported the static pages of my site to a node.js application. Left to port were two major components - the blog and photo gallery. 

## Replacing The Gallery

The first component on my list to replace was Menalto Gallery - I hadn’t updated my photography collection in years, and storing the meta information in a database was a huge pain. Since my quest for a Node.js photo gallery turned up empty, I developed a Node.js based Photo Gallery called [node-gallery](http://github.com/cianclarke/node-gallery).  
I didn't want to fall into the same trappings with previous gallery software I'd used, so this had to be simple. It renders an image gallery based on a static directory of images, taking meta information from the embedded EXIF info of the photo, and titles from the filename. No databases needed - simple! 

## Replacing The Blog

Next up was the blog. Mine was Wordpress based, and I’d no desire to migrate away, but a PHP application and a Node.js application don’t play nicely side-by-side. Enter Ghost. 

Ghost is a blogging platform by John O’Nolan, one of the core contributors to WordPress. Ghost was created off the back of a highly successful Kickstarter campaign.
When Ghost was released to the public, my quest for an all-node homepage was complete. 

## Tying these components together
The last thing to do was to hook together all the standalone components of Ghost Blog and Node Gallery into my express application. 

### Ghost
The most challenging aspect was Ghost, which is designed first & foremost to be run as a standalone application. Fun fact - I've written & rewritten this post on 3 different occasions - my 2 previous attempts to migrate my site to Node stalled waiting for middleware functionality to become available in Ghost. Thankfully, this is now possible!

While a simple migration plugin for WordPress to Ghost exists, it’s certainly not a one-click migration. 
Ghost doesn’t deal with comments, and does very little with media - two hurdles to overcome.

#### Migrating Wordpress-uploaded Images
First, media - this was easy. I used the WordPress cloudinary plugin to upload all static assets to their server prior to exporting to ghost. This meant all images were stored on a free CDN external to the blog, and the URLs were updated automatically.  
Alas, this also meant whenever a blog post gained some traction, cloudinary would come looking for a paid subscription from me. In retrospect, I'd recommend a different route!  

#### Migrating Wordpress Comments
Then there’s the comments. Since Ghost is "Just a blogging platform", they intentionally don't deal with things like comments. 
At first, this was looking like a major headache - but it turns out once I migrated the old Wordpress site to use Disqus for comments, it was easy. Part of the ghost->wordpress migration plugin ensures all my short-urls stayed the same, so previous comments “just worked”. Nice!
Then, I had to include the [disqus code snippet](https://github.com/cianclarke/cianclarke.com/blob/11c19ac300e8424fd05fe780df011d4c5d8eb1c9/content/themes/casper/post.hbs#L72-L85) in `post.hbs` to show comments. 

Once comments were sorted, I had to include the Ghost middleware in my root application. Following [their guide](https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-NPM-module) lead me to something looking like this (shortened for brevity). 
    
    var app = express(),
    ghost = require('ghost');
	ghost({ config : path.join(__dirname, 'ghostConfig.js') }).then(function (ghostServer) {
	  app.use('/blog', ghostServer.rootApp);
	  ghostServer.start(app);
	  // include the rest of my middleware - see GOTCHA below
	});

One GOTCHA which I spent some time puzzling over was my use of an alternate view engine to Ghost. Turns out I had to include the EJS view engine, it's partials functionality, and all my subsequent routes after ghost was included - see [here for the full code.](https://github.com/cianclarke/cianclarke.com/blob/2a65bb9cc08852a6e3753365588cf51d1b848f87/app.js#L30-L51)  

Then, I had to make the blog seem like a seamless part of the rest of the site. To do this, I had to modify the base templates. Thankfully Ghost allows me to provide a custom theme - I just modified the `Casper` theme. I created a standalone ["parent header" partial](https://github.com/cianclarke/cianclarke.com/blob/aec55be24094927b3992f8e3d0cb8b4c0a8346b8/content/themes/casper/partials/parentheader.hbs) with my site's parent nav, then included it [in every Ghost template](https://github.com/cianclarke/cianclarke.com/blob/aec55be24094927b3992f8e3d0cb8b4c0a8346b8/content/themes/casper/index.hbs#L6). After some custom CSS, it was looking rather snazzy indeed. 

### Node Gallery
Now that the blog was looking as I'd wanted, time for the gallery. This was much simpler - I had built the gallery component for this very purpose, so it was made to be plugged into an existing express application.  
I include the gallery route, and tell it not to look after the rendering of the content.  
    
    app.use('/gallery', gallery({
    urlRoot: 'gallery', 
    staticFiles: '/public/photos', 
    title : 'Gallery', 
    render : false
    }), routes.gallery);
    
Now, the next piece of middleware in the chain (this `routes.gallery` function) is passed the relevant Gallery HTMl (in `req.html`), and gets to render this however it pleases. Here's what the `router.gallery` function looks like:
    
    routes.gallery = function(req, res){
      res.render('gallery.ejs', { gallery : req.html });
    };

I then [checked in my album structure to the git repository](https://github.com/cianclarke/cianclarke.com/tree/2a65bb9cc08852a6e3753365588cf51d1b848f87/public/photos), and Node Gallery had it's first "customer"!

## Time to Deploy
The last thing to do was deploy my application, replacing my existing hosted site. I went with the PaaS with the most extensive free offering, Heroku. 
It turns out to host a root-level domain on Heroku requires some funky DNS setup, since they don't support class A records. Migrating my DNS to CloudFlare solved this, while keeping my existing subdomains & email records working.  

So - it's been a long time coming, but it's about time I started practicing-what-I-preach, and using Node.js for my personal site. I'm glad to be able to "dogfood" node-gallery in a production-like environment, and most of my future efforts will be in improving this component as much as possible. 


