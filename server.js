let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./stream');
let path = require('path');
let port = 3000

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});


io.of('/stream').on('connection', stream);

server.listen(port, () => console.log(`Active on ${port} port`));