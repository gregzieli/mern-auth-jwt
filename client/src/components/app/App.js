import { useState, useEffect } from "react";
import axios from "axios";

import UserContext from "../../contexts/UserContext";
import { startSessionTimer, stopSessionTimer } from "../../helpers/sessionTimer";
import Header from "../header/Header";
import Login from "../auth/Login";
import Register from "../auth/Register";
import "./App.css";

const initialUserData = null;

function App() {
    const [currentModal, setCurrentModal] = useState(null);
    const [user, setUser] = useState(initialUserData);

    useEffect(() => checkLoggedIn(), []);

    const checkLoggedIn = async () => {
        const token = localStorage.getItem("access-token");
        if (!token) {
            return;
        }

        const userResponse = await axios.get("/api/users/whoami", {
            headers: { authorization: `Bearer ${token}` },
        });
        // todo: remove from localStorage?

        setUser(userResponse.data.user);
        startSessionTimer();
    };

    const logOut = async () => {
        await axios.put("/api/auth/revoke");
        setUser(null);
        localStorage.setItem("access-token", "");
        stopSessionTimer();
    };

    const noUserComponent = <span onClick={() => setCurrentModal("login")}>Log in / sign up</span>;

    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <ModalRoot currentModal={currentModal} setCurrentModal={setCurrentModal} />
                <Header
                    brand="MERN auth template"
                    authComponent={
                        user ? <span onClick={logOut}>Log out {user.name}</span> : noUserComponent
                    }
                ></Header>
            </UserContext.Provider>
        </div>
    );
}

export default App;

const MODAL_COMPONENTS = {
    login: Login,
    register: Register,
};

const ModalRoot = ({ currentModal, setCurrentModal, setUser }) => {
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
        setUser,
    };

    const SpecificModal = MODAL_COMPONENTS[currentModal];
    return <SpecificModal {...props} />;
};
