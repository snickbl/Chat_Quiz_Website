import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ReadyForQuiz from './ReadyForQuiz'

const ChatBox = () => {
  const [user] = useAuthState(auth);
  const history = useNavigate();

  if (!user) {
    history("/login");
  } else {
  }

  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="quiz">
        <ReadyForQuiz/>
      </div>
      <div className="messanger">
        <div className="messages">
          <div className="messages-wrapper">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </div>

        <span ref={scroll}></span>
        <SendMessage scroll={scroll} />
      </div>

      {/* <button style={{height:'50px', width:'50px'}} onClick={handleButtonClick}>slovo</button> */}
    </main>
  );
};
export default ChatBox;
