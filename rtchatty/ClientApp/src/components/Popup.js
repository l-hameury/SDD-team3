import React from "react";

const Popup = profilePop => {
    return (
        <div className="profile-popup">
            <div className="profile-box">
                <span className="close-icon" onClick={profilePop.handleClose}>x</span>
                <b>Finish Profile</b>
                <p>Please finish your profile by clicking the "Profile" tab after logging in.</p>
            </div>
        </div>
    );
};

export default Popup;

// const Popup = profilePop => {
//     return (
//         <div className="modal fade" id="modal-login-profile" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
//             aria-labelledby="modal-login-profile-title" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-scrollable modal-lg">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="modal-login-profile-title">Finish Profile!</h5>
//                     </div>
//                     <div className="modal-body" id="modal-login-profile-body">Please finish your profile by clicking the "Profile" tab after logging in.</div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Popup;

// class Popup extends React.Component {
//     handleClose = () => {
//         this.props.toggle();
//     };

//     render() {
//         return (
//             <div className="modal" id="modal">
//                 <h5>Finish Profile!</h5>
//                 <p>Please finish your profile by clicking the "Profile" tab after logging in.</p>
//                 <div className="actions">
//                     <button className="toggle-button" onClick={this.handleClose}>
//                         Close
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Popup;