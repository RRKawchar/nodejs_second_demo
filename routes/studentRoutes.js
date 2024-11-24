const express = require('express');
const { getTestDemo,
     getAllStudent, 
     createStudentRecord, 
     updateStudentRecord,
     searchStudentById,
     deleteStudent
    } = require('../controller/studentController');


// instance of router by using express
const router= express.Router();

// methods routes
//GET TEST DEMO
router.get("/test",getTestDemo);

// GET STUDENT DATA FROM STUDENT TABLE|| GET
router.get("/getAll",getAllStudent);

// create student record || POST
router.post("/create",createStudentRecord);

// update student record || PUT
router.put("/update/:id",updateStudentRecord);

// Search student record || PUT
router.get("/query/:id",searchStudentById);

// Deleting student  || DELETE
router.delete("/delete/:id",deleteStudent);

// exports of routers
module.exports=router;






