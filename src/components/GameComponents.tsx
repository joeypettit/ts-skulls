import React from "react";
import GameLobby from "./GameLobby";
import { useSocket } from "../providers/SocketProvider";
import { useGameState } from "../providers/GameStateProvider";

export default function GameComponents({ userId }: { userId: string }) {
  const socket = useSocket();
  const gameState = useGameState().gameState;

  return (
    <div>
      {gameState ? (
        (gameState.phase === "game-lobby" ||
          gameState.phase === "players-reordering") && (
          <GameLobby userId={userId} />
        )
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}
