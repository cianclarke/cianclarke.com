---
title: "On Better Passwords"
date: 2015-08-11T17:07:33.854Z
showDate: true
draft: false
tags: ["blog"]
---

Password restrictions are a constant pain in the ass. Most startup hipsters get this one right, but for every cool new startup, there's 10 websites with some archaic password restriction.

## Word Based Passwords
The advent of password managers such as [OnePassword](https://agilebits.com/onepassword) have made it easier to have unique, compliant passwords for every site you visit, but password validation on these sites still sucks.  
Wouldn't it be nice if we could use unique, but memorable passphrases for the sites we use the most?  
  
XKCD nailed it:
![XKCD Comic](http://imgs.xkcd.com/comics/password_strength.png)

Unfortunately, most password validation focuses on the former case in this XKCD comic, and doesn't allow for word-based password schemes. 

## Validating for Both
Why not validate against both schemes - either the user provides a shorter, secure password, OR a word based password scheme with equal or greater entropy[1]?

### Secure Passwords RegEx
This regular expression is heavily based on [this Stack Overflow post](http://stackoverflow.com/questions/5142103/regex-for-password-strength).  
It ensures:

* One or more lowercase letter
* AND one or more uppercase letter
* AND one or more number
* AND one or more special character
Note OWASP's guidelines[2] recommend 3 of 4 of the above, however implementing this in a regular expression would be rather unwieldy.
This also validates a **length of between 8 and 128 characters**.  
    
    ^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$
        
You can [experiment with this regular expression in RegExr](http://regexr.com/3bhtb) to see it in action, and have each clause explained. 

### Word-based Passwords Regex
This regular expression allows for word-based passwords. 
It ensures:

* There are at least four "word groups"
* Word groups are either
  * camelCasedGroupsOfWords
  * hyphenated-groups-of-words
  * space separated grouped words
  * underscore\_separated\_groups\_of\_words
* The string itself must be between 19 and 128 characters
    
    ^(?=.{19,128})(([a-zA-Z]+)(-|_| |[A-Z])){3,10}[a-zA-Z]+$
    
You can [experiment with this regular expression in RegExr](http://regexr.com/3bht8) to see it in action, and have each clause explained.

### Combining the two
We could, of course, combine the two in big capturing groups separated with OR - but this does get very unwieldy: 
    
    ^((?=.{19,128})(([a-zA-Z]+)(-|_| |[A-Z])){3,10}[a-zA-Z]+)|(^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$)$
    
..this is why people hate regular expressions. 
Instead, I suggest combining them in code - JavaScript example: 
    
    function(pass){
      var strongRx = /^(?=.*[A-Z])(?=.*[!@#$MARKDOWN*%%^()])(?=.*[0-9])(?=.*[a-z]).{8,15}$/,
      wordRx = /^(?=.{19,35})(([a-zA-Z]+)(-|_|[A-Z])){3,10}[a-zA-Z]+$/;
      return strongRx.test(pass) || wordRx.test(pass);
    }
    
It should be that easy..  

Of course, I might be missing some glaring security case, or perhaps my regular expression for strict passwords is just as frustrating. Feedback welcome!



# Further Reading
[1] (http://csrc.nist.gov/publications/nistpubs/800-63/SP800-63V1_0_2.pdf)[http://csrc.nist.gov/publications/nistpubs/800-63/SP800-63V1_0_2.pdf]  
Appendix A provides a description of calculating password entropy.   
[2] [https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls](https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls)  
OWASP guidelines on password strength

_Special thanks to [Bruno Oliveira](https://twitter.com/abstractj) for reviewing this post_
