const express = require('express');
const db = require('../config/db');

// Test Methods
const getTestDemo = async (req, res) => {
    console.log("This is my test demo methods");
    res.status(200).send({
        success: true,
        message: "I am practicing node js with mysql and express js"
    });
}

// Get all student data || GET
const getAllStudent = async (req, res) => {
    try {
        const data = await db.query(`SELECT*FROM student`);

        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Not Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Student get successfully!",
            studentData: data[0]
        });

    } catch (error) {
        console.log(`Error while get all student hit : ${error}`);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }

};


// create student data || POST
const createStudentRecord = async (req, res) => {
    try {

        if (!req.body) {
            res.status(400).send({
                success: false,
                message: "Bad Request"
            });
        }

        const { name, roll_no, fees, class: className, medium } = req.body;

        if (!name || !roll_no || !fees || !className || !medium) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        const data = await db.query(`INSERT INTO student (name,roll_no,fees,class,medium) VALUES(?,?,?,?,?)`, [name, roll_no, fees, className, medium]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Create Student records faields"
            });
        }

        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "Student records create success"
        });

    } catch (error) {
        console.log(`Error while add studen records api hit : ${error}`);
        res.status(500).send({
            success: false,
            message: `Internal Server Error :${error}`,
            error
        });
    }
}


const updateStudentRecord = async (req, res) => {

    try {

        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id or Provide id"
            });
        }

        const { name, roll_no, fees, class: className, medium } = req.body;
        if (!name || !roll_no || !fees || !className || !medium) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields"
            });
        }

        const data = await db.query(`UPDATE student SET name=?, roll_no=?, fees=?, class=?, medium=? WHERE id=?`, [name, roll_no, fees, className, medium, studentId]);
        if (!data) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                message: "Failed to update student records"
            });
        }
        res.status(200).send({

            success: true,
            statusCode: 200,
            message: "Student records update successfully!"
        });

    } catch (error) {
        console.log(`error while update student records : ${error}`);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }

}


const searchStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Invalid provided id"
            });
        }

        const data = await db.query(`SELECT * FROM student WHERE id=?`, [studentId]);

        if (!data) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Failed to load data "
            });

        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Student search success",
            studentData: data[0]
        });


    } catch (error) {
        console.log(` error while search student : ${error} `);
        res.status(500).send({
            success: false,
            statusCode: 500,
            message: "No found records"
        });
    }
}


const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                statusCode: 500,
                message: "Invalid provided student id"
            });
        }

        await db.query(`DELETE FROM student WHERE id=?`, [studentId]);
        res.status(200).send(
            {
                success: success,
                statusCode: 200,
                message: "Student deleted successfully!"
            }
        );

    } catch (error) {
        console.log(`Error while deleting student records : ${error}`);
        res
    }
}



// here is exports for get this method other class 
module.exports = { getTestDemo, getAllStudent, createStudentRecord, updateStudentRecord, searchStudentById,deleteStudent };