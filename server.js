require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI;  // Use your MongoDB URI from .env
console.log("MongoDB URI:", mongoURI); // Log the URI for debugging

mongoose.set('debug', true); // Enable Mongoose debugging

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,  // ⏳ Wait 10 sec before timeout
    socketTimeoutMS: 45000 // ⏳ Allow sockets to stay open for 45 sec
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Student Schema
const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    dob: String,
    address: String,
    fatherName: String,
    motherName: String,
    marks10: Number,
    marks12: Number
}, { collection: "students" });  // ✅ Collection name must match Atlas

const Student = mongoose.model("Student", studentSchema);

// ✅ Route to Add Student Data
app.post("/admit-student", async (req, res) => {
    try {
        console.log("Received Data:", req.body);  // ✅ Debugging log

        if (!req.body.studentId || !req.body.name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newStudent = new Student(req.body);
        await newStudent.save();

        res.json({ message: "🎉 Student admission saved successfully!" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Error saving student data" });
    }
});

// ✅ Get All Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("❌ Error fetching students:", error);
        res.status(500).json({ message: "Error retrieving students" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
