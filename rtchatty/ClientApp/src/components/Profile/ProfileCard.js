import React from 'react'
import { Card, CardBody, CardImg, CardText, ListGroup, ListGroupItem, Row, Col} from "reactstrap";
import defaultProfilePic from "../../Assets/Images/defaultProfilePic.png";

const ProfileCard = (props) => {
	return (
    	<Card>
        	<Row>
            	<Col xs="3">
              		<CardImg
                	className="rounded-circle"
                	style={{ padding: "5px" }}
                	onError={(event) => { event.target.src = defaultProfilePic }}
                	src={ props.user.avatar ? props.user.avatar : defaultProfilePic }
              		/>
            	</Col>
            	<Col xs="9">
              		<Row>
                		<CardBody>
                  			<ListGroup>
                    			<ListGroupItem style={{ display: "inherit" }}>
                      				<Col xs="2"> Username: </Col>
                      				<Col style={{ textAlign: "right" }}>
                        				<strong> <CardText id="userName" name="userName"> {props.user.username}</CardText> </strong>
                      				</Col>
                    			</ListGroupItem>
                    			<ListGroupItem style={{ display: "inherit" }}>
                      				<Col xs="2"> Email: </Col>
                      				<Col style={{ textAlign: "right" }}>
                        				<strong> <CardText id="email" name="email"> {props.user.email}</CardText> </strong>
                      				</Col>
                    			</ListGroupItem>
                    			<ListGroupItem style={{ display: "inherit" }}>
                      				<Col xs="2"> Status: </Col>
                      				<Col style={{ textAlign: "right" }}>
                        				<strong> <CardText id="status" name="status">{props.user.status}</CardText> </strong>
                      				</Col>
                    			</ListGroupItem>
                  			</ListGroup>
                		</CardBody>
              		</Row>
              		<Row>
                		<CardBody>
                  			<CardText name="bio"> {props.user.bio ? props.user.bio : "Hello"} </CardText>
                		</CardBody>
              		</Row>
            	</Col>
          	</Row>
        </Card>

	)
}

export default ProfileCard