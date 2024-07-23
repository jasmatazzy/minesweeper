import React, { useEffect } from "react";
import Row from "../Row";
import Square from "../../Square";
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
  handleSquareRightClick: (
    event: React.MouseEvent<HTMLElement>,
    row: number,
    column: number
  ) => void;
  isGameOver: boolean;
  isGameStarted: boolean;
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
      console.log(`game over`);
    }
  }, [isGameOver]);

  return (
    <div>
      {Array.from({ length: numberOfRowsOnBoard }, (_, rowIndex) => (
        <Row key={rowIndex}>
          {Array.from(
            { length: numberOfSquaresOnEachRow },
            (_, columnIndex) => (
              <Square
                key={columnIndex}
                handleMainClick={() => handleMainClick(rowIndex, columnIndex)}
                handleSquareDoubleClick={() =>
                  handleSquareDoubleClick(rowIndex, columnIndex)
                }
                handleSquareRightClick={(
                  event: React.MouseEvent<HTMLElement>
                ) => handleSquareRightClick(event, rowIndex, columnIndex)}
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
      ))}
    </div>
  );
};

export default Gameboard;
