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

//@description     Create a group chat
//@route           POST /api/chat/group
//@access          Protected
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
            chatName: req.body.name,
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

//@description     rename the group
//@route           PUT /api/chat/rename
//@access          Protected
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true } //new name give, otherwise it's return old name
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404).send({ message: "Chat Not Found" });
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

//@description     add a user(by id) to Group
//@route           PUT /api/chat/groupadd
//@access          Protected
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body; //userId = wish to add a user on group(id)

    const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404).send({ message: "Chat Not Found" });
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

//@description     remove a user(by id) to Group
//@route           PUT /api/chat/groupremove
//@access          Protected
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body; //userId = wish to remove a user on group(id)

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404).send({ message: "Chat Not Found" });
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});



module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };