let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./src/stream');
let path = require('path');
var port = process.env.PORT || 8080;

app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/src/index.html');
});
// app.use(express.static(__dirname + './src/index.html'));


io.of('/stream').on('connection', stream);

// var count = 0;

var $ipsConnected = [];



io.on('connection', function (socket) {
    let count = Object.keys(io.sockets.sockets).length;
    console.log(count,"real count")



//   var $ipAddress = socket.handshake.address;

//   if (!$ipsConnected.hasOwnProperty($ipAddress)) {

//   	$ipsConnected[$ipAddress] = 1;

//   	count++;

  	socket.emit('counter', {count:count});

  



  console.log("client is connected");
   /* Disconnect socket */

   socket.on('disconnect', function() {

    // if ($ipsConnected.hasOwnProperty($ipAddress)) {
    let count = Object.keys(io.sockets.sockets).length;


      count--;

      socket.emit('counter', {count:count});

    //}

});
socket.on('username1', function(username) {
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    socket.username = username;
    // socket.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    if(socket.username !=undefined){
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    console.log(socket.username,"username in server")
    }

});
socket.on('disconnect', function(username) {
    if(socket.username !=undefined){
        console.log("uuuuuuu")
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    }
})
})

server.listen(port, () => console.log(`Active on ${port} port`));