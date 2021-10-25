import moment from 'moment';
import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import defaultProfilePic from "../Assets/Images/defaultProfilePic.png";

// Rendering a message box
const Message = (props) => (
	<div /* style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }} */>
		<Card body>
			<Container>
				<Row noGutters>
					<Col xs="auto">
						<img width="40em" src={props.avatar ? props.avatar : defaultProfilePic} alt="profile pic"></img>
					</Col>
					<Col>
						<CardTitle><small>{moment(props.timestamp).format('LT')}</small> <strong>{props.user}</strong>:</CardTitle>
						<CardText>{props.message}</CardText>
					</Col>
				</Row>
			</Container>
		</Card>
	</div>
)

export default Message;