import express from 'express';
import { students } from './data.js';

const app = express();
const PORT = 3000;

<<<<<<< HEAD

=======
>>>>>>> 7ea2edfc6ff381ed9e04a52037a230b0b1854237
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get("/", (req, res) => {
    res.send('Hello, CBE204');
});

app.get("/about", (req, res) => {
    res.send('This is a set of APIs used to demonstrate REST APIs for CBE204 Web tech class');
});
<<<<<<< HEAD
=======

>>>>>>> 7ea2edfc6ff381ed9e04a52037a230b0b1854237

app.get("/students", (req, res) => {
    res.status(200).json(students);
});


function checkStudentID(student, id) {
    return student.id === parseInt(id, 10);
}
<<<<<<< HEAD

=======
>>>>>>> 7ea2edfc6ff381ed9e04a52037a230b0b1854237

app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    const requested_student = students.find((student) => checkStudentID(student, id));

    if (requested_student) {
        res.status(200).json(requested_student);
    } else {
        res.status(404).json({ error: `Student with ID ${id} not found` });
    }
});


app.post("/students", (req, res) => {
    const newStudent = req.body;

    if (!newStudent || !newStudent.name) {
        return res.status(400).json({ error: "name is required" });
    }

    const newId = students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1;

    newStudent.id = newId;
    students.push(newStudent);

    res.status(201).json(newStudent);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
