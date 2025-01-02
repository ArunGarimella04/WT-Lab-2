const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// MongoDB Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB URI if different
const client = new MongoClient(uri);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Student Details Finder</h2>
        <form method="POST" action="/student">
            <label for="rollNo">Enter Roll Number:</label>
            <input type="number" id="rollNo" name="rollNo" required />
            <button type="submit">Fetch Details</button>
        </form>
    `);
});

app.post('/student', async (req, res) => {
    const rollNo = parseInt(req.body.rollNo, 10);
    try {
        await client.connect();
        const database = client.db("stud");
        const collection = database.collection("students");

        const student = await collection.findOne({ rollNo: rollNo });

        if (student) {
            res.send(`
                <h2>Student Details</h2>
                <p>Roll Number: ${student.rollNo}</p>
                <p>Name: ${student.name}</p>
                <p>Age: ${student.age}</p>
                <p>Grade: ${student.grade}</p>
                <p>Email: ${student.email}</p>
                <a href="/">Back</a>
            `);
        } else {
            res.send(`
                <h2>No Student Found</h2>
                <p>Roll Number ${rollNo} not found.</p>
                <a href="/">Back</a>
            `);
        }
    } catch (error) {
        res.status(500).send("Error fetching student details.");
        console.error("Error fetching student details:", error);
    } finally {
        await client.close();
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
