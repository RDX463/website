const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load .env variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection using Environment Variable
const mongoURI = process.env.MONGO_URI || "mongodb+srv://rdx:rDx@040603@cluster0.rxum1.mongodb.net/";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ MongoDB Schema for "admissions" Collection
const admissionSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    marks10: { type: Number, required: true },
    marks12: { type: Number, required: true }
}, { collection: "admissions" });

const Admission = mongoose.model("Admission", admissionSchema);

// ✅ API Route to Add Student Admission
app.post("/admit-student", async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body);

        // ✅ Check required fields
        if (!req.body.studentId || !req.body.name) {
            return res.status(400).json({ message: "❌ Missing required fields" });
        }

        const newAdmission = new Admission(req.body);
        await newAdmission.save();

        res.status(201).json({ message: "✅ Student admission details saved successfully!" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "❌ Error saving admission details" });
    }
});

// ✅ Set PORT (Render.com assigns a PORT dynamically)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
