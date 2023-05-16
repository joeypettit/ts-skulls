import GameLobby from "./Lobby";
import { useGameContext } from "../providers/GameStateProvider";
import { GamePhase } from "../modelsClient/GamePhase";

export default function GameComponents({ userId }: { userId: string }) {
  const { game } = useGameContext();

  return (
    <div>
      {game &&
        (game?.gamePhase === GamePhase.Lobby ||
          game?.gamePhase === GamePhase.PlayersReordering) && (
          <GameLobby userId={userId} />
        )}
    </div>
  );
}
