import { useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Social from "./Social";

import { startSessionTimer } from "../../helpers/sessionTimer";
import UserContext from "../../contexts/UserContext";

import styles from "./auth.module.css";

const Register = ({ handleClose, changeModal }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUser } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/register", { name, email, password });
            const { accessToken, ...user } = await response.data;

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
                    <Modal.Title>Sign up with</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Social />
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Control type="password" placeholder="Confirm password" />
                    </Form.Group>

                    <Button block variant="primary" type="submit" onClick={submit}>
                        Sign up
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    Already have an account?{" "}
                    <a href="/#" onClick={() => changeModal("login")}>
                        Log in
                    </a>{" "}
                    instead.
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default Register;
