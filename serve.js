var Gpio = require('onoff').Gpio;
var hall = new Gpio(2, 'in');
const http = require("http");
const host = '192.168.1.139';
const port = 8000;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

const server = http.createServer(app);
const { Server } = require("socket.io");
const { off } = require("process");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user has connected');
  });


function testHall(){if (hall.readSync() == 0) {
    io.emit("update", "off")
	}
    else{
        io.emit("update", "off")
    }
}

server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});

setInterval(() => {
  testHall();
}, 5000);
