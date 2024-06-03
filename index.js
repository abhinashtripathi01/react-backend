// console.log("Hello Heaven")

// 1. Importing express
const express = require('express');
const dotenv= require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./database/database');
const cors = require('cors')
const fileUpload = require('express-fileupload')


// 2. Creating an express app
const app = express();
//Json Config
app.use(express.json())


//FIle UPLOAD CONFIG


app.use(fileUpload())

// Make a public folder access to outside
app.use(express.static('./public'))

//Accepting form data (json, image, video, audio etc)

//cors config
const corsOptions = {
    origin: true,
    credentials : true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions))

// configuration dotenv
dotenv.config();

////// connection to database

// mongoose.connect(process.env.MONGODB_URL).then(()=>{
//     console.log("Database connected sucessfully")
// });

// mongoose.connect(process.env.MONGODB_CLOUDURL).then(()=>{
//     console.log("Database connected sucessfully")
// });

connectDB(); 

// 3. Defining the port
const PORT = process.env.PORT  // 8000;

// 4. Creating a test route or endpoint
// app.get('/test', (req,res) => {
//     res.send("Test API is working....!");
// });

// (req,res) => {
//     res.send("Test API is working....!");
// });
// function(request, response) should be in controller
app.get('/test', (req,res) => {
    res.send("Test API is working....!");
});

// app.get('/test'
//path should be in routes

// configuring user routes
app.use('/api/user', require('./routes/userRoutes'))  //import


// configuring routes
app.use('/api/product', require('./routes/productRoutes'))  //import
// http://localhost:9000/api/product/create

// http://localhost:8000/api/user/create

//  Starting the server
app.listen(PORT, () => {
             console.log(`Server-app running on port ${PORT}`)
});


//API URl
// http://localhost:8000/test




//Task

//Controller - Routes-Index.js
//Make a productController.js
// Make a productRoutes.js
//Link to  index.js

//http://localhost:9000/api/product/create
//Response : Product APPI is wrokinh