const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((connection) => {
    console.log('Client connected');

    connection.on('data', (data) => {
        console.log("data", data.toString().trim())
        const command = data.toString().trim();
        if (command.includes('PING')) {
            connection.write('+PONG\r\n');
            console.log('PONG sent to client');
        }
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(6379, "127.0.0.1");


