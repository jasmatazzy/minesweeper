import React from "react";
import startGameIcon from "../../assets/icon-start-game.png";

interface UserSettingsProps {
  getMineCount: () => void;
  numberOfMinesOnBoard: number;
  startGame: () => void;
  isGameStarted: boolean;
}

const UserSettings = (props: UserSettingsProps): JSX.Element => {
  const { getMineCount, isGameStarted, numberOfMinesOnBoard, startGame } =
    props;
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <div>
        <label htmlFor="mine-count">How many mines?:</label>
        <input
          id="mine-count"
          onChange={getMineCount}
          type="number"
          value={numberOfMinesOnBoard}
        ></input>
      </div>
      <div>
        🚧 Work in progress— click the <b>same</b> square <b>twice</b> to begin.
        {/* <label htmlFor="start-game">Press Start ➡:</label>
        <input
          id="start-game"
          alt="Submit"
          height="48"
          name="start-game"
          src={startGameIcon}
          type="image"
          width="48"
          onClick={(event) => {
            event.preventDefault();
            !isGameStarted && startGame();
          }}
        ></input> */}
      </div>
    </form>
  );
};

export default UserSettings;
