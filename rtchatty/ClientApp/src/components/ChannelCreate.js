import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ChannelCreate = (props) => {
    const [channelName, setChannelName] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [createdChannel, setCreatedChannel] = useState("");

    const handleChange = (event) => {
        // Don't allow for any space characters, will (probably) break reading channel name from URL
        event.target.value = event.target.value.replaceAll(' ', '-');
        setChannelName(event.target.value);
    }

    const createChannel = (e) => {
        setShowSuccess(false);
        setShowError(false);
        setCreatedChannel(channelName);

        axios.post("https://localhost:5001/api/channel/create", {
            name: channelName
        })
        .then(function (res) {
            //props.toggle; // Not working >:(
            setShowSuccess(true);
        })
        .catch(function (error) {
            setShowError(true);
        });
    }

    return (
        <div>
            <Modal isOpen={props.createModal} toggle={props.toggle}>
                <ModalHeader>
                    <div className="alert alert-success" hidden={!showSuccess} name="successAlert">Success! "{createdChannel}" has been created.</div>
                    <div className="alert alert-danger" hidden={!showError} name="errorAlert">A channel with the name "{createdChannel}" has already been created.</div>
                    Create a New Channel
                </ModalHeader>
                <ModalBody>
                    <Input placeholder="Channel Name" onChange={handleChange}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={createChannel}>Create</Button>
                    <Button color="danger" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ChannelCreate;