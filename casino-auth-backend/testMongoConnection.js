const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
})
    .then(() => {
        console.log("Connected to MongoDB successfully");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });