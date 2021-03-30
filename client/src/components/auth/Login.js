import { useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Social from "./Social";

import { startSessionTimer } from "../../helpers/sessionTimer";
import UserContext from "../../contexts/UserContext";

import styles from "./auth.module.css";

const Login = ({ handleClose, changeModal }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUser } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/authenticate", { email, password });
            const { accessToken, ...user } = response.data;

            setUser(user);
            localStorage.setItem("access-token", accessToken);
            startSessionTimer();

            handleClose();
        } catch (err) {
            const { message } = err.response.data;
            message && alert(message);
        }
    };

    return (
        <Modal className={styles.modal} show={true} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Log in with</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.body}>
                    <Social />
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button block variant="primary" type="submit" onClick={submit}>
                        Sign in
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    New user?{" "}
                    <a href="/#" onClick={() => changeModal("register")}>
                        Sign up
                    </a>{" "}
                    instead.
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default Login;
