

# gAIM

## Description

This app is a tracking tool for the latest and trendiest videogames by using pre-arranged filters. Track videogames you love, discover what to play next and use the marketplace where you can sell games you've already beaten or buy games you want to play.



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

- **Signup:** As an anon I can sign up in the platform so that I can start creating or joining team.

- **Login:** As a user I can login to the platform so that I can see my profile.

- **Logout:** As a user I can logout from the platform so no one else can use it.

- **Home**: As a user I can browse through pre-filtered list of games and change them pre-arranged filters.

- **Search videogames:** As a user I can search videogames by name, filter the list by year, genre or platform and save them as favorites. I can also see some information as genre and general platforms.

- **Videogame details**: As a user I can look up the details of a videogame such as playtime hours, rating, screenshots, description, specific platforms, genres, developers, released date and online stores. I also have access to sell this videogame in the marketplace in case I have it.

- **Videogame review**: As a user I can add reviews to any videogame and see other user's reviews on any videogame.

- **User profile**: As a user 

  - I can see edit my profile;
  -  I can see the videogames that I saved as favorites; 
  - I can see all my reviews; 
  - and my marketplace transactions.

- **Marketplace**: As a user I can see videogames offers and:

  - **Videogame offers**: As a (selling) user I can add offers of my videogames and delete them.
  - **Buy videogames**: As a user (buyer) I can buy videogames from the marketplace.

  ****

## Backlog

- VideogamesList: image with a "play" button to initiate video if it has one.
- Chat between seller and buyer in Marketplace
- Ecommerce to make payments through our website
- See offers via map
- Edit videogame offer
- State of videogame offer
- Different states of favorite videogames: "to play", "playing", "beaten" & "dropped"

# Client/Frontend

## React Router Routes (React App)

| Path                   | Component       | Permissions             | Behavior                                                   |
| ---------------------- | --------------- | ----------------------- | ---------------------------------------------------------- |
| `/`                    | StartPage       | public `<Route>`        | Link to login and signup                                   |
| `/signup`              | SignupPage      | anon only `<AnonRoute>` | Signup form, link to login, navigate to /home after signup |
| `/login`               | LoginPage       | anon only `<AnonRoute>` | Login form, link to signup, navigate to /home after login  |
| `/home`                | HomePage        | user `<PrivateRoute>`   | Show a variety of pre-arranged filtered games              |
| `/videogames`          | SearchPage      | user `<PrivateRoute>`   | Show all videogames in a list which can be filtered        |
| `/videogames/:id`      | ShowVideogame   | user `<PrivateRoute>`   | Show details of a video game                               |
| `/myprofile`           | UserPage        | user `<PrivateRoute>`   | Show user's profile                                        |
| `/myprofile/edit`      | EditUserPage    | user `<PrivateRoute>`   | Edit user's profile                                        |
| `/marketplace`         | MarketPlacePage | user `<PrivateRoute>`   | Show all videogame offers to buy                           |
| `/marketplace/add`     | AddGamePage     | user `<PrivateRoute>`   | Select a videogame to sell                                 |
| `/marketplace/add/:id` | SellThisGame    | user `<PrivateRoute>`   | Form to select a price and specific platform for the offer |



## Pages & Components

- **Pages**
  - StartPage
  - SignupPage
  - LoginPage
  - HomePage
  - SearchPage
  - ShowVideogame
  - UserPage
  - EditUserPage
  - MarketplacePage
  - SellThisGamePage
  - AddGamePage
- **Components**
  - AddGame
  - MyFavoriteGames
  - MyReviews
  - MyTransactions
  - Navbar
  - Rating
  - SearchBar

## Services

- auth-service
- user-service



# Server/Backend

## Models

User model

```
{
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    genre: {type: String, required: true},
    gender: {type: String},
    favoriteVideogames: [{type: String, enum: ["to play", "playing", "beaten", "dropped"], default: "to play"},]
    transactions: [{type: Schema.Types.ObjectId, ref: "GamesToSell"}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comments"}],
},
{
    timestamps: true,
}
```

Games to sell

```
{
    videoGameId: {type: String},
    videoGameName: {type: String},
    videoGamePic: [{type: String}],
    price: {type: String},
    status: {type: String, enum: ["selling", "booked", "sold"], default: "selling"},
    childrenPlatform: {type: String},
    user: {type: Schema.Types.ObjectId, ref: "User"},
},
{
    timestamps: true,
}
```

Comments

```
{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    review: {type: Date, required: true},
    videogameId: {type: String},
    videogameName: {type: String},
    rating: {type: String},
},
{
    timestamps: true,
}
```



## API Endpoints (backend routes)

| HTTP Method | URL                       | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | ------------------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile`           | Saved session                                                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`            | {name, email, password preferred genre}                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`             | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`            | (empty)                                                      | 204            | 400          | Logs out the user                                            |
| GET         | `/api/myprofile`          | (empty)                                                      | 200            | 400          | Shows profile                                                |
| PUT         | `/api/myprofile/edit`     | {username, email, genre, gender}                             | 200            | 400          | Updates the current user in database                         |
| POST        | `/api/myprofile/favorite` | {favoriteVideogames, userID}                                 | 200            | 400          | Adds a favorite videogame to user DB                         |
| POST        | `/api/review`             | {review, videogameId, videogameName, user}                   | 200            | 500          | Creates a review on a videogame                              |
| GET         | `/api/review`             | {empty}                                                      | 200            | 500          | Shows all reviews of a videogame                             |
| POST        | `/api/review/delete`      | {idOfReview}                                                 | 200            | 500          | Deletes the chosen review                                    |
| POST        | `/api/marketplace/status` | {id, status}                                                 | 200            | 500          | Changes offer status                                         |
| POST        | `/api/offer`              | {price, childrenPlatform, videoGameId, videoGameName, videoGamePic, user} | 200            | 500          | Creates an offer                                             |
| GET         | `/api/offer`              | {empty}                                                      | 200            | 500          | Shows all offers                                             |
| POST        | `/api/offer/delete`       | {idOfTransaction}                                            | 200            | 500          | Deletes an offer                                             |



## Links

### Trello

[Link url](https://trello.com/b/3dZ9hogu)

### Git

URls for the project repo and deploy: [link Repo Server,](https://github.com/Noiretit/gAIM-server) [link Repo Client,](https://github.com/Noiretit/gAIM-client) [link Deploy](https://gaim-m3.herokuapp.com)

### Slides

URls for the project presentation: [Google Presentation](https://docs.google.com/presentation/d/18ZlNMPJzwyPUxtTunzU8tghURCakjAQym50o_gAZXHY/edit?usp=sharing)

