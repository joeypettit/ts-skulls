import "./App.css";
import { SocketProvider } from "./providers/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import GameComponents from "./components/GameComponents";
import { GameProvider } from "./providers/GameProvider";
import PreGameComponents from "./components/PreGameComponents";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [gameHasStarted, setGameHasStarted] = useState<boolean>(false);

  const headerIsDisplayed = false;

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {headerIsDisplayed && <Header userId={userId} />}
      <SocketProvider userId={userId} setUserId={setUserId}>
        <GameProvider
          userId={userId}
          userName={userName}
          setGameHasStarted={setGameHasStarted}
        >
          {!gameHasStarted && (
            <PreGameComponents userName={userName} setUserName={setUserName} />
          )}
          {gameHasStarted && <GameComponents userId={userId} />}
        </GameProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
