# Chickfling
Creating a dating site using React, Node JS and MySQL

## Intro

Objective of this project is to create a complete dating website that allows users to search, discover profiles according to their preferences and geolocation, show them some love with real-time likes, notifications and chat if both profiles match.

### Stack

* Node JS (Express)
* React JS
* Materialize CSS and Material UI Front libraries
* Redux JS
* MySQL
* JSON web tokens
* Axios for API requests
* Websockets (socket.io) for real-time
* Google Maps/Geolocator APIs for geolocation

### Features

My ChickFling project handles:
* DB creation script
* User creation and authentication using token
* Pictures upload and default profile picture
* Complete user profile page with gender, bio, location, interests details...
* User profile edition (password, details, preferences)
* Profiles discovery based on matching algorithm and user preferences
* Popularity score calculated for each user based on interactions with other profiles
* Profiles search with filters (gender, interests, age and location ranges...) with immediate update
* Real-time notifications for likes, profile views and matches
* Real-time chat if two profiles match
* User ability to block or report another profile
* Email notifications for authentication and password reset (with auth key)
* Change and reset of email/forgot password with ID validation
* Profile, pictures deletion and user DB cleanup
* Responsive design from mobile to desktop/tablet
* User input and upload checks (front/backend)
* Password hashing (Whirlpool)
* HTML/Javascript/SQL injections prevention

Discover more details below.

## User account

### User creation and authentication

User input has been secured on front and back end with immediate feedback for front end input validation. Also password security has been taken seriously with multiple layers of complexity validated on the go, including:
* A lowercase letter
* A uppercase letter
* A number
* A minimum of 8 characters

Password will be hashed (sha512) with a salt for 5 iterations first before being saved in the DB.

Before saving user, several checks will also be runned in the background, including:
* Verifying if user already exists
* Verifying if email is already used
* Verifying (as said earlier) if input is in the right format required

Once user is created, he will be receive an email to verify his account, while account isn't validated, he wont be able to access the app (a message will be displayed to inform him).

### Forgot and change of password

If user has forgotten his password, he will be able to retrieve using his email, a password reset link will be sent to his email address entered.

The reset of password link will have a unique ID, which will be the latest link sent, others will be made deprecated. This provides security to prevent intruders from resetting someone else password.

### User profile

User profiles are accessible via the `/user/username` url, so this means that each user has his own profile link and can share it. Also if user is on his own profile, he will be able to edit it, while if he is on someone else profile, he will be able to block or report that user.


#### Complete profile

If user hasn't completed his profile, he will be invited to do so in order to access profiles discovery and be able to find the one.

#### Information edition

As said above, he will be invited to complete his profile from the discovery view, but he can also edit his profile at any time to change information such as:
* Gender
* Sexual Orientation
* Details like Firstname, Lastname, Bio and Birthdate
* City (list or geolocation)
* Interests tags

#### Pictures upload

User is able to upload up to 5 pictures, he needs at least one to be able to match with someone. The upload is protected against wrong input checking the picture object size and format as well as file size to avoid having wrong images.

##### Profile picture

User will necessarily have a profile picture when uploading pictures, the first picture uploaded will become the default profile one. He will also be able to edit it by clicking on the make default profile picture button above the picture he wants to.

##### Picture delete

User is able to delete a picture, if he deletes the picture set as default profile picture, it will make the closest picture the default profile one.

### User acccount settings

#### Preferences

User is able to set his default discovery settings so that the matching algorithm will improve the accuracy of the profiles suggested.

#### Edit email and password

User is able to modify his email and password from the account settings modal, password will be hashed.

#### Delete account

User is able to delete his account as well, this will remove him from database and other users no longer will be available to match with him/her.

### Profiles management

User is able to see the profiles he visited, liked and blocked in order to easily retrieve them.

## Profiles discovery

### Display list

Once the user has completed his profile, he will have access to the profiles discovery feature and be able to filter these results.

Each profile suggested will have a user card summarizing the personnality of the profile. User can click on the "3 dots" button to get more information such as the bio and full list of interest tags or go on the profile to see the "big picture".

