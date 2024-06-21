import axios from "axios";
import { toast } from "react-toastify";
import { getSenderFull } from "../config/ChatLogics";
import { serverURL } from "./serverURL";
// Time Formate


export const handleFormatTime = (timeStamp) => {

    let optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    const time = new Date(timeStamp)?.toLocaleTimeString("en-US", optionsTime);
    return time;
};



// Date Formate

export const handleFormatDate = (dateStamp) => {
    let optionsDate = {
        weekday: "short",
        day: "numeric",
        month: "short",
        // year: "numeric",
    };

    // "en-GB" return DD MM YYYY
    // "en-US" return MM DD, YYYY 
    const date = new Date(dateStamp)?.toLocaleString("en-gb", optionsDate);
    return date;
};



// for Match Msg of Map Msg


export const handleMatchUserMsg = (user, notification, chat) => {
    return notification.filter((obj) => {
        // isGroupChat
        const filteredIsGroupChat = obj?.chat?.isGroupChat;

        // userIds
        const filteredUserId = obj?.sender?._id;
        const chatUserId = getSenderFull(user, chat?.users)?._id;

        if (!filteredIsGroupChat) {
            var userNotify = filteredUserId === chatUserId;
            return userNotify;
        }
        return userNotify;
    });
};

export const handleMatchGroupMsg = (notification, chat) => {
    return notification.filter((obj) => {
        // isGroupChat
        const filteredIsGroupChat = obj?.chat?.isGroupChat;

        // // groupChatIds
        const filteredGroupChatId = obj?.chat?._id;
        const chatGroupId = chat?._id;

        if (filteredIsGroupChat) {
            var groupNotify = filteredGroupChatId === chatGroupId;
            return groupNotify;
        }
        return groupNotify;
    });
};


export const fetchChats = async (user, setChats) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const { data } = await axios.get(`${serverURL}/api/chat`, config);

        setChats(data);
    } catch (error) {
        // alert("Failed to load the chat");
        toast.error("Failed to load the chat !");
    }
};