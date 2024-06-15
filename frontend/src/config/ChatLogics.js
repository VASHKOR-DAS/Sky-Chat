export const getSender = (user, users) => {
    // console.log("users", users);
    return users[0]._id === user._id ? users[1].name : users[0].name;
};

/*
 if is not a GroupChat return a user name : return the name (Given, when creating a group) of Group

 if users array first object's id === logged user ?
 users array's first object's name (which is logged user)
 :
 users array's second object's name (which is chat name)
 */

export const getSenderFull = (user, users) => {
    // console.log("users", users);
    return users[0]._id === user._id ? users[1] : users[0];
};

// use it on SingleChat component for showing selectedUser info



// // if the same sender message && last message show profile pic
// export const isSameSender = (messages, m, i, userId) => {
//     return (
//         i < messages.length - 1 &&
//         (messages[i + 1].sender._id !== m.sender._id ||
//             messages[i + 1].sender._id === undefined) &&
//         messages[i].sender._id !== userId
//     );
// };

// export const isLastMessage = (messages, i, userId) => {
//     return (
//         i === messages.length - 1 &&
//         messages[messages.length - 1].sender._id !== userId &&
//         messages[messages.length - 1].sender._id
//     );
// };