import React, { useEffect } from "react";
import Row from "../Row";
import Square from "../../Square";
// import LookUpTable from "../Board";

interface GameboardProps {
  gameboardMineSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  gameboardOpenSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  handleClick: (row: number, column: number) => void;
  isGameOver: boolean;
  isGameStarted: boolean;
  numberOfMinesOnBoard: number;
  numberOfNeighborsWhoAreMines: {
    [row: number]: { [column: number]: number };
  };
  numberOfRowsOnBoard: number;
  numberOfSquaresOnEachRow: number;
}

const Gameboard = (props: GameboardProps): JSX.Element => {
  const {
    gameboardMineSquareLocations,
    gameboardOpenSquareLocations,
    handleClick,
    isGameOver,
    isGameStarted,
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
                handleClick={() => handleClick(rowIndex, columnIndex)}
                isGameStarted={isGameStarted}
                isGameOver={isGameOver}
                isMine={
                  (gameboardMineSquareLocations[rowIndex] &&
                    gameboardMineSquareLocations[rowIndex][columnIndex]) ??
                  false
                }
                // isSquareOpen={true}
                isSquareOpen={
                  (gameboardOpenSquareLocations[rowIndex] &&
                    gameboardOpenSquareLocations[rowIndex][columnIndex]) ??
                  false
                }
                isFlagged={false}
                numberOfNeighborsWhoAreMines={
                  numberOfNeighborsWhoAreMines[rowIndex] &&
                  numberOfNeighborsWhoAreMines[rowIndex][columnIndex]
                    ? numberOfNeighborsWhoAreMines[rowIndex][columnIndex]
                    : 0
                }
                optionalText={JSON.stringify(`${rowIndex}, ${columnIndex}`)}
              />
            )
          )}
        </Row>
      ))}
    </div>
  );
};

export default Gameboard;
