import React, { useEffect, useState } from "react";
import {
    NavItem,
    NavLink,
    Nav,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import axios from "axios";
import ChannelCreate from "./ChannelCreate";

const ChatNavMenu = () => {
    const username = localStorage.getItem('username');
    const [channelList, setChannelList] = useState([]);
    const [createModal, setCreateModal] = useState(false);

    // Get the list of groups the current user is in
    useEffect(() => {
        axios.get('https://localhost:5001/api/user/getUserChannels/', {
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
    }, []);

    // Mapping the list of channels from the array to a linkable list rendered for the user to click on
    const channels = channelList.map((channel) =>
        <NavItem key={channel + 'DM'}>
            <NavLink tag={Link} to={"/chat" + (channel == "General Chat" ? "" : "/" + channel)}> {channel} </NavLink>
        </NavItem>
    );

    const toggleCreateModal = () => setCreateModal(!createModal);

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
                <hr></hr>
                <Button tag={Link} to={"/channel/search"} className="mb-2">Join a Channel</Button>
                <Button tag={Link} to={"/channel/manage"} className="mb-2">Manage Channels</Button>
                <Button onClick={toggleCreateModal}>Create a Channel</Button>
                <ChannelCreate createModal={createModal} toggle={toggleCreateModal} />
            </div>
        </div>
    )
};

export default ChatNavMenu;
