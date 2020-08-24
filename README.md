# Project Name
Fashion Quest

## Languages Used
CSS
React
React-Router
Axios
Redux
Redux Sagas
Postgres SQL

## Description
This web app displays serveral movies with their title and descriptions.
The user can click on a poster and they will be brought to a page that diplays data about the film.
There is an option of clicking an Edit button that allows the user to change the Title and/or the Description.

## I Learned
How to combine almost everything I've learned at Prime! Very challenging assignment.
This one had no clear path for building it. It was up to us to be creative and go our own way.

The most challenging part was deciding how I was to retrieve data, imagining the app had 100,000 movies.
One option would to hit the server on every Poster click and get that movies data.
But that would be a lot of server traffic.

I ended up hitting the server once at the beginning and pulling all the data there into Redux.
The con there is looping over a lot of data.
There was no perfect solution so I opted for the client to handle the heavy stuff.
