import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useGameContext } from "../providers/GameStateProvider";

function ReorderPlayers() {
  const { user, game, actions } = useGameContext();
  const [userAddedToOrder, setUserAddedToOrder] = useState<boolean>(false);

  function handleReorder() {}

  useEffect(() => {
    setUserAddedToOrder(false);
  }, [game?.gamePhase]);

  return (
    <Container className="d-flex flex-column justify-content-center">
      <div className="text-danger">
        <h4>
          The Player to the Left of{" "}
          {game?.getPlayerById(game?.currentPlayerId)?.name}, Press Next
        </h4>
        {!user?.isPartyLeader && (
          <Button
            size="lg"
            onClick={handleReorder}
            disabled={userAddedToOrder ? true : false}
          >
            {userAddedToOrder ? "Added" : "Next"}
          </Button>
        )}
      </div>
    </Container>
  );
}

export default ReorderPlayers;
