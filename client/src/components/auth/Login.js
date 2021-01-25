import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Social from "./Social";

import styles from "./auth.module.css";

const Login = ({ handleClose, changeModal, setUserData }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("/#", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: { email, password },
      // });
      // const data = response.json();
      const data = { token: "token", user: { name: email } };

      setUserData({
        token: data.token,
        user: data.user,
      });
      localStorage.setItem("auth-token", data.token);
      handleClose()
    } catch (err) {
      err.response.data.msg && console.error(err.response.data.msg);
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
