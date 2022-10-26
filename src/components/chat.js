import { FiSend } from "react-icons/fi";

const Chat = ({
  room,
  user,
  handleSendMessage,
  newMessage,
  setNewMessage,
  messages,
  v4,
}) => {
  // const [message, setMessage] = useState("");
  // const [allMessage, setAllMessage] = useState([]);
  // const [currentId, setCurrentId] = useState("");
  // const [postMessage, setPostMessage] = useState("");
  // socket.current.on("user_id", (userid) => {
  //   setCurrentId(userid);
  //   console.log(userid);
  // });
  // const sendMessage = () => {
  //   // setPostMessage(message);
  //   socket.current.emit("sendMsg", message);
  // };
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("broadCastMsg", (recivedMessage) => {
  //       console.log(recivedMessage);
  //       console.log(allMessage);
  //       let placeHolder = [...allMessage, recivedMessage];
  //       setAllMessage(placeHolder);
  //     });
  //   }
  // }, [message]);

  return (
    <div className="App">
      <div className="header">
        <h1>
          Room:{room} | User:{user}
        </h1>
      </div>
      <div className="chatbody">
        {messages.map((el, index) => {
          // return (
          //   <p className="chatmsg" key={index}>
          //     {el}
          //   </p>
          // );
          if (el.split(" ")[0] === user) {
            return (
              <p
                className="chatmsg"
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "rgb(24, 24, 24)",
                }}
                key={v4()}
              >
                {el.split(":")[1]}
              </p>
            );
          } else {
            return (
              <p
                className="chatmsg"
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "#016a53",
                }}
                key={v4()}
              >
                {el.split(":")[1]}
              </p>
            );
          }
        })}
        {/* {messages.map((message, index) => {
          return (
            <p className="chatmsg" key={index}>
              {message}
            </p>
          );
        })} */}
      </div>
      <div className="input">
        <div>
          <input
            value={newMessage}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setNewMessage(e.target.value)}
          />{" "}
          <FiSend className="button" onClick={() => handleSendMessage()} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
