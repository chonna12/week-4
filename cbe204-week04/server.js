import e, { request } from "express";   
import {students} from "./data.js";
import express from "express";
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello cbe204");
});

function About(req, res) {
    res.send("This is \
        the about page");
}

app.get("/about", About);

app.get("/students", (req, res) => {
    res.send(students);
});

function checkstudentID(student, id) {
  if (student.id == id) return true;
  else return false;
}    

app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const request_student = students.find(function(student) {
        return checkstudentID(student, id);
    });

    
    if (request_student) {
        res.send(request_student);
    } else {
        res.status(404).send("Student not found");
    }
});

app.post("/students", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});