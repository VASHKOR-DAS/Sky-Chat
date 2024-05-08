const asyncHandler = require('express-async-handler');
const Chat = require("../models/chatModel");
const User = require('../models/userModel');

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
//@hints           req.user._id = logged user (Already login user), userId = wish to chat an user (id)
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log(req.body);

    if (!userId) {
        console.log('UserId param not sent with request');
        return res.status(400).send('User Is Not Authorized');
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
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
            users: [req.user._id, userId],
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

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    var users = JSON.parse(req.body.users); // stringify the array of selected users ids

    if (users.length < 2) {
        return res.status(400).send({ message: "More than 2 users are required to from a group chat" });
    }

    // group chat array automatically push logged user (me)
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName : req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

            res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400).send(error.message);
        throw new Error(error.message);
    }
});


module.exports = { accessChat, fetchChats, createGroupChat };