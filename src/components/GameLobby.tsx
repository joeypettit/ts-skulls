import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useGameState } from "../providers/GameStateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function GameLobby({ userId }: { userId: string }) {
  const socket = useSocket();
  const gameState = useGameState().gameState;

  return (
    <Container>Welcome {gameState?.getPlayerById(userId)?.name}</Container>
  );
}
