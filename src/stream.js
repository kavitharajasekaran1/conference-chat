const value =[]
const stream = (socket)=>{
    let connections=[]


    socket.on('subscribe', (data)=>{
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);
        value.push(data.room)
        

        //Inform other members in the room of new user's arrival
        if(socket.adapter.rooms[data.room].length > 1){
            socket.emit('counter',(data)=>{
                console.log(data,"real count2====>>>")
            })
            socket.to(data.room).emit('new user', {socketId:data.socketId,value:socket.adapter.rooms[data.room].length});
        }

        console.log(socket.rooms);
    });
    // socket.on('username', function(username) {
    //     socket.username = username;
    //     console.log(username,"username in server")
    //     socket.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    // });


    socket.on('newUserStart', (data)=>{

        socket.to(data.to).emit('newUserStart', {sender:data.sender});
    });


    socket.on('sdp', (data)=>{
        socket.to(data.to).emit('sdp', {description: data.description, sender:data.sender});
    });


    socket.on('ice candidates', (data)=>{
        socket.to(data.to).emit('ice candidates', {candidate:data.candidate, sender:data.sender});
    });


    socket.on('chat', (data)=>{
        socket.to(data.room).emit('chat', {sender: data.sender, msg: data.msg});
    });
    socket.on('button',(data)=>{
        console.log(data,"button status")
        socket.to(data.room).emit('button',data);
    })
    socket.on('stream',function(image){
        // console.log(image,"streammmmmmmmmm")
        socket.broadcast.emit('stream',image)
    })
    socket.on('stopbutton',(data)=>{
        console.log(data,"button status stop")
        socket.to(data.room).emit('stopbutton',data);
    })
}

module.exports = stream;