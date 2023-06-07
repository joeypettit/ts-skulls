import React from "react";
import UserNameForm from "./UserNameForm";
import EnterGameForm from "./EnterGameForm";

interface Props {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

function PreGameComponents({ userName, setUserName }: Props) {
  return (
    <>
      {!userName && (
        <UserNameForm userName={userName} setUserName={setUserName} />
      )}
      {userName && <EnterGameForm />}
    </>
  );
}

export default PreGameComponents;
