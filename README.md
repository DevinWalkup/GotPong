# GotPong
[Visit the site](http://www.gotpong.party)

## About GotPong
GotPong is a service that allows you to track you Beer Pong wins against your friends!

## Why was this made?
I made this because my friends, and I have long-running games of beer bong with each other.
We wanted an easy way to keep track of our wins without having to reset the game once we 
ran out of whiteboard space / paper.

It also will allow us to create new games whenever a new player comes, so we can have multiple
long-running games at once

## Any Future Plans?
Yes, actually. The current version is just the MVP. 

This is my first attempt at using Nuxt.js
and having the API and site in a single project. I'm sure there is a lot of optimizations and clean up
that can be done, so I will be revisiting the API logic and refactoring where I see fit. This was just
a quick and dirty implementation to get the site live as quickly as possible

Some items that I would like to add are:
- Game Play Type (Frat vs College)
- Page to visit Beer Pong rules
- Currently playing and next up (if multiple players in the game)
- Players per round (1v1, 2v2, etc.)
- Sockets so multiple people can view the game at once and see the updates live

## Who is this for
Anyone who wants to track the game wins for their Beer Pong games.
The idea was to make this site as simple and easy to use as possible.

There are no expectations for this to grow massively, but if it does then thats awesome!

## Technology
This was built using [Nuxt.js](https://nuxtjs.org) and [Prisma](https://www.prisma.io/).
I'm using [Heroku](https://heroku.com) for hosting and [Postgres](https://www.postgresql.org/)
for the database.
