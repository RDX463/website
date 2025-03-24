const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/studentERP", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// New MongoDB Schema for "admissions" Collection
const admissionSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    dob: String,
    address: String,
    fatherName: String,
    motherName: String,
    marks10: Number,
    marks12: Number
}, { collection: "admissions" });  // ✅ New collection name

const Admission = mongoose.model("Admission", admissionSchema);

app.post("/admit-student", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // ✅ Debugging

        if (!req.body.studentId || !req.body.name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newAdmission = new Admission(req.body);
        await newAdmission.save();

        res.json({ message: "Student admission details saved successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error saving admission details" });
    }
});


// Start Server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
