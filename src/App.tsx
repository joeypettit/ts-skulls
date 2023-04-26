import "./App.css";
import { useState } from "react";
import { SocketProvider } from "./socket/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Login from "./components/Login";

function App() {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userName, setUserName] = useLocalStorage("userName", "");

  const headerIsDisplayed = false;

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {headerIsDisplayed && <Header userId={userId} />}
      <SocketProvider userId={userId} setUserId={setUserId}>
        <Welcome userName={userName} />
        <Login />
      </SocketProvider>
    </div>
  );
}

export default App;
