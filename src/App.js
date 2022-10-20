import socketClient from "socket.io-client";
import { useRef, useEffect, useState } from "react";

import Chat from "./components/chat";
function App() {
  let socket = useRef();
  let endpoint = process.env.REACT_APP_ENDPOINT;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.current = socketClient(endpoint);
    setLoading(true);
  }, []);
  return <>{loading && <Chat socket={socket} />}</>;
}

export default App;
