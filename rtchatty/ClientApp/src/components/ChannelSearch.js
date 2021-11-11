import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";

const ChannelSearch = () => {
    const username = localStorage.getItem('username');
    const [channelList, setChannelList] = useState([]);
    const [showJoinSuccess, setShowJoinSuccess] = useState(false);
    const [showJoinError, setShowJoinError] = useState(false);
    const [channel, setChannel] = useState("");

    useEffect(() => {
        // Get the list of all channels available to join
        axios.get('https://localhost:5001/api/channel/getChannels', {
        })
        .then(function (res) {
            setChannelList(res.data);
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }, []);

    const joinChannel = (e) => {
        setShowJoinSuccess(false);
        setShowJoinError(false);
        setChannel(e.target.value);

        axios.post("https://localhost:5001/api/user/joinChannel", {
            Username: username,
            Channels: [e.target.value],
        })
        .then(function(res) {
            setShowJoinSuccess(true);
        })
        .catch(function(error) {
            setShowJoinError(true);
        });
    }
    
    let channelCards = channelList.map((channel) =>
        <Card key={channel.id} className="mb-3">
            <CardBody>
                <CardTitle tag="h5">{channel.name}</CardTitle>
                <Button color="primary" onClick={joinChannel} value={channel.name}>Join</Button>
            </CardBody>
        </Card>
    );

    return (
        <div>
            <Row className="justify-content-md-center">
                <Col xs="6">
                    <h1>Join a Channel</h1>
                    <div className="alert alert-success" hidden={!showJoinSuccess} name="successAlert">Success! You joined {channel}.</div>
                    <div className="alert alert-danger" hidden={!showJoinError} name="errorAlert">You are already a member of {channel}.</div>
                    {channelCards}
                </Col>
            </Row>
        </div>
    )
}

export default ChannelSearch;