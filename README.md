# Dungeon-Site

## Project Description
During this COVID epidemic, it has become harder to find groups of people to play games with, both in person and remotely. The Dungeon Site application is a social meetup application. Dungeon Site is intended to allow for the creation, detailing, and scheduling of such games. Details provided include addresses, behaviors expected at the table, languages spoken, links to third party resources, and the game schedule.

## Technologies Used
* React
* Java
* JavaScript
* HTML/CSS
* NodeJS
* Axios
* Spring 
* Spring Boot 
* Spring MVC 
* Spring Data 
* PostGres 
* Heroku
## Features
* Users can create accounts and login to the dungeon site system
* Users can create, join and schedule games at self defined locations, times, using various systems.
* Users can view the games they've created and the ones they have joined with all the information of each game listed.
* Users can search for games by ID, game master, or game name.
To-do list:

* The ability for users to add each other as friends, to then view and invite each other to games.
* The ability to edit games after they have been created, and kick certain players from the game.
* The ability for users to communicate with each other in real time via chat messaging.
* The ability to search games via fragments of address to find games nearby
## Getting Started
* Ensure that Node.js is installed.
* Ensure that git is installed.
* Open command line (cmd).
* Clone the project repository by typing ```git clone https://github.com/Team-Dungeon-Keepers/Dungeon-Site.git``` into said cmd.
* Once the cloning is complete, navigate to the project directory.
* Type ```npm ci``` into the cmd. This is short-hand for ```npm clean-install```
* Once the installation is complete type ```npm start``` into the cmd to begin the program.
* If an internet browser window has not opened automatically, the program can be accessed by doing so and navigating to ```localhost:3000```.
### Command Line Code
```
git clone https://github.com/Team-Dungeon-Keepers/Dungeon-Site.git
npm ci
npm start
```

## Usage
After deploying the website using ```npm start``` we can see the login screen on ```localhost:3000``` as shown below.
![loginPage](https://github.com/Team-Dungeon-Keepers/Dungeon-Site/blob/main/public/loginpage.png)
Clicking on "here" allows us to move to the registration screen. On the registration screen, one can see the required fields, 
including firstname, lastname, e-mail and password. After filling the required fields in, one may also fill in their local address,
(this functionality was designed to support local game searches, but isn't used now). Logging in, one will log in seeing the following screen:
![Dashboard](https://github.com/Team-Dungeon-Keepers/Dungeon-Site/blob/main/public/dashboard.png)
The buttons will take you to their respective pages, performing their respective self-explanatory functions.
By clicking the create game option, one will be requested to fill in all the fields related to a game.
A title, a password (if the game should be private), what game will be played, and if there's any behavior requirements, 
what time to meet, where to meet, etc. After creating a game, the game will be saved to the database, in which allows 
people to search for the game via the "find games" page, and the original user to view it in the "my games" page.

## Contributors
Here list the people who have contributed to this project. 

@Michael-Kochis
Michael Kochis

@tbridey
Taelor McBride

@unclebanks
Tyler Banks

@dylanxu1213
Weixiang Xu

## License
This project uses the MIT standard license.
