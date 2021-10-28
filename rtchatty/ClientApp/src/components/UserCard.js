import React from 'react'
import { CardBody, CardImg, Button } from "reactstrap";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

const UserCard = (props) => {
	return (
		<div>
			<CardImg
				className="rounded-circle"
				style={{ padding: "5px" }}
				onError={(event) => { event.target.src = defaultProfilePic }}
				src={props.user.avatar ? props.user.avatar : defaultProfilePic}
			/>
			<CardBody className="second">
				<h3>{props.user.username}</h3>
				<p>{props.user.statusShow ? props.user.status : 'No Status'}</p>
				<p>{props.user.bio ? props.user.bio : 'Hello, I am new'}</p>
			</CardBody>
			<CardBody style={{ textAlign: "center" }}>
				{props.user.canMessage ? <Button>Message</Button> : ''}
				<Button color="primary">Add Friend</Button>
			</CardBody>
		</div>
	)
}

export default UserCard