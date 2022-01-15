---
title: "On This Blog: It's Back"
date: 2022-01-14T21:47:44.014Z
showDate: true
draft: false
tags: ["blog"]
---

In 2015, I ported this blog from Wordpress to an experimental new Node.js open source project known as Ghost. It was intended as a Wordpress replacement, and I found a neat way to embed this into the server-side rendering Express app which hosted my site - which was the style at the time.  

#### So what happened?  
Fast forward to 2017, and software moves on - fast. After a brief blooging hiatus, I discover I can no longer install the dependencies for the now-deprecated version of Ghost I'm running. Every few years, I'd re-visit the issue, try bumping a few things, and after an hour or so give up.   

Now to present day. Almost 6 years have passed. None of the cool kids do serverside rendering. Express apps aren't the latest and greatest, and everybody now runs static sites. So - after some clever jigery pokery, I managed to script a migration tool, to take Ghost 1.x blog posts from the database, and output static markdown files which can be dropped into a Hugo-based website.   
  
#### How it works
Ghost stored blog posts in a SQLite database - so it relies on running a query against this database, and iterating over the rows which are output. Each row is then written to a markdown file, with a best-effort attempt made to maintain as much metadata as possible.  
Here's the script, should it prove useful - 
```
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
// NB: Point this to the location of your `ghost-prod.db`
var db = new sqlite3.Database('content/data/ghost-prod.db');
const blogTemplate = fs.readFileSync('./blogTemplate.md');
db.each('SELECT "_rowid_",* FROM "main"."posts" ORDER BY "created_at" ASC LIMIT 0, 49999;', function(n, post){
  let blog = blogTemplate.toString();
  blog = blog.replace('$TITLE', post.title.replace(/"/g, '\\"')); // The formatting in Hugo needs quotations in titles escaped
  blog = blog.replace('$DRAFT', post.status === 'draft');
  post.markdown = post.markdown.replace(/^(#+)(.+)$/gm, "$1 $2"); // Ghost had some fairly forgiving markdown. I found that I needed to replace all `#Headings` to be `# Headings` (note the space)
  blog = blog.replace('$MARKDOWN', post.markdown);
  blog = blog.replace('$DATE', new Date(post.created_at).toISOString());  
  fs.writeFileSync(`posts/${post.slug}.md`, blog) // make this directory
})
```
  
And the associated blogTemplate.md file:  
```
---
title: "$TITLE"
date: $DATE
showDate: true
draft: $DRAFT
---

$MARKDOWN

```

Hopefully, this proves useful to someone. 
