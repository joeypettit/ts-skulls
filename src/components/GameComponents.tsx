import React from "react";
import GameLobby from "./GameLobby";
import { useSocket } from "../providers/SocketProvider";

export default function GameComponents({ userId }: { userId: string }) {
  const socket = useSocket();
  const gamePhase = socket?.gameState?.phase;

  return (
    <div>
      {(gamePhase === "game-lobby" || gamePhase === "players-reordering") && (
        <GameLobby userId={userId} />
      )}
    </div>
  );
}
