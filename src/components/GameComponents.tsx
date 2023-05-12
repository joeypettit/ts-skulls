import GameLobby from "./GameLobby";
import { useGameContext } from "../providers/GameStateProvider";
import { GamePhase } from "../../models/GamePhase";

export default function GameComponents({ userId }: { userId: string }) {
  const game = useGameContext().game;

  return (
    <div>
      {game ? (
        (game.gamePhase === GamePhase.Lobby ||
          game.gamePhase === GamePhase.PlayerReordering) && (
          <GameLobby userId={userId} />
        )
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
