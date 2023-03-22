import React, { useEffect, useState } from "react";

/* styling */
import chatIcon from "../../assets/imgs/chat.gif";
import close from "../../assets/imgs/close.png"
import "../../assets/style/chat.css";

/* pages and components*/
import GeneralModal from "../GeneralModal";

/* firebase */
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { messages, auth } from "../../firebase/FirebaseConfiq";

const Chat = () => {
    const [showChat, setShowChat] = useState(false)
    const [newMsg, setNewMsg] = useState(null);
    const [errorModal, setErrorModal] = useState(false);
    const [customerMessages, setCustomerMessages] = useState([])
    const messagesRef = collection(messages, "messages")


    const openChat = () => {
        setShowChat(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newMsg);
        if (!newMsg) { setErrorModal(true) }
        addDoc(messagesRef, {
            text: newMsg,
            user: auth.currentUser.displayName,
            createdAt: serverTimestamp()

        })
        setNewMsg("")
    }
    useEffect(() => {
        const queryMesssage = query(
            messagesRef,
            orderBy("createdAt")
        )

        onSnapshot(queryMesssage,(snapshot)=>{
            let comingMessages = []
            snapshot.forEach((doc)=>{
                comingMessages.push({...doc.data(), id:doc.id})
        });
        setCustomerMessages(comingMessages)
    });
},[]);
    return (
        <div className="chatboxwrapper">
            <div className="chatbox"
                onClick={openChat}>
                <h5>Any questions?</h5>
                <img src={chatIcon} alt="" />
            </div>
            <div>
                {
                    showChat && (
                        <div className="chatRoomWrapper">
                            <div className="chatRoom">
                                <p className="text-center"
                                    style={{ color: "crimson" }}>
                                    Wellcome to chatroom for €-handel❣️</p><p className="text-center">
                                    <strong>Please write your inquiry!</strong>
                                </p>
                                <hr></hr>
                                <div className="closeBtn">
                                    <img src={close} alt="" /></div>
                            </div>
                            <div>
                                {
                                    customerMessages.map((message) =>{
                                        <p key={message.id}>{message.text}</p>
                                    })
                                }
                            </div>
                            <div className="chatInput">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        value={newMsg}
                                        onChange={(e) => setNewMsg(e.target.value)}
                                        placeholder="pls write your text..."></input>
                                    <button
                                        type="submit"
                                        className="sendBtn" >Send</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                errorModal && (
                    <GeneralModal
                        title="Error"
                        content="Please write your quiry in the text section below"
                        clsBtnTxt="Pls try again"
                        clsBtnClck={() => {
                            setErrorModal(false)
                        }}
                    />
                )
            }
        </div>
    )
}

export default Chat