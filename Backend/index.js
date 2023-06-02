require("dotenv").config();
const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/userRoutes");
const connect = require("./config/db");
const ChatUser = require("./routes/chatRoutes");
const MessageRouter = require("./routes/messageRoutes");
const colors = require("colors");
const { notFound } = require("./middleware/errorMiddleware");
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json()); //to accept json  data
app.use("/api/user", UserRouter);
app.use("/api/chat", ChatUser);
app.use("/api/message", MessageRouter);
app.use(notFound);
connect();
const server = app.listen(PORT, () =>
	console.log("server started".yellow.bold)
);
const socketIO = require("socket.io");
//here we are creating web socket server for real time chat....
//here is the function thats take two parameter...server and obj..
const io = socketIO(server, {
	//here pingTimeout means its wait 60sec before going server offs...
	pingTimeout: 60000,
	//we dont have any cors origin error that why we are writing origin...
	cors: {
		origin: "http://localhost:3000",
	},
});

//here we create connection and its takes callbacks..
io.on("connection", (socket) => {
	console.log("connected to socket.io");
	//here whenever user open the app his will connect with his personal socket..
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		console.log(userData._id);
		socket.emit("connected");
	});

	//here create chat room...
	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("user joined room:" + room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;
		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user) => {
			if (user._id == newMessageRecieved.sender._id) return;
			socket.in(user._id).emit("message recieved", newMessageRecieved);
		});
	});

	//this is the server closing code...
	socket.off("setup", () => {
		console.log("user Disconnected");
		socket.leave(userData._id);
	});
});
//wait until some access from frontend it will did not give any output...
