import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const SettingsDropdown = (props) => {
	return (
        <Dropdown isOpen={props.open} toggle={props.toggle} size="sm">
            <DropdownToggle color="secondary">Settings</DropdownToggle>
            <DropdownMenu>
            	<DropdownItem onClick={props.editModal}>Edit Profile</DropdownItem>
            	<DropdownItem onClick={props.pwModal}>Change Password</DropdownItem>
            </DropdownMenu>
        </Dropdown>
	)
}

export default SettingsDropdown