import * as http from 'http';
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

app.get('/', (req, res) => {
    console.log("Hello There!")
})
port.on('error', function (err) {
    console.log('Error: ', err.message);
})
let counter = 0;
let ardInput = [];
parser.on('data', (data) => {
    console.log(data);
    let input = data.split(":");
    console.log(input[1]);
    if (input[0] == "X") {
        ardInput[0] = input[1];
        counter++;
    } else if (input[0] == "Y") {
        ardInput[1] = input[1];
        counter++;
    } else if (input[0] == "F") {
        ardInput[2] = input[1]
        counter++
    } else {
        console.log("wtf is this?", input[0]);
    }
    if (counter == 3) {
        counter = 0;
        io.emit("mensaje", {"x":ardInput[0], "y":ardInput[1], "f":ardInput[2]})
    }
});

io.on('connect', (socket) => {

    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario conectado');
    })
})

server.listen(3000, () => {
    console.log('LISTENING PORT 3000')
});