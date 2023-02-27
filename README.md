à ajouter :
bouton de déconnexion + système de watch more qui doit handle les seasons
JE ne dois pas réafficher le qrcode si c pas la premi_ère fois qu'il utilise le 2FA PSQ SINn n'importequi pourrait se co enft

# Anime Tracker

This project is a full-stack web application developed with Express for the back-end and React for the front-end. The application includes a user authentication system and displays anime data retrieved from a MongoDB database hosted on MongoDB Atlas. The back-end API utilizes Mongoose to interact with the database and allows the front-end to make API calls to fetch data.

## backend

In this project, there are three main folders named anime, auth, and users. The folders "anime" and "users" represent a collection in the MongoDB database and contain the three main components of the Model-Controller-Service (MCS) design pattern, which helps to organize the code.

The Model component defines the structure of the data that is stored in the database. The Controller component contains the API endpoints that allow the client to interact with the data. The Service component contains the business logic that is used by the controllers to perform specific tasks.

The "auth" folder contains two files, "localstrategy.js" and "jwtStrategy.js", which implement the Passport.js library to handle user authentication. The "localstrategy.js" file defines a local authentication strategy using Passport.js that checks if a user's credentials are valid, while the "jwtStrategy.js" file defines a JSON Web Token (JWT) authentication strategy that allows users to authenticate using tokens.

These authentication strategies have been implemented to protect certain routes of the application. The first strategy is the "local" strategy which is used to authenticate a user locally (i.e., with a username and password). It is used to protect the "/login" endpoint. When a user tries to access this endpoint, the authentication middleware checks if the user is authenticated using the "local" strategy. If the user is not authenticated, they are redirected to the login page.

The second strategy is the "jwt" strategy which is used to authenticate a user using a JSON Web Token (JWT). If the user try to access to a protected root and is not authenticated, they are denied access to the endpoint.

## 2FA and other ways to connect

In my project, I am working on implementing multiple ways for users to access the application. One of the methods I have implemented involves using 2-factor authentication with Google Authenticator. When a user activates this feature for the first time, they must scan a QR code with the Google Authenticator app and then enter the 6-digit code it generates.

## frontend

In the front-end, the project is based on a React application consisting of several components such as a login component. Once the user enters the application, the main page is made up of multiple components including a header and an AnimeFrame component. The AnimeFrame component organizes a frame for each anime with the location of all buttons and text. The anime list is mapped to apply this rendering to all animes in the list (that are retrieved from the DB).

## 2FA

In my project, I am working on implementing multiple ways for users to access the application. One of the methods I have implemented involves using 2-factor authentication with Google Authenticator. When a user activates this feature for the first time, they must scan a QR code with the Google Authenticator app and then enter the 6-digit code it generates.

## MongoDB Atlas

MongoDB Atlas is a fully-managed cloud service for MongoDB, provided by MongoDB Inc. It allows you to easily deploy, manage, and scale MongoDB databases in the cloud. With MongoDB Atlas, you can:

- Deploy MongoDB clusters on various cloud providers such as AWS, Azure, and GCP.
- Scale your clusters up or down with a few clicks, and pay only for the resources you use.
- Automatically back up your data and restore it in case of an accident.
- Monitor your clusters with built-in performance and security analytics.
- Secure your data with built-in encryption and role-based access control.
- Use MongoDB's powerful query language, indexing, and aggregation to work with your data.

MongoDB Atlas provides a web-based user interface, a command-line tool, and a REST API to interact with your clusters and manage your databases.
