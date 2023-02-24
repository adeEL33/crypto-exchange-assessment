Getting Started
This repository aims to assist you in begsetting up the application with a solid file structure as a foundation. To get started clone this repository.

Since this project will hold both the client application and the server application so the  node modules and package.json are seprately available in both places.For installing nodemodule in backend open a terminal in backend  After this you will run npm instal and to install nodemodule in frontend open a terminal in frontend directory  and run npm install.




File structure
fronend - Holds the client application
public - This folder holds assets such as images, docs, and fonts
src / components - This folder holds all of the different components that will make up our views
App.js - This is what renders all of our browser routes and different views
index.js - This is what renders the react app by rendering App.js, should not change
package.json - Defines npm behaviors and packages for the client


backend - Holds the backend application
config - This holds our configuration files, like mongoDB uri
controllers - These hold all of the callback functions that each route will call
models - This holds all of our data models
routes - This holds all of our HTTP to URL path associations for each unique url
tests - This holds all of our server tests that we have defined
crons - This holds all of our server job scheduallers that we have defined for timely exections
server.js - Defines npm behaviors and packages for the client
package.json - Defines npm behaviors like the scripts defined in the next section of the README


root
.gitignore - Tells git which files to ignore
crypto_exchange.sql - has the database schema for creating database and database table this project is connected to mysql database for that i have used laragon there are other options available xampp,wampp etc.

README - This file!
Available Scripts
In the project directory, you can run:

npm start from frontend directory
Runs the client app  in development mode.
Open http://localhost:3000 to view the client in the browser.


npm start from backend directory
Runs just the server in development mode.