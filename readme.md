Getting started with Node and MongoDB (Using Mongoose)

1) Follow the instructions at http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/ to install MongoDB, and use 'brew install node' to install Node (assuming you have homebrew installed)
2) In a terminal, use 'npm install' in the root directory of this project. This will install all dependencies as seen in the package.json file, also located in the root directory.
3) Run 'mongod' to start Mongo.
4) In a new terminal tab/window, type node server.js to run the server.

This example basically sets up a connection through to Mongo, inputs and uploads a JSON file, and does a query to pull down 'unread' messages from the database.
Should be an ok starting point hopefully!