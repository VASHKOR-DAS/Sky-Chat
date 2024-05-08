import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../../serverURL';

const Chat = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get(`${serverURL}/api/chat`);

        setChats(data);
    }
    

    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <div>
            {chats.length}
        </div>
    );
};

export default Chat;