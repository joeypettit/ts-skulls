import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useGameContext } from "../providers/GameProvider";

function ReorderPlayers() {
  const { user, game, actions } = useGameContext();
  const [userAddedToOrderArray, setUserAddedToOrderArray] =
    useState<boolean>(false);

  function handleNextButton() {
    actions.addPlayerToOrderArray();
  }

  useEffect(() => {
    if (game!.playerOrder.includes(user!.id)) {
      setUserAddedToOrderArray(true);
    }
  }, [game!.playerOrder]);

  useEffect(() => {
    setUserAddedToOrderArray(false);
  }, [game!.gamePhase]);

  return (
    <Container className="d-flex flex-column justify-content-center">
      <div className="text-danger">
        <h4>
          The Player to the Left of{" "}
          {game!.getPlayerById(game!.currentPlayerId).name}, Press Next
        </h4>
        {!user!.isPartyLeader && (
          <Button
            size="lg"
            onClick={() => {
              const nextIndexNum = game!.playerOrder.length;
              handleNextButton();
            }}
            disabled={userAddedToOrderArray ? true : false}
          >
            {userAddedToOrderArray ? "Added" : "Next"}
          </Button>
        )}
      </div>
    </Container>
  );
}

export default ReorderPlayers;
