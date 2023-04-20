import "./App.css";
import { useState } from "react";
import { SocketProvider } from "./contexts/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";

function App() {
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useLocalStorage("userId", "");
  return (
    <div className="App">
      <Header gameId={gameId} userId={userId} />
      <SocketProvider userId={userId} setUserId={setUserId}></SocketProvider>
    </div>
  );
}

export default App;
