const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// for fronted server
const frontendOrigin = "http://localhost:3000";

// const { chats } = require("./data/data"); // fakeDate
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const serverURL  = require('../frontend/src/hooks/serverURL');


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// middleware
app.use(express.json()); //to accept JSON data

// middleware
app.use(cors());

// not use cors on client site(frontend), write down proxy server on package.json before dependencies
//"proxy": "http://127.0.0.1:5000",

// for invalid route send a proper message
// app.use(notFound);
// app.use(errorHandler);




app.get('/', (req, res) => {
    res.send(`API is running on PORT ${PORT}`)
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
















// implement socket.io (npm i socket.io) app is convert to a variable for use it
const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));

const io = new require("socket.io")(server, {
    // pingTimeout means they have amount of time for wait to disconnect connection(millisecond)
    pingTimeout: 60000,
    cors: {
        origin: frontendOrigin,
    },
});

io.on('connection', (socket) => {
    console.log("connected to socket.io");

    // take user data from the fronted
    socket.on("setup", (userData) => {
        socket.join(userData._id); //loggedUser obj
        console.log(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    });

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
});