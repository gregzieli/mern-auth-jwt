import { useState } from "react";

import Header from "../header/Header";
import Login from "../auth/Login";
import Register from "../auth/Register";
import "./App.css";

const initialUserData = {
  token: null,
  user: null,
};

function App() {
  const [currentModal, setCurrentModal] = useState(null);
  const [userData, setUserData] = useState(initialUserData);

  const logOut = () => {
    setUserData({
      token: null,
      user: null,
    });
    localStorage.setItem("auth-token", "");
  };

  const noUserComponent = (
    <span onClick={() => setCurrentModal("login")}>Log in / sign up</span>
  );

  return (
    <div className="App">
      <ModalRoot
        currentModal={currentModal}
        setCurrentModal={setCurrentModal}
        setUserData={setUserData}
      />
      <Header
        brand="Auth template"
        authComponent={
          userData.user ? (
            <span onClick={logOut}>Log out {userData.user.name}</span>
          ) : (
            noUserComponent
          )
        }
      ></Header>
    </div>
  );
}

export default App;

const MODAL_COMPONENTS = {
  login: Login,
  register: Register,
};

const ModalRoot = ({ currentModal, setCurrentModal, setUserData }) => {
  if (!currentModal) {
    return null;
  }

  const handleClose = () => {
    setCurrentModal(null);
  };
  const changeModal = (modal) => {
    setCurrentModal(modal);
  };

  const props = {
    handleClose,
    changeModal,
    setUserData,
  };

  const SpecificModal = MODAL_COMPONENTS[currentModal];
  return <SpecificModal {...props} />;
};
