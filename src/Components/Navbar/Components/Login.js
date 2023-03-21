import React, { useState } from "react";

/* bootstap styling */
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from "react-bootstrap";

/*pages and components */
import GeneralModal from "../../GeneralModal";
import Navbar from "../Navbar";

/* redux */
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../../../redux/actionTypes/actionTypes";

/* routing */
import { useNavigate } from "react-router-dom";

/* firebase */
import { auth, providerGoogle, userInfo } from "../../../firebase/FirebaseConfiq";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Login() {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    const [errorModal, setErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault();

        // validation of form
        if (form.fullname === "" || form.email === "" || form.password === "") {
            setErrorModal(true)
        }

        // handle email/password authentication on farebase
        const auth = getAuth();
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredentials) => {
            const userInforef = collection(userInfo, "userInfo");
            addDoc(userInforef, {
                fullname: form.fullname,
                email: form.email,
                password: form.password,
                logedIn: serverTimestamp(),
            })

                .then((res) =>{
                    setSuccessMessage(true)
                    dispatch({
                        type:actionTypes.loginActions.LOGIN_SUCCESS})
                })
                .catch((e) => {
                    setErrorModal(true)
                    console.log(e);
                })
        })
        .catch((err) => {
            console.log(err.message);
            setErrorModal(true)
        })
    }
    return (
        <Container>
            <Navbar />
            <Container className="my-5" style={{ backgroundColor: "azure" }}>
                <Row className="justify-content-center">
                    <Col>
                        <h3 className="text-center my-2"> Login</h3>
                        <Form>
                            <Form.Group className="mb-2" controlId="fullname">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    value={form.fullname}
                                    onChange={(e) => {
                                        setForm({
                                            ...form, fullname: e.target.value
                                        })
                                    }}
                                    type="text" placeholder="pls write your name and lastname ..." />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={form.email}
                                    onChange={(e) => {
                                        setForm({
                                            ...form, email: e.target.value
                                        })
                                    }}
                                    type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={form.password}
                                    onChange={(e) => {
                                        setForm({
                                            ...form, password: e.target.value
                                        })
                                    }}
                                    type="password" placeholder="pls write your password ..." />
                            </Form.Group>
                            <Container className="d-flex justify-content-center">
                                <Button
                                    onClick={handlelogin}
                                    variant="outline-success"
                                    className="btn justify-content-end w-25 mb-3">
                                    Login
                                </Button>
                            </Container>
                        </Form>
                        {
                            errorModal && (
                                <GeneralModal
                                    title="Error"
                                    content="All the fields must be filled correctly or the user is not signed up yet!"
                                    clsBtnTxt="Pls try again"
                                    clsBtnClck={() => {
                                        setErrorModal(false)
                                        setForm("")
                                    }}
                                />
                            )
                        }
                        {
                            successMessage && (
                                <GeneralModal
                                    title="Signup Successful"
                                    content="You will now get automatically redirected to home page"
                                    clsBtnTxt="To Login"
                                    clsBtnClck={() => {
                                        setSuccessMessage(false)
                                        navigate("/")
                                    }}
                                />
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}