const express=require('express');
const { getTestDemo } = require('./controller/studentController');
const myCreatePool = require('./config/db');

// Create instance of express
const app=express();

// Midleware
app.use(express.json());

// PORT
const PORT =;

//Routes
app.use("/api/v4/demo", require('./routes/studentRoutes'));


//conditionaly listen
myCreatePool.query("SELECT 1").then(()=>{
    console.log("MySql DB connected");

    //Listen
    app.listen(PORT,()=>{
    console.log("Server is running....");
});

});



