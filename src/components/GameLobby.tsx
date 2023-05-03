import React, { useState, useEffect } from "react";
import { useSocket } from "../socket/SocketProvider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function GameLobby({ userId }: { userId: string }) {
  return (
    <Container>
      <div className="py-3">
        <h1>Welcome {getPlayerName()}!</h1>
      </div>
      <div className="bg-light p-3 rounded">
        <h1>
          Your Game ID is: <strong>{gameId}</strong>
        </h1>
        {userId === gameState.players[0].playerId ? (
          <h4>You are the game owner</h4>
        ) : (
          <h4>{gameState.players[0].name} is the game owner</h4>
        )}
      </div>
      <p className="col p-3">
        Ask other players navigate to URL and Enter Game using the Game ID
        above.
      </p>
      <ReorderPlayers gameState={gameState} userId={userId} />
      <div className="d-flex flex-column align-items-center bg-light rounded mx-5 my-3">
        <div className="m-2">
          {!gameState.playersReordering &&
            userId === gameState.players[0].playerId && (
              <Button onClick={initiatePlayerReorder}>Re-order Players</Button>
            )}
          {gameState.playersReordering &&
            userId === gameState.players[0].playerId && (
              <Button onClick={initiatePlayerReorder}>Cancel ReOrder</Button>
            )}
        </div>
        <p>Order Of Play:</p>
        <ul>
          {gameState.players.map((player, index) => {
            return <li key={index}>{index + 1 + ": " + player.name}</li>;
          })}
        </ul>
      </div>
      {userId === gameState.players[0].playerId ? (
        <div>
          <div>When the group is ready, press "Ready"</div>
          <Button
            disabled={gameState.playersReordering ? true : false}
            onClick={() => handleReadyToPlay()}
          >
            Ready
          </Button>
        </div>
      ) : (
        <div>
          When the group is ready, {gameState.players[0].name} will press
          "Ready"
        </div>
      )}
    </Container>
  );
}
