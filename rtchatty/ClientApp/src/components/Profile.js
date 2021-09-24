import React from 'react'
import { EditText, EditTextarea } from 'react-edit-text'
import axios from 'axios';
import 'react-edit-text/dist/index.css'
const Profile = () => {

  const saveText = async (val) => {
    // post request to update user info
    // i hardcoded some information to test but it works lol
    // just need this component to have user information (from props im assuming)
    // so that we can pass that information into the api request
    await axios.post('https://localhost:5001/api/user/update', {
      id: "614b76b07a03a7bb696e0a1d",
      avatar: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      bio: "kris smells"
    })
    .then(function (res){
      console.log(res)
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log('Edited Value -> ', val)
  }

	return (
    <React.Fragment>
      <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="cat" style={{marginLeft:"25%", marginRight: "25%"}}/>
      <div style={{whiteSpace: 'nowrap'}}>
        <strong><label className="mr-2">Username:</label></strong>
        <EditText id="userName" name="userName" defaultValue="username from props would be here" inline onSave={saveText}/>
      </div>
      <div style={{whiteSpace: 'nowrap'}}>
        <strong><label className="mr-2">Email:</label></strong>
        <EditText id="email" name="email" defaultValue="email from props would be here" inline onSave={saveText}/>
      </div>

      <div style={{ display: 'flex' }}>
        <strong>
          <label className='mr-2' style={{ paddingTop: '2px' }}>Bio: </label>
        </strong>
        <EditTextarea
          name='description'
          rows={4}
          style={{ paddingTop: 0 }}
          placeholder='load users bio from props here'
          onSave={saveText}
        />
      </div>
    </React.Fragment>
		);
}

export default Profile