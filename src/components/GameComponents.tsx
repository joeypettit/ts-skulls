import GameLobby from "./Lobby";
import { useGameContext } from "../providers/GameProvider";
import { GamePhase } from "common-models";

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
