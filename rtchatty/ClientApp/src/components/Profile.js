import React from 'react'
import { EditText, EditTextarea } from 'react-edit-text'
import 'react-edit-text/dist/index.css'

const Profile = () => {

  const saveText = (val) => {
    // make post request to update user info
    console.log('Edited Value -> ', val)
  }

  // finish adding image edit and some more user information
	return (
    <React.Fragment>
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