import axios from 'axios'
import React, { useState } from 'react'
import {Modal, ModalBody, Button, Input} from 'reactstrap'

const EditMessageModal = (props) => {
	const [newMsg, setNewMsg] = useState(props.text)
	const handleChange = (event) => setNewMsg(event.target.value)

	const submitChange = async (event) => {
		event.preventDefault()
		await axios.post('https://localhost:5001/Chat/editMessage', {
			User: props.username,
			Message: newMsg,
			Timestamp: props.timestamp
		})
		.then(function (){
			props.toggle()
		})
		.catch(function (err){
			console.log(err)
			props.toggle()
		})
	}

	return(
		<div>
			<Modal isOpen={props.open} toggle={props.toggle}>
				<ModalBody>
					<Input defaultValue={props.text} onChange={handleChange}></Input>
					<Button size="sm" onClick={submitChange}>Submit</Button>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default EditMessageModal