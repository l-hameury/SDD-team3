import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";

const ChannelManage = () => {
    const username = localStorage.getItem('username');
    const [channelList, setChannelList] = useState([]);
    const [showLeaveSuccess, setShowLeaveSuccess] = useState(false);
    const [showLeaveError, setShowLeaveError] = useState(false);
    const [channel, setChannel] = useState("");

    useEffect(() => {
        // Get the list of all channels the user is in
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

    const leaveChannel = (e) => {
        setShowLeaveSuccess(false);
        setShowLeaveError(false);
        setChannel(e.target.value);
        let channelToLeave = e.target.value;

        axios.post("https://localhost:5001/api/user/leaveChannel", {
            Username: username,
            Channels: [e.target.value],
        })
        .then(function(res) {
            setChannelList(channelList.filter((element) => {
                return element !== channelToLeave;
            }));
            setShowLeaveSuccess(true);
        })
        .catch(function(error) {
            setShowLeaveError(true);
        });
    }
    
    let channelCards = channelList.map((channel) =>
        <Card key={channel} className="mb-3">
            <CardBody>
                <CardTitle tag="h5">{channel}</CardTitle>
                <Button color="danger" onClick={leaveChannel} value={channel}>Leave</Button>
            </CardBody>
        </Card>
    );

    return (
        <div>
            <Row className="justify-content-md-center">
                <Col xs="6">
                    <h1>Manage Current Channels</h1>
                    <div className="alert alert-success" hidden={!showLeaveSuccess} name="successAlert">You have left {channel}.</div>
                    <div className="alert alert-danger" hidden={!showLeaveError} name="errorAlert">Error leaving {channel}.</div>
                    {channelCards}
                </Col>
            </Row>
        </div>
    )
}

export default ChannelManage;