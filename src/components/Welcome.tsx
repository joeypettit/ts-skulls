import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

interface Props {
  userName: string;
}

export default function Welcome({ userName }: Props) {
  const [nameInput, setNameInput] = useState<string>("");
  const [showNameInput, setShowNameInput] = useState<boolean>(() => {
    if (userName) return true;
    else return false;
  });

  return (
    <div className="welcome d-flex align-items-center justify-content-center h-100">
      <div>💀💀 & 🌹🌹</div>
      <div>{userName ? `Welcome ${userName}!` : `Please Enter Your Name`}</div>
      <Form>
        <Form.Group>
          <Form.Label>Your Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Name" />
        </Form.Group>
      </Form>
      <Button size="lg">Begin</Button>
    </div>
  );
}
