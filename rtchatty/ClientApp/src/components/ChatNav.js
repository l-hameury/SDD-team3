import React, { useState } from "react";
import {
    NavItem,
    NavLink,
    Nav,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import axios from "axios";

const ChatNavMenu = () => {
    const username = localStorage.getItem('username');
    const [channelList, setChannelList] = useState("");
    
    // Placeholder channels array. TODO: Replace with call to backend
    const tempChannelList = [
        "Channel-1",
        "Channel-2",
        "Channel-3",
    ];

    // Get the list of groups the current user is in
    /* const getUserChannels = async () => {
        await axios.get('https://localhost:5001/api/user/getUserChannels/', {
            params: {
                username: username,
            }
        })
        .then(function (res) {
            setChannelList(res.data);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
    await getUserChannels(); */

    const channels = tempChannelList.map((m, i) => 
        <NavItem key={m + 'DM'}>
            <NavLink tag={Link} to={"/chat/" + m}>
                {m}
            </NavLink>
        </NavItem>
    );

    return (
    <div>
        <div>
            <h3>Message Rooms</h3>
            <hr></hr>
        </div>
        <div>
            <Nav vertical>
                {channels}
            </Nav>
        </div>
    </div>
    )
};

export default ChatNavMenu;
