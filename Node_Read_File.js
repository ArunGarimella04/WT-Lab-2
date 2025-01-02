const http = require('http');
const readline = require('readline');

// Get the port number from the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the port number to run the server: ', (port) => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running on port ' + port);
    });

    server.listen(Number(port), () => {
        console.log(`Server is running on port ${port}`);
    });

    rl.close();
});
