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

server.listen(port, () => console.log(`Active on ${port} port`));