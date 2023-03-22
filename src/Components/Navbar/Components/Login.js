import React, { useState } from "react";

/* bootstap styling */
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Button } from "react-bootstrap";

/*pages and components */
import GeneralModal from "../../GeneralModal";

/* redux */
import { useDispatch, useSelector} from "react-redux";
import actionTypes from "../../../redux/actionTypes/actionTypes";

/* routing */
import { useNavigate } from "react-router-dom";

/* firebase */
import { userInfo } from "../../../firebase/FirebaseConfiq";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Login() {
    const {loginState} = useSelector((state)=>state)
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
        .then((res) => {
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
                        type:actionTypes.loginActions.LOGIN_SUCCESS,
                    payload:form})
                })
                .catch((e) => {
                    setErrorModal(true)
                    console.log(e);
                })
                console.log(auth)
        })
        .catch((err) => {
            console.log(err.message);
            setErrorModal(true)
        })
    }
    return (
        <Container>
            <Container className="my-5" >
                <Row className="justify-content-center">
                    <Col sm xl="6"
                    style={{ backgroundColor: "azure" }}>
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
                                        setForm({...form,
                                        fullname: "",
                                        email: "",
                                        password: ""})
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