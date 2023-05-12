import { useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useGameContext } from "../providers/GameStateProvider";

function EnterGameForm() {
  const game = useGameContext();
  const gameIdRef = useRef<HTMLInputElement | null>(null);

  function handleStartNewGame() {
    game?.actions.createGame();
  }

  function handleEnterGame() {
    game?.actions.enterExistingGame();
  }

  return (
    <div className="bg-light rounded d-flex flex-column align-items-center my-3">
      <Button onClick={handleStartNewGame} className="my-3">
        Start New Game
      </Button>
      <div>Or</div>
      {/* enter existing game with your game id */}
      <Form className="p-2 m-2 text-center" onSubmit={handleEnterGame}>
        <Form.Group>
          <Form.Label>Enter An Existing Game</Form.Label>
          <Form.Control
            type="text"
            ref={gameIdRef}
            required
            placeholder="Enter Game ID"
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-2 me-2">
          Enter
        </Button>
      </Form>
    </div>
  );
}

export default EnterGameForm;
