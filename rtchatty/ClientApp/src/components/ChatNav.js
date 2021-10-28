import React from "react";
import {
    NavItem,
    NavLink,
    Nav,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

const ChatNavMenu = () => (
    <div >
        <div>
            <h3>Message Rooms</h3>
            <hr></hr>
        </div>
        <div>
            <Nav vertical>
                <NavItem>
                    <NavLink tag={Link} to={"/chat"}>
                        General Chat
                    </NavLink>
                    <NavLink tag={Link} to={"/pages"}>
                        Link Two
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/faq"}>
                        Link Three
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/contact"}>
                        Link Four
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    </div>
);

export default ChatNavMenu;
