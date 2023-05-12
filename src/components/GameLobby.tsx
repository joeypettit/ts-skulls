import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useGameContext } from "../providers/GameStateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function GameLobby({ userId }: { userId: string }) {
  const game = useGameContext().game;

  return <Container>Welcome {game?.getPlayerById(userId)?.name}</Container>;
}
