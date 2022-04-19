# Playlish

A podcast directory is a web application where users can search and discover podcast shows. Users can easily find podcast episodes and information.

## Purpose

This project was completed as part of a group learning exercise, experimenting with Vue 3 and some css animations.

## Demo

[https://playlish-vue.netlify.app](https://playlish-vue.netlify.app)

## Main Features

### Backend API - AWS Lambda
Data comes from [https://podcastindex.org/](https://podcastindex.org/), through an AWS Lambda wrapper, written in Python, for every needed API route.
The lambda code is nearly the same as the advised example from podcast index docs (https://github.com/tbowers/python-podcastindex-org-lambda).

For this project, the custom API endpoints are:
- Get Trending shows returns the podcasts that are trending.
- Get Podcast show by ID, returns everything we know about the show.
- Get Podcast's episodes by podcast ID, returns all the episodes for this feed. Episodes are in reverse chronological order.
- Search Podcasts returns all the shows that match the search terms in the title, author or owner.

### Discover trending and details
- On the main page, the user is presented with the current trending podcasts.
- User can click on a show image or title and be redirected to the show details page.
- On the details page, the user can see some detailed info about the show and a list of the last episodes.
- User can click on the "External link" button or the title of each episode and be redirected to the podcast hosting site where they can view and listen to the podcast episodes.

![Main page - Discover](https://raw.githubusercontent.com/ionchi/playlish/main/public/demo/discover.png)

![Details](https://raw.githubusercontent.com/ionchi/playlish/main/public/demo/details.png)

### Search
- User can click on the search button positioned in the site header.
- An overlay will transition, with an input field.
- User can type a search string and wait for the most relevant results.
- User can click on the result and be redirected to the details page.

![Search](https://raw.githubusercontent.com/ionchi/playlish/main/public/demo/search.png)

### Add to favourites
- On the show's details page, there is a button with a heart icon.
- User can click and add the show to a favourites list.
- User can navigate to the favourites page from the navbar.
- User can see all their favourites shows.
- User can remove a favourite show from the details page, by clicking again on the heart button.

N.B. Favourites are added only in local storage, in the current user's browser as there isn't a sign-in feature.

![Favourites](https://raw.githubusercontent.com/ionchi/playlish/main/public/demo/favourites.png)

## Frontend dependencies

- Vue 3
- Typescript
- Tailwindcss
- GASP animations
