const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// $<length>\r\n<data>\r\n
// $3\r\nhey\r\n


const server = net.createServer((connection) => {
    console.log('Client connected');

    connection.on('data', (data) => {
        const command = data.toString().trim().split('\r\n').slice(1); // Skip the first '*2'
        const commandType = command[1]; // Remove the '$4' from 'ECHO'
        const commandValue = command[3]; // Remove the '$4' from 'pear'
        console.log("Command: ", command);
        console.log("Command Type: ", commandType);
        console.log("Command Value: ", commandValue);

        if (commandType.toLowerCase() === 'ping') {
            connection.write('+PONG\r\n');
            console.log('PONG sent to client');
        } else if (commandType.toLowerCase() === 'echo') {
            connection.write(`$${commandValue.length}\r\n${commandValue}\r\n`);
            console.log(`ECHO sent to client: ${commandValue}`);
        } else {
            connection.write('-ERR unknown command\r\n');
            console.log('Unknown command');
        }
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(6379, "127.0.0.1");


