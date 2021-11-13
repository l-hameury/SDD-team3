import axios from 'axios'
import React, { useState } from 'react'
import {Modal, ModalBody, Button, Input} from 'reactstrap'

const EditMessageModal = (props) => {
	const [newMsg, setNewMsg] = useState(props.text)
	const handleChange = (event) => setNewMsg(event.target.value)

	const submitChange = async (event) => {
		event.preventDefault()
		try{
			await axios.post('https://localhost:5001/Chat/editMessage', {
				User: props.username,
				Message: newMsg,
				Timestamp: props.timestamp,
				Likes: props.likes,
				Dislikes: props.dislikes,
			})
			props.toggle()
		}
		catch (error){
			console.log(error)
		}
	}

	const submitDelete = async (event) => {
		event.preventDefault()
		try{
			await axios.delete('https://localhost:5001/Chat/deleteMessage', {
				data: {
					User: props.username,
					Message: props.text,
					Timestamp: props.timestamp
				}
			})
			props.toggle()
		}
		catch (error){
			console.log(error)
		}
	}

	return(
		<div>
			<Modal isOpen={props.open} toggle={props.toggle}>
				<ModalBody>
					<Input defaultValue={props.text} onChange={handleChange}></Input>
					<Button size="sm" onClick={submitChange}>Submit</Button>
					<Button size="sm" color="danger" onClick={submitDelete}>Delete</Button>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default EditMessageModal