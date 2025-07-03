

//Client<---------->Server<------------>DataBase(Mysql ojr MongoDb)


//in mongodb table-->Collection,  Rows--->Documents ,cols--->fields



//like importing modules in java 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());    // it will convert JSON(what we see in shell) data to Javascript Object(server understand)

mongoose.connect("mongodb+srv://thrishakandi4:edushare@cluster2.8bzff2o.mongodb.net/edusharemongo?retryWrites=true&w=majority&appName=Cluster2", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" Connection failed:", err));


// Define Schema
const studentSchema = new mongoose.Schema({
    name: String
});

// Create Model
const Student = mongoose.model("Student", studentSchema);



//  Adding............
app.post("/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding student" });//converts javascript to json
    }
});


// Retrive.......................
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});


// Update............................
app.put("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Student updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating student" });
    }
});

// Delete.....................
app.delete("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
