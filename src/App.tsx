import "./App.css";
import { SocketProvider } from "./providers/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import GameComponents from "./components/GameComponents";
import { GameProvider } from "./providers/GameStateProvider";
import PreGameComponents from "./components/PregameComponents";

function App() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userName, setUserName] = useLocalStorage("userName", "");

  const headerIsDisplayed = false;

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {headerIsDisplayed && <Header userId={userId} />}
      <SocketProvider userId={userId} setUserId={setUserId}>
        <GameProvider userId={userId} userName={userName}>
          <PreGameComponents userName={userName} setUserName={setUserName} />
          <GameComponents userId={userId} />
        </GameProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
