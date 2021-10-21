import React, { useState, useEffect } from "react";
import { Alert, Card, CardFooter } from "reactstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileCard from "./ProfileCard"
import EditModal from "./EditModal";
import PasswordModal from "./PasswordModal";
import SettingsDropdown from "./SettingsDropdown";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    password: "",
    avatar: "",
    bio: "",
    username: "",
    canSearch: false,
    statusShow: false,
    canMessage: false,
    status: ""
  });
  const [currentInfo, setCurrentInfo] = useState({ ...userInfo });
  const [editInfoModal, setEditInfoModal] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [success, setSuccess] = useState("");

  // hook to initialize user information after rendering component
  useEffect(() => {
    // getting token and email to get user from the database
    const loggedInEmail = localStorage.getItem("email");
    axios
      .get("https://localhost:5001/api/user/getUserByEmail", {
        params: {
          email: loggedInEmail,
        },
      })
      .then(function (res) {
        setUserInfo(res.data);
        setCurrentInfo(res.data);
      });
  }, []);

  // to show the update modal for users to edit their information
  const toggleEditInfoModal = () => setEditInfoModal(!editInfoModal);
  const toggleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);
  const togglePasswordModal = () => setPasswordModal(!passwordModal);

  // this resets information upon pressing the X button or the Close button in the Modal
  const resetInfo = () => {
    setUserInfo({ ...currentInfo });
    setSuccess("");
    setEditInfoModal(false);
  };

  return (
    <>
      <Card>
        <ProfileCard user={userInfo}/>
        <CardFooter style={{ textAlign: "right" }}>
          <SettingsDropdown open={settingsDropdown} toggle={toggleSettingsDropdown} editModal={toggleEditInfoModal} pwModal={togglePasswordModal}/>
        </CardFooter>
      </Card>
      <Alert className="rounded" color="success" hidden={!success}>{success}</Alert>

      <EditModal 
      user={userInfo}
      reset={resetInfo}
      toggle={toggleEditInfoModal}
      open={editInfoModal}
      success={setSuccess}
      setUser={setUserInfo}
      />

      <PasswordModal
      user={userInfo}
      toggle={togglePasswordModal}
      open={passwordModal}
      success={setSuccess}
      />
    </>
  );
};

export default Profile;
