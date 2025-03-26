document.getElementById("studentForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const studentData = {
        studentId: document.getElementById("studentId").value,
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value,
        fatherName: document.getElementById("fatherName").value,
        motherName: document.getElementById("motherName").value,
        marks10: Number(document.getElementById("marks10").value),
        marks12: Number(document.getElementById("marks12").value)
    };

    console.log("Sending Data:", studentData); // ✅ Debugging

    try {
        const response = await fetch("https://website-cnlh.onrender.com/admit-student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        console.log("Response from server:", result); // ✅ Debugging

        document.getElementById("message").innerText = result.message || "Form submitted successfully!";
        document.getElementById("message").style.color = "green";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error submitting form.";
        document.getElementById("message").style.color = "red";
    }
});

// Function to store Student ID in local storage when the link is opened
function setStudentId(studentId) {
    localStorage.setItem("student_id", studentId);
}

// Retrieve and display student ID from local storage
window.onload = function() {
    const storedStudentId = localStorage.getItem("student_id");
    if (storedStudentId) {
        document.getElementById("student-id").innerText = "Student ID: " + storedStudentId;
    } else {
        document.getElementById("student-id").innerText = "No Student ID found!";
    }
};
