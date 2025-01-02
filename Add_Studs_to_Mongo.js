const { MongoClient } = require('mongodb');

// MongoDB Connection URI
const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB URI if different
const client = new MongoClient(uri);

async function insertStudents() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("stud");
        const collection = database.collection("students");

        // Student data to insert
        const students = [
            { rollNo: 1, name: "Karthik", age: 18, grade: "A"},
            { rollNo: 2, name: "Jane Doe", age: 19, grade: "B"},
            { rollNo: 3, name: "Grace Howard", age: 17, grade: "A"},
            { rollNo: 4, name: "Lisa", age: 18, grade: "C"},
            { rollNo: 5, name: "Green Lantern", age: 20, grade: "B" }
        ];

        const result = await collection.insertMany(students);
        console.log(`${result.insertedCount} students inserted successfully.`);
    } catch (error) {
        console.error("Error inserting students:", error);
    } finally {
        await client.close();
    }
}

insertStudents();
