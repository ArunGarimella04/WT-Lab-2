function listProperties(obj) {
    return Object.keys(obj);
}

// Test example
const sampleObject = { name: "Alice", age: 25, city: "Wonderland" };
console.log(listProperties(sampleObject)); // Output: ["name", "age", "city"]
