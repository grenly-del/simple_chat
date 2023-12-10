import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'

const app = express();
const httpServer = createServer(app);


app.use(cors({
	origin: "http://localhost:3003/"
}))

const io = new Server(httpServer, {
	cors: {
   	 	origin: "http://localhost:3003",
  },
});


io.use((socket, next) => {
	const username = socket.handshake.auth.username
	const room = socket.handshake.auth.room

	if( !username || !room ) {
		return next(new Error('Invalid Data'))
	}

	socket.username = username
	socket.room = room
	next()
})



io.on("connection", (socket) => {

	let users = [];
	  for (let [id, socket] of io.of("/").sockets) {
	    users.push({
	      userID: id,
	      username: socket.username,
	      room: socket.room
	    });
	  }
  		socket.emit('users', users)
  		socket.broadcast.emit('users', users)
	  	socket.on('join_room', (room) => {
	  		socket.join(room)
	  		console.log(room)
	  	})

	  socket.on('send_message', (data) => {
	  	socket.to(data.room).emit('recive_message', data.value)
	  })

	  socket.on('join-private', ({room}) => {
	  	socket.join(room)
	  })

	  socket.on('private-message', (data) => {
	  	socket.to(data.room).emit('recive-private-msg', data)
	  })

  const count = io.engine.clientsCount;
  const count2 = io.of("/").sockets.size;
 	console.log(count)

});




httpServer.listen(3000, () => {
	console.log(`server is connected in http://localhost:${3000}/`)
});