# How to set up the project

##Clone the repositories

First you need to clone both front-end and back-end repositories

  -https://github.com/SantiagoPiZe/react-lightitmed
  -https://github.com/SantiagoPiZe/lightitmed-node
  
You can do so from the command line by running git clone <link> on the folder where you want the projects to be stored

##Installing dependencies

Inside each of the project folders ( react-lightitmed and lightitmed-node) from the command line run

  ```
  npm install
  ```

##Setting up the db

For this project a MySQL db was chosen. To set up the database, from MySql create a new connection with the following configuration
    
  ```
  HOST: 127.0.0.1,
  PORT: 3306,
  USER: "root",
  PASSWORD: "root",
  DB (or connection name): "lightitmed",
  dialect: "mysql",
  ```

##Running the project
 
 Lastly you need to run from each of the project's location ( same as in the dependecies step ) the following command to start each of the projects
 
  ```
  npm start
  ```
After both have finished you should be able to access the application from http://localhost:3000

I'm happy to answer any question at santiago.pi.ze@gmail.com
****
