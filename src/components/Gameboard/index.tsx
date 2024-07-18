import React, { FC, useState, useEffect } from "react";
import Row from "../Row";
import Square from "../../Square";
// import LookUpTable from "../Board";

interface GameboardProps {
  gameboardOpenSquareLocations: {
    [row: number]: { [column: number]: boolean };
  };
  handleClick: (row: number, column: number) => void;
  isGameStarted: boolean;
  numberOfMinesOnBoard: number;
  numberOfRowsOnBoard: number;
  numberOfSquaresOnEachRow: number;
}

const Gameboard = (props:GameboardProps): JSX.Element => {
  const {
    gameboardOpenSquareLocations,
    handleClick,
    isGameStarted,
    numberOfRowsOnBoard,
    numberOfSquaresOnEachRow,
  } = props;

  /* Template board to display to user before they activate live board with first click;
side effect runs while game is not started, when user updates desired number of rows
or columns, or when isGameStarted is set to true; Live board displays on final useEffect update of isGameStarted
 */

  const isObjectEmpty = (object: {}) => {
    if (Object.keys(object).length <= 0) return true;
    return false;
  };

  useEffect(() => {}, []);

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
                isSquareOpen={
                  gameboardOpenSquareLocations[rowIndex] &&
                  gameboardOpenSquareLocations[rowIndex][columnIndex]
                }
                isFlagged={false}
                isMine={false}
                numberOfAdjacentMines={0}
              />
            )
          )}
        </Row>
      ))}
    </div>
  );
};

export default Gameboard;
