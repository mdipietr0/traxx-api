
# Traxx (discographic)
Traxx is a discographic music searching and album collection client application.
Users can search from a database containing over 10M records from over 5M
artists. It is a single page application (SPA) built with ReactJS that interfaces
with an ExpressJS backend API using axios.

## Screenshot
![Traxx](https://i.imgur.com/03Np4dA.png)

Link to the client repo:
https://github.com/mdipietr0/traxx-client

Link to the client app:
https://mdipietr0.github.io/traxx-client/#/

Link to the API repo:
https://github.com/mdipietr0/traxx-api

Link to the API endpoint:
https://protected-sands-90386.herokuapp.com

## Technologies Used:

### Client
- ReactJS (w/ JSX, React Router)
- JavaScript
- Axios (HTTP library)
- Discogs third-party API
- HTML/CSS
- Bootstrap 4
- Font Awesome (react-fontawesome package)
- Git

### API
- ExpressJS
- Node
- JavaScript
- nodemailer package
- git

## Planning and Development process:

Traxx provides a way to search for records and maintain collections as well as
wishlists. This project was driven by a desire to create a product that would
provide vinyl collectors with a simple and elegant experience. As such, the
planning for this application started with the UX/UI.

Users will spend the greatest amount of time with this app searching and then
viewing and interacting with the results so that is where we started. This will
be split between two views. On the landing page the user will have a single
search bar to search for results. The design for the results page will be a
simple grid displaying the cover art of each result in a simple but colorful
collage.

The resources necessary for this app are items belonging to 'Wishlist' and
'Collection'. Both of these resources will contain an id to the record in the
database which will be used to request the related record from the API. It was
decided that the benefits of using only one language for both the client and
server outweighed the other factors. An ExpressJS app was built on Node using
mongoDB to keep the resources.

## Wireframes
![Wireframe](https://i.imgur.com/Yrz7TdG.png)

## ERD
![ERD](https://i.imgur.com/XGiTXjm.png)

## User Stories:
  - A user will be able to register an account
    - Upon success the user will also be signed in
    - Upon failure the user will be shown an error message
  - A user will be able to log in to their account
    - Upon success the user will be shown the main menu screen
    - Upon failure the user will be shown an error message
  - A user will be able to log out out their account
    - Upon success the user will be signed out and returned to the landing page
    - Upon failure the user will be shown an error message
  - A user will be able to change their password
    - Upon success the user will be shown a success message
    - Upon failure the user will be shown an error message
  - A user will be able to search a database for records
  - A user will be able to view search results
  - A user will be able to add record to their wishlist
  - A user will be able to add record to their collection
  - A user will be able to view the records in their wishlist
  - A user will be able to view the records in their collection
  - A user will be able to delete a record from their wishlist
  - A user will be able to delete a reecord from their collection

## Version 2 (Currently developing):

## Installation Instructions:
API
1. Install dependencies with ``npm install``
2. From the root , run the following commands. They will set a SECRET_KEY for development and testing.
``echo SECRET_KEY_BASE_TEST=$(openssl rand -base64 66 | tr -d '\n') >> .env``
``echo SECRET_KEY_BASE_DEVELOPMENT=$(openssl rand -base64 66 | tr -d '\n') >> .env``

Client
1. Install dependencies with ``npm install``
