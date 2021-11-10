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
    const [channelList, setChannelList] = useState([]);

    // Get the list of groups the current user is in
    const getUserChannels = async () => {
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
    getUserChannels();

    // Mapping the list of channels from the array to a linkable list rendered for the user to click on
    const channels = channelList.map((channel) =>
        <NavItem key={channel + 'DM'}>
            {(channel == "General Chat") ? <NavLink tag={Link} to={"/chat"}> {channel} </NavLink> : <NavLink tag={Link} to={"/chat/" + channel}> {channel} </NavLink>}

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
