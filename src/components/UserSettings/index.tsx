import React from "react";
import startGameIcon from "../../assets/icon-start-game.png";

interface UserSettingsProps {
  getMineCount: () => void;
  numberOfMinesOnBoard: number;
  numberOfTotalSquares: number;
  numberOfOpenSquares: number;
  numberOfFlaggedSquares: number;
  startGame: () => void;
  isGameStarted: boolean;
}

const UserSettings = (props: UserSettingsProps): JSX.Element => {
  const {
    getMineCount,
    isGameStarted,
    numberOfMinesOnBoard,
    numberOfTotalSquares,
    numberOfOpenSquares,
    numberOfFlaggedSquares,
  } = props;
  return (
    <div>
      <div>
        {!isGameStarted && (
          <div>
            `🚧 Work in progress— click the <b>same</b> square <b>twice</b> to
            begin.`
          </div>
        )}
        {isGameStarted && (
          <div>
            Squares Opened so far: {numberOfOpenSquares}
            <br />
            Squares Flagged so far: {numberOfFlaggedSquares}
            <br />
            Flags left: {numberOfMinesOnBoard - numberOfFlaggedSquares}
            <br />
          </div>
        )}
      </div>
      <br />
      <form
        style={{
          display: "flex",
          justifyContent: "space-around",
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
    </div>
  );
};

export default UserSettings;
