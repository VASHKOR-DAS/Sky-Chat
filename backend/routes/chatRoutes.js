const express = require('express');
const { accessChat, fetchChats } = require('../controllers/chatControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//protect means only logged in user can access this route

// accessing the chat or creating the chat
router.route('/').post(protect, accessChat);

// particular user all chat from db
router.route('/').get(protect, fetchChats);

// router.route('/group').post(protect, createGroupChat);

//rename a particular group
// router.route('/rename').put(protect, renameGroup);

// remove someone the group or leave the group
// router.route('/groupremove').put(protect, removeFromGroup);

// add someone the group
// router.route('/groupadd').put(protect, addToGroup);

module.exports = router;



