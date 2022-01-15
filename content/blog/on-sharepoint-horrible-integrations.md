---
title: "On Sharepoint: An Angry Developer's Integration Primer"
date: 2015-08-18T19:43:54.549Z
showDate: true
draft: false
tags: ["blog"]
---

In the [day job](http://www.feedhenry.com/about/careers/senior-software-engineer-ireland/), we find ourselves integrating with SharePoint all the time. As is typical with Microsoft technologies, SharePoint is not really renowned for it's open APIs.   
"**Share**"point doesn't really like to share.  

## A SharePoint Primer
<small>_(Skip this if you know about how SharePoint works)_</small>
Here's the basics I wanted to know about this product before I began integrating:

* SharePoint is a number of products:
  * SharePoint 2013 - the on premise version of SharePoint which I've seen most often. 
  * Sharepoint 365 - the online SharePoint product. 
* **Everything is a List** in SharePoint. Document Library? A list. The tasks app? Just a list. Discussion Board? You got it, it's a list. Site Pages? List. Turns out, SharePoint reuses the base type `List` for a lot of things. 

## Bad APIs
SharePoint takes REST, and destroys it. It's tough to know where to begin, but we must start somewhere. 

### Authentication
SharePoint allows authentication across a number of different schemas. Pretty typical of most enterprise software, and not in itself a valid complaint. 
The issue arises when we encounter servers running NTLM as the authentication mechanism - horrific stuff.
Then there's oAuth - only available via some access control manager service running separately in Azure. 
Lastly, 

### oData
oData is a protocol which builds upon JSON, by adding infinite strangeness to URL structure, and padding the data excessively. It's backed by a number of companies - SAP, Microsoft, and also my current employer. I'm not really sure why. 
The web site lists example responses which are improperly indented. Worse still, these examples contain [invalid JSON](http://www.odata.org/getting-started/understand-odata-in-6-steps/). 

SharePoint allegedly implements the oData protocol, but it seems to be a random hodgepodge of concepts from this standard. More on this later. 

### Getting Lists: A Bad API Design
Microsoft were kind enough to give us a REST API, and considering this is from a company I know best for those massive WCF based SOAP service responses, and the wonderfully proprietary `.doc` format, this is a step in the right direction. So, how might we ask for a response in JSON?
Surely it's just a matter of setting the header `Content-Type: application/json`?  
Wrong! `Content-Type:application/json:odata=verbose`.
        
So, we've asked for JSON back, and let's say it's lists we're after. We do a GET request like so:
    
    GET /_api/web/lists
    
Good so far. We'll get a response back that looks like this (**heavily trimmed for brevity**): 
    
    {
      "d" : {
        "results" : {
          "1" : {
            "Title" : "Foo",
            "Id" : "de89a92d-f340-4e42-af6a-87b5f756a258"
          },
          "2" : {
            "title" : "Bar",
            "Id" : "698e8de7-37f2-49a9-a49e-fe2d96b4864e"
          }
        }
      }
    }
    
There's a lot wrong with this. 

1. Why do we have this parent namespace `d`? We know we're getting data back (hey, d for short - like what ya did there), that's what APIs do! 
2. Look closely at our results `d.results`. See something strange? That's not an Array, that's an object indexed by numbers. That's really silly.
3. We get all this metadata on every object telling us about the list item - **75 lines** worth of it. This seems like wasted payload, and that means wasted bandwidth. 
We can get the item ID, under the `Id` property - great, I could use that!
There's also this `__metadata.id` - but that's not our ID property, oh no. That's something else entirely - which I've yet to find a real use for. Confused yet?


<small>( If you're really interested, you can see a full sample response from a call to the `/lists` API in all it's glory [here](https://github.com/cianclarke/sharepointer/blob/master/test/fixtures/lists.js). )</small>

Now, let's read an individual list. 
    
    GET /_api/web/lists(guid'de89a92d-f340-4e42-af6a-87b5f756a258')
    
Before we even look at the response, things are getting weird.
1. Why do we have what to most people looks like a function call in our URL? We're not executing any action, we're just reading a resource. Apparently, that's _an oData thing_ - weird, but whatever, I could live with it were it even a valid oData _thing_. 
Why don't we just ask for `/_api/web/lists/de89a92d-f340-4e42-af6a-87b5f756a258`? 
2. We've gotten over the funky function call thing, but we're now calling this big long number a `guid`. 
In our previous lists read results, we called it an `Id`! We never called it a `guid`. Why `guid`?
    
    //TODO: Is this valid oData?
    
We'll get a response back that looks exactly like a single item from the list API above, so no point in examining this again.

### Getting List Items: It Gets Worse
To me, probably the single most important thing in a SharePoint list is the items contained within. 
To retrieve list items, we append `/Items` to our read result like this: 
    
    GET /_api/web/lists(guid'de89a92d-f340-4e42-af6a-87b5f756a258')/Items
    
Finally, some sense! I like this. Sure, I'd rather if these items (perhaps along with the fields) were returned with the list read result above rather than all that useless metadata, but they're not - no big deal. 
However, the same is true of these things:
    
    FirstUniqueAncestorSecurableObject, RoleAssignments, ContentTypes, DefaultView, EventReceivers, Forms, InformationRightsManagementSettings, ParentWeb, RootFolder, UserCustomActions, Views, WorkflowAssociations.
    
That's a lot of potential API calls to get a full, comprehensive view of the list definition. 
I have no idea what any of these things do. If you do, let me know in the comments? :-)
    
###  Creating, Updating & Deleting Lists: Rock bottom.
Now, let's see what's involved to create, update and delete a list. 
Before we even try to update a list, we need to retrieve what's called a "context", which comes from the Context Info API. 
    
    POST /_api/contextinfo
    
We're retrieving information here about this context, so performing a POST makes no sense. Then, we need to pick a value off the response, body, `GetContextWebInformation.FormDigestValue` and send it in the subsequent request. 
Oh, and this value changes occasionally like some sort of session, but I'm not quite sure how often. Of course, none of this is documented anywhere I could find - black magic of the finest.  

Now, we're ready to create our lists. 
    
    POST /_api/web/lists
    
As part of this `POST`, we set a header `X-RequestDigest: valueGoesHere`, with the value from the abive `FormDigestvalue` property. 
Great - that makes sense so far! We send a request body which looks like this:
    
    {
        "__metadata": {
          "type": "SP.List"
        },
        "BaseTemplate": 100,
        "Title": "My new list",
        "Description": "Some desc"
    }
    

1. What is this BaseTemplate? I've never had to set it to anything other than 100, so could we not have a default value? 
2. We're POSTing to `/lists` - do we really need to remind SharePoint in the body's `__metadata` that this is a list? 

These are forgivable offenses, so let's move on to **updating** a  list. As before, we set the same header, and we send the list body we wish to update. 
    
    POST /_api/web/lists(guid'de89a92d-f340-4e42-af6a-87b5f756a258')/Items
    
Wait, `POST`!? We're doing an update operation. Shouldn't this be a `PUT`? 
Nope, instead, we set a header `X-HTTP-Method: MERGE`. This isn't a `MERGE`, since the full list body is expected in the update, and not just sections of it - it should use method `PUT`.  
Similar for delete, `X-HTTP-Method: DELETE`, with no body.   
  
This is OData Method Tunneling at work - a nice workaround for clients which don't support `PUT`, `DELETE` like `<form>s` in web browsers. The idea is it's an alternative, however, and not the only option! Thanks, SharePoint. That's great - real great. 

  
## Sharepointer: Making SharePoint Less Awful
There's a few SharePoint modules already in existence for Node.js. I've used a few of them before, and built our first iteration of the RedHat Mobile SharePoint Connector based on one of these. 
Unfortunately, none of these were appropriately unit tested, or supported multiple authentication technologies. In some, the full set of API operations wasn't supported.  
In what I'd like to think was an act of "give back to the community", rather than "not written here syndrome", I give you [Sharepointer](http://www.github.com/cianclarke/sharepointer). 
Hopefully this makes integrating with SharePoint measurably less miserable an experience! 
