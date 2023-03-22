import React, {useState} from "react";

/* routing */
import { Link, useNavigate } from "react-router-dom";

/* redux state management */
import { useSelector } from "react-redux";

/* bootstarp-react styling */
import logo from "../../assets/imgs/logo.png"
import cart from "../../assets/imgs/cart.gif"
import "../../assets/style/nav.css";

/* firebase */
import { auth } from "../../firebase/FirebaseConfiq";
import { getAuth, signOut } from "firebase/auth";

/*pages and components */
import GeneralModal from "../GeneralModal";

/* redux */
import { useDispatch} from "react-redux";
import actionTypes from "../../redux/actionTypes/actionTypes";

const Navbar = () => {
    const { loginState } = useSelector((state) => state)
    const [errorModal, setErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handlesignout = (e) =>{
        e.preventDefault()

           // handle sign out authentication on farebase
           const auth = getAuth();
           signOut(auth)
           .then((res)=>{
            setSuccessMessage(true)
            dispatch({type:actionTypes.loginActions.LOGOUT})
            navigate("/")
           })
    }

    return (
        <div className="navWrapper d-flex justify-content-between"
            style={{ backgroundColor: "pink" }}>
            <div className="logoWrapper"
            onClick={()=>{navigate("/")}}>
                <div>
                    <img
                        style={{ width: "80px" }} src={logo} alt="" />
                </div>
                <div className="logoName text-center">
                    <p
                        style={{ fontSize: "1.8rem", fontWeight:"bolder" }}><span style={{ color: "red" }}>€</span>-🖐@L</p>
                </div>
            </div>
            <div className="d-flex gap-3">
                <Link
                    style={{
                        textDecoration: "none",
                        color: "black", fontSize: "1rem"
                    }}
                    className=" btn mt-3 w-50 text-center"
                    to="/cart"><img
                        style={{ width: "60px", marginRight:"10px" }}
                        src={cart} alt=""></img>Cart</Link>
                {

                    loginState.success ? (
                        <div className="d-flex justify-content-center">
                            <div>
                                <p className="text-center mt-3">\^_^/ Hi! <strong>{auth.currentUser.displayName}</strong></p>
                            </div>
                            <div>
                                <Link
                                onClick={handlesignout}
                                    className="btn btn-dark mt-2"
                                    to="/signup">Sign out</Link>
                            </div>

                        </div>
                    ) : (
                        <>
                            <Link
                                className=" btn btn-outline-dark mt-3"
                                to="/signup"> Sign Up</Link>
                            <Link
                                className=" btn btn-outline-info mt-3"
                                to="/login"> Login</Link>
                        </>
                    )
                }
            </div>
            {
                            errorModal && (
                                <GeneralModal
                                    title="Error"
                                    content="An error occured when signing out!"
                                    clsBtnTxt="Pls try again"
                                    clsBtnClck={() => {
                                        setErrorModal(false)
                                    }}
                                />
                            )
                        }
                        {
                            successMessage && (
                                <GeneralModal
                                    title="Sign out Successful"
                                    content="You will now get automatically redirected to home page"
                                    clsBtnTxt="To Home Page"
                                    clsBtnClck={() => {
                                        setSuccessMessage(false)
                                        navigate("/")
                                    }}
                                />
                            )
                        }
        </div>

    )
}

export default Navbar