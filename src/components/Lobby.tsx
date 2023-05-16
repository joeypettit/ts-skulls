import { useGameContext } from "../providers/GameStateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { GamePhase } from "../modelsClient/GamePhase";
import ReorderPlayers from "./ReorderPlayers";

function GameLobby({ userId }: { userId: string }) {
  const { game, user, actions } = useGameContext();

  function handleToggleReorder(): void {
    actions.toggleReorder();
  }

  function handleReadyToPlay(): void {
    actions.startGame();
  }

  return (
    <Container className="text-center bg-light p-3 rounded">
      <div className="py-3">Welcome {game?.getPlayerById(userId)?.name}</div>
      <div className="bg-light p-3 rounded">
        <h1>
          Your Game ID is: <strong>{game?.id}</strong>
        </h1>
        {user?.isPartyLeader ? (
          <h4>You are the party leader!</h4>
        ) : (
          <h4>{game?.partyLeader.name} is the party leader!</h4>
        )}
      </div>
      <p className="col p-3">
        Ask other players navigate to URL and Enter Game using the Game ID
        above.
      </p>

      {game?.gamePhase === GamePhase.PlayersReordering && <ReorderPlayers />}

      <div className="m-2">
        {!(game?.gamePhase === GamePhase.PlayersReordering) &&
          user?.isPartyLeader && (
            <Button onClick={handleToggleReorder}>Re-order Players</Button>
          )}
        {game?.gamePhase === GamePhase.PlayersReordering &&
          user?.isPartyLeader && (
            <Button onClick={handleToggleReorder}>Cancel ReOrder</Button>
          )}
      </div>
      <p>Order Of Play:</p>
      <ul>
        {game?.playerOrder.map((playerId, index) => {
          const playerName = game.players.get(playerId)?.name;
          const playerOrderNum = index + 1;
          return <li key={playerId}>{playerOrderNum + ": " + playerName}</li>;
        })}
      </ul>

      {user?.isPartyLeader ? (
        <div>
          <div>When the group is ready, press "Start"</div>
          <Button
            disabled={
              game?.gamePhase === GamePhase.PlayersReordering ? true : false
            }
            onClick={() => handleReadyToPlay()}
          >
            Start
          </Button>
        </div>
      ) : (
        <div>
          When the group is ready, {game?.partyLeader.name} will press "Start"
        </div>
      )}
    </Container>
  );
}

export default GameLobby;