Also the user is able to like a profile directly from the card, and the button will change of appearance.

### Matching algorithm

In order to help users find love, Matcha offers a matching algorithm, that's what our discovery feature is based on.

The matching algorithm works by pondering user preferences and user information to retrieve other profiles that are interested in the same things, that are close to the user and that have a common orientation. Basically, we created a compatibility rating to suggested profiles based on different criteria ordered by importance:
* Sexual orientation
* Location
* Interests in common
* Popularity score

This allows us to return a list of profiles that user might be interested in, ordered by level of compatibility.

## Profiles search

Just like the profiles discovery feature, the search will return a list of user and give user the ability to do a global search over the profiles registered on ChickFling app. The search page is very similar to what can be found on the profiles discovery one but he has access to the full list of profiles.

## User interactions

### Popularity score

Every time user enters in interaction with someone else, this will affect his popularity score. We base it off several actions that have a positive impact like:
* User profile is visited by someone else
* User is liked by someone else

Some actions have a negative impact, for example:
* User is disliked by someone else
* User is reported by someone else

### Actions

#### Real-time notifications

Because users interact with each other, they need to be informed that someone else acted on him, so when someone views your profile, likes it or send you a message (if you previously matched), you will be informed directly with a badge count (depending on how many you received) on top of your menu. We used Websockets (socket.io) to make them real-time, also user won't have to refresh page to see new notifications, they will be automatically added.

If user sees a notification, it will be cleared in the menu as well so that users are always up-to-date.

#### Like/Dislike and Match

User can like other profiles to show him/her some interest, if both users like each other, it will create a match!

User can also dislike someone if the love is gone.

#### Real-time Chat

Once user match, they can talk to each other through a dedicated chat where they can retrieve all their matches and conversations.

Messages are sent in real-time using websockets (socket.io) so that users receive messages once they are sent which simplifies conversations.

#### Report and block profiles

Last but not least, user can block and report other profiles. If a user is reported, he will be added to a list of reported users in the DB. A user can report someone else only one time to avoid report spamming.

Also a user can block/unblock another profile, if a profile has been blocked by a user, this profile won't be able to interact anymore with the user blocking him.

## Responsive design

The platform has been completely designed with Responsive Design in mind with multiple breakpoints to accommodate most common screen sizes (from iPhone 6 range to desktop/tablet resolutions):
* From 360px to 1000px

## Configuration and additionnal security

### Database

Database is running on MySQL and we use PHPMyAdmin Web Interface to manage it. To get a set of users, we used RandomUsers API to generate a seed of around 800 users.

### Security

We added manually (no frameworks or ODM/ORM) checks in the front end and back end to protect the application from multiple attacks.

Application is protected against:
* HTML/Javascript injections -> using input checks and transforming input into strings
* Malware upload -> using upload checks
* Password breaches -> using sha512 and salt hashing
* Cross-site request forgery -> using unique IDs with expiration (password reset, email validation)
* Cross-site resource sharing -> using authentication validation and tokens (logged out users limited)

## Run project

### Environment setup

To run this project, you will need a MySQL database and Node JS server already pre-configured. You can use Bitnami Mamp (MacOS) or Wamp (Windows) for the MySQL database.

The configuration is the following:
* MySQL Database -> Port `3390`
* Node JS server -> Port `8080`
* React app -> Port `3000`

For the web server, we will use an existing Node (Express) JS server, I will explain later how to start it but make sure to have Node and Express installed to run it.

### Create DB

To create the database with already existing users, you can just run the script I have created.

To do so:
* You run it from your shell using command -> `sh back/config/deploy.sh` at root of the project

### Install packages/dependencies

To run the project, you will also need to install some required packages and dependencies, in order to do so:
* Install backend packages/dependencies using command -> `npm i` inside the `back` folder
* Install frontend packages/dependencies using command -> `npm i` inside the `front` folder

### website

access the website using the following URL: www.chickfling.com

Enjoy matches!
[<p align=center>Go up<p>](#42_www_ChickFling)
