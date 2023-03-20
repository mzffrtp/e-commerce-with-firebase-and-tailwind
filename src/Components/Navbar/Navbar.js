import React from "react";

/* routing */

import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link
            className="btn btn-outline-warning mx-3 w-25"
            to={"signup"}> Sign Up</Link>
           <Link
            className="btn btn-outline-info mx-3 w-25"
            to={"login"}> Login</Link>
        </div>
    )
}

export default Navbar