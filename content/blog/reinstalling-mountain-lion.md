---
title: "On Reinstalling Mountain Lion"
date: 2012-12-02T16:05:30.000Z
showDate: true
draft: false
tags: ["blog"]
---


[![](http://res.cloudinary.com/cianclarke/image/upload/h_187,w_300/v1382804161/MLion_vnrbts.png "Mountain Lion")](http://res.cloudinary.com/cianclarke/image/upload/v1382804161/MLion_vnrbts.png)I recently re-installed Mountain Lion from scratch, to try and return some of that ‘new computer’ feel. Since I write code for a living, and only own one computer, reinstalling needs to be seamless – I can’t afford to be unproductive, tweaking for weeks afterward.

With the aid of a network attached Apple Time Capsule (one of the most important pieces of kit I own!), I was back up and running in under a day.This blog post should help anybody who feels like doing similar, but is also something I can look back on if I find myself needing to do the same again!

Here’s the rough steps taken:


##  1) The Final Backup

Back up one last time to time capsule. Verify nothing critical is being excluded by checking the exluded folders list from your Time Machine settings. As an example – I excluded my SteamApps folder, as the game content files can be downloaded almost as quick as a copy across the network!  
 Also, install any system upgrades available to you. I had a nerve wracking thought that I’d locked myself out of my iTunes library when my new OS had iTunes 11 – turns out it was fine, but just incase.


##  2) Wipe & Install

Restart your machine, holding CMD + R. This opens the recovery console. From here, open the disk utility and re-format your Mountain Lion partition. Then, re-install Mountain Lion. This is well documented on [Apple’s support KB.](http://support.apple.com/kb/PH11273)  
*Protip: Make sure your time capsule backup is complete. Ensure your Time Capsule is not dropped, burnt, burgled, or even touched for the next 24 hours – it’s likely the only copy of your digital life.  *


##  3) Enjoy virgin OS bliss.

A new start! Setup any of the system preferences you can’t live without. For me, this was:

- Right-click in bottom right corner enabled for trackpad and mouse
- Accessability options – screen zoom with mouse scroll, CMD key as modifier
- Mouse and trackpad pointer speed set to fast
- Keyboard key repeat and delay set to max


##  4) Let the copying commence.

###  Preferences

Copy your application support files from your time capsule to your local library. This means connecting to your time capsule, and finding the latest backup directory (usually aliased as ‘latest’). This will be something like:

/Volumes/Time Machine Backups/Backups.backupdb/MacBook Pro/2012-12-01-140530/Macintosh HD/Users/yourusername/Library/Application Support

From here, we’ll copy to:

~/Library/Application Support

Above, ~ refers to your home directory (/Users/yourusername/). You’ll see references to ‘From the time capsule’ throughout – here, we mean the first path above. In future, I’ll be calling it $TIME, and sometimes I’ll use the ~ character – which won’t really work on the time capsule. When you see $TIME/~, we mean $TIME/Users/yourusername

EXPORT $TIME = /Volumes/Time Machine Backups/Backups.backupdb/MacBook Pro/2012-12-01-140530/

Some apps also use the Preferences folder, which means, similar to above, copying from $TIME/~/Library/Preferences to my local ~/Library/Preferences

I cherry picked those config files I needed, as I didn’t want any bloat. This meant copying:

*Protip: The library directory will be hidden on both your time capsule and your home directory. Either [enable hidden folders in finder](http://www.mikesel.info/show-hidden-files-mac-os-x-10-7-lion/), or use Terminal to open the directory with a command like*

open ~/Library

###  Media

There’s your system prefs copied – next up is the rest of your home folder. For me, again I picked what I really needed, basically the core home folders that come with a mac:

- Desktop
- Documents
- Downloads
- Movies
- Music
- Pictures

Everything else was in Dropbox. This will probably take 12-24 hours to do if you’ve a lot of media.

###  Keychain

The OSX keychain makes copying my stored usernames and passwords, along with my developer signing resources and certificates, really simple. All I had to do was copy everything from $TIME/~/Library/Keychains to my new install’s ~/Library/Keychains, replacing the login keychain.

###  Bash Profile

If you use your command line a lot like me, you’ll need the contents of your bash profile – for me, this was a case of copying $TIME/~/.bash_profile to ~/.bash_profile  
 Yours might be called .profile.

###  Hosts File

Since I connect to a lot of VPN’d endpoints in work, I have a lot of host file entries to provide nicer alises to these. I had to do this one through the command line – I CD’d into the directory on my Time Capsule and copied.

cd $TIME/etc sudo cp hosts /etc/hosts


##  5) Reinstall Applications

Now that the copy operations are underway, it’s time to reinstall your apps. For me, these came from three sources.  
 The first source of apps, open the Mac App Store and open the Purchases tab. For me, this allowed me to reinstall:

- XCode
- 1Password
- BetterSnapTool (window management util)
- Twitter

<div>Next up is apps with web installers. Before doing this, I had to disable the ‘Only install signed apps’ option in the ‘Security’ panel of preferences. Here’s what I needed:

- Git
- Node.js & NPM
- Google Chrome
- Google Chrome Canary
- Dropbox
- Skype
- VLC
- MongoDB

<div><span style="font-size: medium;"><span style="line-height: 24px;">Ideally, this would also allow you to install iLife – not for me, so more on this later. </span></span></div>- - - - - -

Lastly, there was a list of applications which I’d have to find my serial keys for, require funny licensing config, and would have generally taken too long to get set up with.

For me, this was:

- Webstorm IDE
- Kaleidascope Diff Tool
- Photoshop

<div><span style="font-size: medium;"><span style="line-height: 24px;">In these cases, I copied the respective entries from $TIME/Applications to /Applications. I also needed to copy their files in the Application Support directories in both $TIME/~/Library/Application Support and also $TIME/Library/Application Support (the root level Library, not the one associated with my user account), to the local equivalents (~/Library/Application Support and /Library/Application Support). </span></span></div>Webstorm also needed some files from ~/Library/Preferences also.


##  6) Reinstall iLife components

If you have a very recent mac, your copy of iLife components are likely associated with your Mac App Store account. If, like me, these don’t show up in the previous step, and you’ve left your OS discs in the office, here’s what you need to do.

- First, copy the iLife components themselves from /Applications on the Time Capsule to your local directory.
- Then, copy all required preferences files from BOTH  
 /Library/Application Support  
 AND  
 ~/Library/Application Support.  
 This included anything with an **iLife** prefix, **iMovie, Garageband, iDVD** and the **‘Apple**‘ folder.
- Copy /Library/Frameworks/iLife*  
 That is, copy everything from /Library/Frameworks with an iLife support
- Make sure your iPhoto library has been copied across – this should have been part of  your copy of media above, if your iPhoto library is located within the ‘Pictures’ folder like mine is.

That’s it – you should now have a working iPhoto (and hopefully iLife) install.


##  7) Repair Disk Permissions

On a fresh install? Really? Yep – after all that copying, chances are a lot of the system config and preferences folders haven’t the right CHMOD permissions or CHOWNership. Nothing a quick “Repair disk permissions” won’t fix!

Disk Utility -> Select your OS disk -> Repair Disk Permissions


##   Done!

That was it for me. I managed all this over the course of <24 hours. Of course, this would all be much quicker with a ‘Repair install’ over the existing OS, or a restore from Time Machine after installing – but I don’t think either would remove the bloat I’d been experiencing, so it’d have defeated the purpose. I’m now back to a ‘MVO’ – Minimal Viable OS!

</div>

