---
title: "On app.ft.com"
date: 2011-08-17T22:37:22.000Z
showDate: true
draft: true
tags: ["blog"]
---


Having heard much hype about how the new mobile strategy of the Financial Times, I decided it was certainly worth some investigation. Is this just a creative way to circumvent the iOS in-app subscriptions fracas, or if this genuinely a piece of Ajax genius? To find out, this evening I’ve taken a deep dive into the source code of the app.

**When we first launch, we’re greeted with a FT splash screen, a cityscape background image with a loading ticker. This gives a great first impression – this isn’t just a run of the mill website optimized for mobile. This leads me to the first burning question, how did they implement it? **  
 //TODO

**After we’ve made it past the splash screen, the first thing I do is scroll about. We have no fixed header or footer navigation, but instead scroll the entire page as if it were a newspaper.**  
**But wait – this is no ordinary scrolling. Horizontal scroll brings me to a new section of the paper. Incredibly impressive, completely performant, and follows my finger just like a native app would.  **

//TODO: How

Opening a news item, a company profile, or any ‘detail’ action slides a new page left, loading the content as I’d expect from a native app. Toolbar buttons take cues from native iOS apps, presenting options to share on social media and change font size. A back button takes us back to the category page – nothing too exciting happening here.

There’s a constant reminder to add this app to your homescreen, with promise for a increased feature set. The motivation for doing this is most interesting, as it removes the safari wrapper from the app, making a truly native feeling experience.

**When we add & first launch the app from our home screen, the app prompts us to allow increased data storage capabilities to the app (50mb). Let’s see how this is achieved. **

//TODO: How

The FT app is an impressive example, showcasing how a native quality app can be written using standard web technologies. The look and feel is stunning, and I think it fair to conclude the app is a technically groundbreaking, performant and elegant javascript app.

**Further reading:**

http://aboutus.ft.com/2011/06/07/ft-web-app-technical-qa/

http://www.minonline.com/news/17250.html



