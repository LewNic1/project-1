# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Watchu Eatin

## Introduction

> ***Note:*** *Project 1 is a group programming project designed to show users(namely, WDI 51 students) restaurant options near the San Francisco General Assembly Campus. Our group members consist of Nicolette Lewis, Jonathan Jolivette, Bryant Pham, & Darnell Simon.*

In Project 1, we attempt to put together much of the work from the last several weeks. We will be using jQuery's `ajax()` function to make calls to a Yelp's API to retrieve the coordinates of restuarants. We will then use those coordinates to load pins onto a google map. 

![](https://media.giphy.com/media/iMBIti67aQVqvIXTrr/giphy.gif)

## Objectives

Developers must:
- Use AJAX to grab data from the Yelp's API
- Use a template literal to display data from an AJAX call on your HTML page
- Use the Google Maps API to embed a map
- Use the Longitude and Latitude data from Yelp's API to 

## Watchu Eatin

#### Starter code

There was no started code. We referenced passed lessons to piece together our idea.

#### Deliverable

Our goal is to:
- Connect our frontend with our backend
- Display a Google Map with a pin at the location of each of every recommendation a user posts.

Here's a screenshot of what the final product looks like:

![whatchueatin](https://cloud.githubusercontent.com/assets/4304660/25784846/9905f872-3339-11e7-92c5-30775b6bb8f4.png)

If your partner forked the repository originally, you should fork their repository **after you finish working together** so that you'll have your own copy of your work to edit in the future. Link your own repo to your personal website.


## Instructions

#### Part 1. Rendering Data
We took a moment to familiarize ourselves with the dataset by opening it in our browser: [https://api.yelp.com/v3/businesses/].

+ We asked ourselves, "What is the structure of the data?"
    + "How would you grab its title?"
        * "How would you grab its geological coordinates:"
            - *latitude*?
            - *longitude*?

#### Pain Point
- Yelp does not allow frontend pull of its API.


Write out the AJAX call that will grab the data and `console.log` the of restaurant's geological coordinates.

#### Part 2. Add the Description data to the page

**Add each *description* to the page**: Loop over your JSON response object, and each `description` to the page using jQuery. Aim to put each description inside the `<div id="info">` section of the page. For example:

```html
<div id="info">
  <p>M 4.2 - 1km ESE of Fontana, California / 123 hours ago </p>
  <p>M 3.1 - 6km SSW of Columbus, Ohio / 77 hours ago </p>
</div>
```

> **Pro-tip**: When in doubt, work in your Chrome Javascript Console! You can manipulate JSON, test your ideas, and even render elements to the page without ever touching your `app.js` file!

**Switch to Template Literals**: We encourage you to use template liteals (with the `` ` ``). At a certain point it's easier to work with a *template* than to build HTML strings by hand.

#### Part 3. Add Google Maps
- Your next goal is to integrate Google Maps:
    - Follow the tutorial at [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
        + Note that you would normally need to sign up for an API key, but we've provided one (See `index.html` line 18)
    - We centered our map on your GA's Campus:
        - General Assembly San Francisco: `{lat: 37.78, lng: -122.44}`

        > NOTE: The proper implementation will entail writing your code for Google Maps integration in `app.js` only.  There is no need to alter `index.html` as some resources may recommend.

#### Part 4. Add pins to your map
Once you got the map to show up, our next goal was to drop a single pin on a restuarant.
- Finally, can you replace the pin with the `watchueatin.png` icon?

