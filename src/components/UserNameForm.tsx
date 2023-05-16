import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface Props {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

function UserNameForm({ userName, setUserName }: Props) {
  const userNameInputRef = useRef<HTMLInputElement | null>(null);

  function handleChangeName() {
    if (userNameInputRef.current) {
      const newUserName = userNameInputRef.current.value;
      setUserName(newUserName);
    }
  }

  return (
    <div className="text-center">
      {userName && (
        <div>
          <h1>Welcome {userName}</h1>
          <Button variant="secondary" onClick={() => setUserName("")}>
            Change Name
          </Button>
        </div>
      )}
      {!userName && (
        <div>
          <h1>Please Enter Your Name:</h1>
          <Form className="p-2 m-2 text-center" onSubmit={handleChangeName}>
            <Form.Group>
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="text"
                ref={userNameInputRef}
                required
                placeholder="Enter Your Name"
              />
            </Form.Group>
            <Button type="submit" className="mt-2 me-2">
              Enter
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default UserNameForm;
