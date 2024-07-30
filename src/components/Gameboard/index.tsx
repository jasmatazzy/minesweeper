import React, { useEffect } from "react";
import Row from "../Row";
import SquareButton from "../../SquareButton";

// import LookUpTable from "../Board";

interface GameboardProps {
  gameboardFlagSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  gameboardMineSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  gameboardOpenSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  handleMainClick: (row: number, column: number) => void;
  handleSquareDoubleClick: (row: number, column: number) => void;
  handleSquareRightClick: (row: number, column: number) => void;
  isGameOver: boolean;
  isGameStarted: boolean;
  isGameWon: boolean;
  numberOfMinesOnBoard: number;
  numberOfNeighborsWhoAreFlags: (row: number, column: number) => number;
  numberOfNeighborsWhoAreMines: {
    [row: number]: { [column: number]: number };
  };
  numberOfRowsOnBoard: number;
  numberOfSquaresOnEachRow: number;
}

const Gameboard = (props: GameboardProps): JSX.Element => {
  const {
    gameboardFlagSquareLocations,
    gameboardMineSquareLocations,
    gameboardOpenSquareLocations,
    handleSquareDoubleClick,
    handleMainClick,
    handleSquareRightClick,
    isGameOver,
    isGameStarted,
    isGameWon,
    numberOfNeighborsWhoAreFlags,
    numberOfNeighborsWhoAreMines,
    numberOfRowsOnBoard,
    numberOfSquaresOnEachRow,
  } = props;

  /* Template board to display to user before they activate live board with first click;
side effect runs while game is not started, when user updates desired number of rows
or columns, or when isGameStarted is set to true; Live board displays on final useEffect update of isGameStarted
 */

  // const isObjectEmpty = (object: {}) => {
  //   if (Object.keys(object).length <= 0) return true;
  //   return false;
  // };

  useEffect(() => {
    if (isGameOver) {
    }
    
  }, [isGameOver]);

  return (
    <div>
      {isGameWon ? (
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGh4aHIwMDk4OGlhbmNpbzU0MDJicjFwb2V6dnI3bzl4MmxjcjNlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0GqH01ZyKwd3aT3G/giphy.gif"
          alt="bojack-is-happy-for-you"
        />
      ) : (
        Array.from({ length: numberOfRowsOnBoard }, (_, rowIndex) => (
          <Row key={rowIndex}>
            {Array.from(
              { length: numberOfSquaresOnEachRow },
              (_, columnIndex) => (
                <SquareButton
                  key={columnIndex}
                  handleMainClick={() => handleMainClick(rowIndex, columnIndex)}
                  handleSquareDoubleClick={() =>
                    handleSquareDoubleClick(rowIndex, columnIndex)
                  }
                  handleSquareRightClick={() =>
                    handleSquareRightClick(rowIndex, columnIndex)
                  }
                  isGameStarted={isGameStarted}
                  isGameOver={isGameOver}
                  isMine={
                    (gameboardMineSquareLocations[rowIndex] &&
                      gameboardMineSquareLocations[rowIndex][columnIndex]) ??
                    false
                  }
                  isSquareOpen={
                    (gameboardOpenSquareLocations[rowIndex] &&
                      gameboardOpenSquareLocations[rowIndex][columnIndex]) ??
                    false
                  }
                  isFlagged={
                    (gameboardFlagSquareLocations[rowIndex] &&
                      gameboardFlagSquareLocations[rowIndex][columnIndex]) ??
                    false
                  }
                  numberOfNeighborsWhoAreMines={
                    numberOfNeighborsWhoAreMines[rowIndex] &&
                    numberOfNeighborsWhoAreMines[rowIndex][columnIndex]
                      ? numberOfNeighborsWhoAreMines[rowIndex][columnIndex]
                      : 0
                  }
                  // optionalText={JSON.stringify(`${numberOfNeighborsWhoAreFlags(rowIndex, columnIndex)}`)}
                />
              )
            )}
          </Row>
        ))
      )}
    </div>
  );
};

export default Gameboard;
