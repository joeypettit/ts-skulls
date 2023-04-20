import "./App.css";
import { useState } from "react";
import { SocketProvider } from "./contexts/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

function App() {
  const [gameId, setGameId] = useState<string>("");
  const [userId, setUserId] = useLocalStorage("userId", "");

  const headerIsDisplayed = false;

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {headerIsDisplayed && <Header gameId={gameId} userId={userId} />}
      <SocketProvider userId={userId} setUserId={setUserId}>
        <Welcome />
      </SocketProvider>
    </div>
  );
}

export default App;
