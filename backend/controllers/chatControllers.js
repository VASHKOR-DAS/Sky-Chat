const asyncHandler = require('express-async-handler');
const Chat = require("../models/chatModel");
const User = require('../models/userModel');

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
    // const userId = req.user._id
    const { receiverUserId } = req.body;

    if (!receiverUserId) {
        console.log('UserId param not sent with request');
        return res.status(400).send('User Is Not Authorized');
    }
    var isChat = await Chat.find({ 
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: receiverUserId } } },
        ],
    })
        .populate('users', '-password')
        .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email',
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, receiverUserId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({
                _id: createdChat._id,
            }).populate('users', '-password');
            res.status(200).send(FullChat);
        } catch (error) {
            res.status().send(error.message);
            throw new Error(error.message);
        }
    }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
    try {
        var Chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } },
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });

        Chats = await User.populate(Chats, {
            path: 'latestMessage.sender',
            select: 'name pic email',
        });
        res.send(Chats);
    } catch (error) { }
});


module.exports = { accessChat, fetchChats };