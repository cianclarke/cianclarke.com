---
title: "On QR Codes."
date: 2014-04-04T22:55:35.000Z
showDate: true
draft: false
tags: ["blog"]
---



##  <span class="Apple-style-span" style="font-size: 16px; line-height: 24px;">[![](http://res.cloudinary.com/cianclarke/image/upload/v1382804328/Screen-Shot-2011-11-10-at-21_17_47_isix1g.png "Screen Shot 2011-11-10 at 21.17.47")](http://res.cloudinary.com/cianclarke/image/upload/v1382804328/Screen-Shot-2011-11-10-at-21_17_47_isix1g.png)QR codes are a barcode-like representation of a string of text – they came from the manufacturing industry as a useful means of tracking materials through a factory floor[1]. </span>

Regular bar codes contain a certain beauty in their irregular pinstripe. Their retro street-cred comes from the barcode playing an important part in the history of computing, and there’s a degree of artform in the juxtaposition of those vertical bars.

QR codes look like robot vomit. They’re an ugly legacy from the manufacturing industry, and whilst certainly they perform a utilitarian function in industry, they have no role in the consumer market.

QR codes present a woeful user experience. Glancing at a QR code gives absolutely no hint or context as to what action it’s about to perform. Will it open a respectable newspaper article, or some lewd pornographic meme? Is it about to email the editor, or a cleverly crafted phishing alias?

While I understand their ability to store a huge capacity may have some appeal (4,296 characters, I’m told [2]), the typical use case is to trigger a URL action, storing a relatively short (< 100 characters) string.

The true downfall of QR codes, however, is the on-device support. Almost 5 years since the launch of the first iPhone there is still no mobile OS that ships with QR code integration.

<span class="Apple-style-span" style="color: #000000; font-size: 22px; line-height: 32px;">The alternative</span>

Whilst I understand that entrusting your URL in the country of Libya is a bit of a puzzling choice, URL shortening services can also bring huge benefits. When bit.ly is still within capacity with 6-character mixed case GUIDs, I think it’s safe to say that the capacity of such a short identifier should suffice.

Optical character recognition has come a long way, and once we agree on a regular font (might I suggest Courier?), I think it’s safe to assume that a camera is capable of decoding six characters accurately. If not, typing six characters into the browser is hardly the end of the world?

Any reliable cloud based URL shortener can also cache the end-resource, making in effect a perma-link. This can be combined with a content filter to prevent the end result of a smart URL from linking to anything inappropriate or malicious.

 

What’s wrong with plaintext? We’ve seen six characters is more than enough. It’s time to admit defeat, and return the QR code to the environment it belongs.

[1]: http://socialmediatoday.com/tungstenbranding/358212/how-reach-your-mobile-customer-using-qr-codes  
 [2]: http://www.denso-wave.com/qrcode/aboutqr-e.html



