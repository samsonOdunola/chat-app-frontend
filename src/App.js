import socketClient from "socket.io-client";
import { useRef, useEffect, useState } from "react";

import Chat from "./components/chat";
function App() {
  let socket = useRef();
  let endpoint = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.current = socketClient(endpoint);
    setLoading(true);
  }, []);
  return <>{loading && <Chat socket={socket} />}</>;
}

export default App;
