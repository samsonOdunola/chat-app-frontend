// import socketClient from "socket.io-client";
import io from "socket.io-client";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import Chat from "./components/chat";
const socket = io(process.env.REACT_APP_ENDPOINT);
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [chatIsVisisble, setChatIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  // let socket = useRef();
  // let endpoint = process.env.REACT_APP_LOCALENDPOINT;
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("connected", socket.connected);
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
    // socket.current = socketClient(endpoint);
    // setLoading(true);
  }, [isConnected]);
  useEffect(() => {
    socket.on("broadcast_msg", ({ user, message }) => {
      console.log(user, message);
      console.log("socket working");
      const msg = `${user} send:${message}`;

      setMessages((prevState) => [msg, ...prevState]);
      console.log(messages);
    });
  }, [socket]);
  const handleEnterChatRoom = () => {
    if (user !== "" && room !== "") {
      setChatIsVisible(true);
      socket.emit("join_room", { user, room });
    }
  };

  const handleSendMessage = () => {
    const newMsgData = { room: room, user: user, message: newMessage };

    socket.emit("send_msg", newMsgData);
    const msg = `${user} send:${newMessage}`;
    setNewMessage((prevState) => [msg, ...prevState]);
    setNewMessage("");
  };

  return (
    <>
      {chatIsVisisble ? (
        <Chat
          room={room}
          user={user}
          handleSendMessage={handleSendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messages={messages}
          v4={v4}
        />
      ) : (
        <div className="enter-details">
          <h1>
            Input your name and chat room you wish to join, you can also create
            a new room{" "}
          </h1>
          <input
            type="text"
            placeholder="Enter name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />{" "}
          <br></br>
          <button onClick={() => handleEnterChatRoom()}> Enter</button>
          <p>
            Designed and coded by <strong>Samson Odunola</strong>{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
