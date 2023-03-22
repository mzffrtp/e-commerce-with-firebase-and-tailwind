import React from "react";

/* compponents and pages */
import Products from "../../Components/Products/Products";
import Chat from "../../Components/Chat/Chat";

/* styling*/
import "../../assets/style/general.css"

export default function HomePage() {
    return (
        <div>
           <Products />
           <Chat />
        </div>
    )
}

