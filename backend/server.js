const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
// const { chats } = require("./data/data"); // fakeDate
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const serverURL  = require('../frontend/src/hooks/serverURL');

// for io
const { createServer } = require("http");
// const { Server } = require("socket.io");


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
        origin: "http://localhost:3000",
    },
});


io.on('connection', (socket) => {
    console.log("connected to socket.io");
});