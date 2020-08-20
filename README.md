

# gAIM

## Description

This app is a tracking tool for the latest and trendiest videogames by using pre-arranged filters. Track videogames you love, discover what to play next and use the marketplace where you can sell games you've already beaten or buy games you want to play.



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

- **Signup:** As an anon I can sign up in the platform so that I can start creating or joining team.

- **Login:** As a user I can login to the platform so that I can see my profile.

- **Logout:** As a user I can logout from the platform so no one else can use it.

- **Home**: As a usr I can browse through pre-filtered list of games and change some pre-arranged filters.

- **Search videogames:** As a user I can search videogames by name or filter the list by year, genre or platform.

- **Videogame details**: As a user I can look up the details of a videogame and save that videogame in my profile as "to play", "playing", "beaten" and "dropped".

- **Videogame review**: As a user I can add punctuated reviews to any videogame.

- **User profile**: As a user 

  - I can see edit or delete my profile;
  -  I can see the videogames that I saved as "to play", "playing", "beaten" and "dropped"; 
  - I can see my reviews; 
  - and my transactions (my posted offers; my requested videogames and my sold videogames, )

- **Marketplace**: As a user I can see videogames offers and:

  - **Add videogame offers**: As a (selling) user I can add offers of my videogames.
  - **Buy videogames**: As a user (buyer) I can buy videogames from the marketplace.

  ****

## Backlog

- VideogamesList: image with a "play" button to initiate video if it has one.
- Chat between seller and buyer in Marketplace
- Ecommerce to make payments through our website
- See offers via map
- Edit videogame offer
- State of videogame offer

# Client/Frontend

## React Router Routes (React App)

| Path               | Component      | Permissions             | Behavior                                                   |
| ------------------ | -------------- | ----------------------- | ---------------------------------------------------------- |
| `/`                | StartPage      | public `<Route>`        | Link to login and signup                                   |
| `/signup`          | SignupPage     | anon only `<AnonRoute>` | Signup form, link to login, navigate to /home after signup |
| `/login`           | LoginPage      | anon only `<AnonRoute>` | Login form, link to signup, navigate to /home after login  |
| `/home`            | HomePage       | user `<PrivateRoute>`   | Show a variety of filtered games                           |
| `/videogames`      | VideogamesList | user `<PrivateRoute>`   | Show all videogames in la list                             |
| `/videogames/:id`  | ShowVideogame  | user `<PrivateRoute>`   | Show details of a video game                               |
| `/myprofile`       | UserPage       | user `<PrivateRoute>`   | Show user's profile                                        |
| `/myprofile/edit`  | EditUserCard   | user `<PrivateRoute>`   | Edit user's profile                                        |
| `/marketplace`     | OffersList     | user `<PrivateRoute>`   | Show all videogame offers to buy                           |
| `/marketplace/add` | CreateOffer    | user `<PrivateRoute>`   | Add a new videogame offer                                  |



## Components

- StartPage

- SignupPage

- LoginPage

- HomePage

  - VideogameCarousel //**CONDICIONAL DE COMPORTAMIENTO SEGÚN DE DONDE SE RENDERICE**

- Navbar (home/search/marketplace/profile)

- SearchBar (filter by...) **//CONDICIONAL DE COMPORTAMIENTO SEGÚN DE DONDE SE RENDERICE**

- VideogamesList

- ShowVideogame

- UserPage

  - ProfileCard
  - MyGamesList
  - MyReviewsList
  - MyTransactionsList

- EditUserCard

- OfferList

  - ChoosePlatformMarketplace //**RENDERS PLATFORM CHILDREN WHEN PARENT PLATFORM IS SELECTED**
  - VideogameCardMarketplace

- CreateOffer

  - SearchBarCreateOffer

    

## Services

- 



# Server/Backend

## Models

User model

```
{
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    genre: {type: String, required: true},
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
    image: {type: String, required: true},
    title: {type: String, required: true},
    parentPlatforms: [{type: String, required: true}],
    childrenPlatform: {type: String, required: true},
    price: {type: String, required: true},
    status: {type: String, enum: ["selling", "sold"], default: "selling"},
    seller: {type: Schema.Types.ObjectId, ref: "User"},
    buyer: {type: Schema.Types.ObjectId, ref: "User"},
},
{
    timestamps: true,
}
```

Comments

```
{
    review: {type: String, required: true},
    date: {type: Date, required: true},
    rating: {type: String, required: true},
    users: {type: Schema.Types.ObjectId, ref: "User"},
    videogameId: String,
},
{
    timestamps: true,
}
```



## API Endpoints (backend routes)

| HTTP Method | URL              | Request Body                                                | Success status | Error Status | Description                                                  |
| ----------- | ---------------- | ----------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile`  | Saved session                                               | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`   | {name, email, password preferred genre}                     | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`    | {username, password}                                        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`   | (empty)                                                     | 204            | 400          | Logs out the user                                            |
|             |                  |                                                             |                |              |                                                              |
| GET         | `/api/profile`   | (empty) // {currentUserId}                                  | 200            | 400          | Shows profile                                                |
| PUT         | `/api/profile`   | {name, email, password, preferred genre}                    | 201            | 400          | Updates the current user in database                         |
| DELETE      | `/api/profile`   | (empty) // {currentUserId}                                  | 200            | 400          | Deletes the current user profile in database                 |
| POST        | `/api/offer`     | {image, title, platform, price, status, user}               | 204            | 400          | Creates a new offer                                          |
| DELETE      | `/api/offer/:id` | {id}                                                        | 200            | 400          | Deletes selected offer                                       |
| POST        | `/api/favorites` | {gameApiId, status}                                         | 204            | 400          | Adds or deletes a favorite game in profile                   |
| PUT         | `/api/favorites` | {gameApiId, status}                                         | 201            | 400          | Changes a favorite state of a game in profile                |
| POST        | `/api/review`    | {gameApiId, currentUserId, title, review, rating, userName} | 204            | 400          | Creates a review on a videogame                              |



## Links

### Trello

[Link url](https://trello.com/b/3dZ9hogu)

### Git

URls for the project repo and deploy [Link Repo Server](https://github.com/Noiretit/gAIM-server) [Link Repo Client](https://github.com/Noiretit/gAIM-client) [Link Deploy](https://skillsamp.herokuapp.com/)

### Slides

URls for the project presentation (slides) [Link Slides.com](https://github.com/chloeleteinturier/SkillsAmp-Client/blob/master)

