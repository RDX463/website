require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection (Fixes EBADNAME error)
const mongoURI = process.env.MONGO_URI; // Load from .env

mongoose.connect(mongoURI, {
    directConnection: true // ✅ Avoids SRV DNS issues
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Admission Schema
const admissionSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    dob: String,
    address: String,
    fatherName: String,
    motherName: String,
    marks10: Number,
    marks12: Number
}, { collection: "admissions" });

const Admission = mongoose.model("Admission", admissionSchema);

// ✅ Route: Admit Student
app.post("/admit-student", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        if (!req.body.studentId || !req.body.name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newAdmission = new Admission(req.body);
        await newAdmission.save();

        res.json({ message: "Student admission details saved successfully!" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Error saving admission details" });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
