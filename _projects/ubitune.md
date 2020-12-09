---
title: Ubitune
order: 5
image: ./assets/images/ubitune_cover.png
layout: project_details
list-subtitle: Georgia Tech, August 2018 to Present
list-summary: A ubiquitous crowdsourced music player for publicly played music.
---

# Ubitune

You can get Ubitune on the Play Store _**[here](https://play.google.com/store/apps/details?id=com.ubituneapp)**_. It's on its way to the iOS store. I'll keep you posted as soon as it has arrived.

## What is it?

An app that ubiquitously crowdsources user music preferences in public spaces. Essentially, the app takes music that users enjoy from Spotify and creates a playlist that updates as people come and go from a specific space, all in the background in real time.

![ubitune-screens](./assets/images/ubitune_screens.png)

### Technology stack

The app runs on a Django backend with post-gis queries for location calculations. It also has a music aggregation backend service written on Node.js + MongoDb, and a front end written in React Native. It's quite the mixture of technologies to create an efficient solution based on microservices which communicate to each other through REST.

### Results

As a project for the Mobile and Ubiquitous computing class, we got an A in the class as the ambitious project exceeded expectations. The results of our user study were also conclusive in that the app did solve a problem which existed currently with how music is played in public places.

For creating a collaborative playlist among multiple people, the results are clear: Ubitune is much faster than it would be to with normal Spotify tools, such as their collaborative playlist.

![ubitune-research-study](./assets/images/ubitune_user_study.png)


### Future

We are continuing to work on this solution, beginning with building a user(people who listen to music) and client(people who play public music) community around it. We've seen some success entering it in startup competitions and the idea has turned out to be worth something.

We are planning to see how far it goes. Wish us best of luck!
