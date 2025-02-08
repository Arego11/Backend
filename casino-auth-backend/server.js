require("dotenv").config(); //This loads environment variables from .env file into process.env This allows sensitive information (like database credentials) to be kept outside the codebase, preventing security risks.

//importing packages
const express = require("express"); // creates a web server
const cors = require("cors"); // This is good for preventing malicious attacks that can be directed to your website. it can also allow request from different origins. 
const mongoose = require("mongoose"); // connects and manages the MongoDB database (this DB is different compared to the trad DB'es, for example its structure is flexible instead of fixed with tables, shema is dynamic instead of predefined and strict, etc)

//creates express.js app
const app = express(); // this is a tool to connect middleware, handle requests, refine routes
//These are the middlewares. middlewares might do something like log the request, parse cookies, or check authentication
//Then it hands to the next middleware, which might add data to request object or handle errors, etc
//This happens until the request reaches the route handler, which processes the request and sends a response.
app.use(cors()); // allows external clients to access the server. 
//Cors is needed in case your front runs on a different domain or port then your backend
app.use(express.json()); // Parses(digesting the file to understand it) incoming JSON request bodies automatically and I think creates js data structure

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
