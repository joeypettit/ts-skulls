import "./App.css";
import { useState } from "react";
import { SocketProvider } from "./socket/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import UserNameForm from "./components/UserNameForm";
import EnterGameForm from "./components/EnterGameForm";
import GameComponents from "./components/GameComponents";

function App() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userName, setUserName] = useLocalStorage("userName", "");

  const headerIsDisplayed = false;

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {headerIsDisplayed && <Header userId={userId} />}
      <SocketProvider userId={userId} setUserId={setUserId} userName={userName}>
        <UserNameForm userName={userName} setUserName={setUserName} />
        {userName && <EnterGameForm />}
        <GameComponents userId={userId} />
      </SocketProvider>
    </div>
  );
}

export default App;
