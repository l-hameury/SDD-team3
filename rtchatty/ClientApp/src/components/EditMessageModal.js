import axios from 'axios'
import React, { useState } from 'react'
import {Modal, ModalBody, Button, Input} from 'reactstrap'

const EditMessageModal = ({ text, open, toggle, username, timestamp }) => {
	const [newMsg, setNewMsg] = useState(text)

	const handleChange = (event) => setNewMsg(event.target.value)

	const submitChange = (event) => {
		event.preventDefault()
		axios.post('https://localhost:5001/Chat/editMessage', {
			User: username,
			Message: newMsg,
			Timestamp: timestamp
		})
		.then(function (res){
			console.log(res)
			toggle()
		})
		.catch(function (err){
			console.log(err)
		})
	}

	return(
		<div>
			<Modal isOpen={open} toggle={toggle}>
				<ModalBody>
					<Input defaultValue={text} onChange={handleChange}></Input>
					<Button size="sm" onClick={submitChange}>Submit</Button>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default EditMessageModal