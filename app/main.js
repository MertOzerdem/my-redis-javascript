const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

let store = {};

const server = net.createServer((connection) => {
    console.log('Client connected');

    connection.on('data', (data) => {
        // const command = data.toString().trim().split('\r\n').slice(1); // Skip the first '*2'
        // const commandType = command[1];
        // const commandValue = command[3];
        // console.log("Command: ", command);
        // console.log("Command Type: ", commandType);
        // console.log("Command Value: ", commandValue);

        const command = parseArrayCommand(data);
        console.log("parseArrayCommand: ", parseArrayCommand(data));


        if (command[0].toLowerCase() === 'ping') {
            connection.write('+PONG\r\n');
            console.log('PONG sent to client');
        } else if (command[0].toLowerCase() === 'echo') {
            connection.write(`$${command[1].length}\r\n${command[1]}\r\n`);
            console.log(`ECHO sent to client: ${commandValue}`);
        } else if (command[0].toLowerCase() === 'set') {
            connection.write('+OK\r\n');
            store[command[1]] = command[2];
            console.log('SET sent to client');
        } else if (command[0].toLowerCase() === 'get') {
            connection.write(`$${store[command[1]].length}\r\n${store[command[1]]}\r\n`);
        } else {
            connection.write('-ERR unknown command\r\n');
            console.log('Unknown command');
        }
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });
});

function parseArrayCommand(data) {
    const lines = data.toString().trim().split('\r\n');
    const commandLength = parseInt(lines[0].substring(1), 10); // Remove the '*' and convert to number
    const command = [];
    for (let i = 0; i < commandLength; i++) {
        const lengthLine = lines[i * 2 + 1];
        const valueLine = lines[i * 2 + 2];
        const length = parseInt(lengthLine.substring(1), 10); // Remove the '$' and convert to number
        const value = valueLine.substring(0, length); // Get the value up to the specified length
        command.push(value);
    }
    return command;
}

server.listen(6379, "127.0.0.1");



