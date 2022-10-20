import { FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
const Chat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  // const [currentId, setCurrentId] = useState("");
  const [postMessage, setPostMessage] = useState("");
  // socket.current.on("user_id", (userid) => {
  //   setCurrentId(userid);
  //   console.log(userid);
  // });
  const sendMessage = () => {
    setPostMessage(message);
    socket.current.emit("sendMsg", message);
  };
  useEffect(() => {
    socket.current.on("broadCastMsg", (recivedMessage) => {
      let placeHolder = [...allMessage];
      placeHolder.push(recivedMessage);

      setAllMessage(placeHolder);
    });
  }, [postMessage]);

  return (
    <div className="App">
      <div className="header">
        <h1>Chat Room</h1>
      </div>
      <div className="chatbody">
        {allMessage.map((message, index) => {
          return (
            <p className="chatmsg" key={index}>
              {message}
            </p>
          );
        })}
      </div>
      <div className="input">
        <div>
          <input
            value={message}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
          />{" "}
          <FiSend
            className="button"
            onClick={() => {
              sendMessage();
              setMessage("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
