import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/SocketProvider";
import { useGameContext } from "../providers/GameStateProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { GamePhase } from "../../models/GamePhase";

export default function GameLobby({ userId }: { userId: string }) {
  const game = useGameContext().game;
  const user = useGameContext().user;
  const actions = useGameContext().actions;

  return (
    <Container className="text-center bg-light p-3 rounded">
      <div className="py-3">Welcome {game?.getPlayerById(userId)?.name}</div>
      <div className="bg-light p-3 rounded">
        <h1>
          Your Game ID is: <strong>{game?.gameId}</strong>
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

      {/* REORDER PLAYERS COMPONENT */}

      <div className="m-2">
        {game?.gamePhase === GamePhase.PlayerReordering && user?.isPartyLeader}
      </div>
    </Container>
  );
}
