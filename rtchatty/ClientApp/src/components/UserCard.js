import React from 'react'
import { Card, CardBody, CardImg, CardFooter, Button } from "reactstrap";
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

const UserCard = (props) => {
	return (
		<div>
			<Card className="public-card">
				<div>
				<CardImg
					className="rounded-circle"
					style={{ padding: "5px" }}
					onError={(event) => { event.target.src = defaultProfilePic }}
					src={ props.user.avatar ? props.user.avatar : defaultProfilePic }
				/>
				</div>

				<CardBody className="second">
					<h3>{props.user.username}</h3>
					<p>{props.user.status ? props.user.status : 'No Status'}</p>
					<p>{props.user.bio ? props.user.bio : 'Hello, I am new'}</p>
				</CardBody>
				<CardFooter>
					{props.user.canMessage? <Button>Message</Button> : ''}
					<Button color="primary">Add Friend</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default UserCard