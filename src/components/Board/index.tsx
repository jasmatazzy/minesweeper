import React, { FC, useState } from "react";
import Gameboard from "../Gameboard/";
import UserSettings from "../UserSettings";

interface BoardProps {}

type LookUpTable = {
  [row: number]: {
    [column: number]: boolean;
  };
};

const Board = (props: BoardProps): JSX.Element => {
  /* STATE SETTERS for GameboardComponent*/
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isGameWon, setIsGameWon] = useState(true);
  const [numberOfRowsOnBoard, setNumberOfRowsOnBoard] = useState(16);
  const [numberOfSquaresOnEachRow, setNumberOfSquaresOnEachRow] = useState(16);
  const [numberOfMinesOnBoard, setNumberOfMinesOnBoard] = useState(40);
  const [squaresState, setSquaresState] = useState<{
    [key: number]: { [key: number]: boolean };
  }>({});
  const [gameboardMineSquareLocations, setGameboardMineSquareLocations] =
    useState({});
  const [gameboardOpenSquareLocations, setGameboardOpenSquareLocations] =
    useState<LookUpTable>({});
  const [
    gameboardNeighborSquareLocations,
    setGameboardNeighborSquareLocations,
  ] = useState({});
  /* STATE SETTERS for user inputs*/

  /* EVENT HANDLERS */
  const handleSetRowLength = () => {
    /*
    -Set Rows to 12
    -Receive input from user for valid range of row lengths
    */
  };

  const handleSetColumnLength = () => {
    /*
    -Set Columns to 12
    -Receive input from user for valid range of column lengths
    */
  };

  const handleSetMineCount = () => {
    /*
    -Set mine count to 30
    -Receive input from user for valid range of mine counts
    */

    const mineCount = parseInt(
      (document.getElementById(`mine-count`) as HTMLInputElement).value, 10
    );
    setNumberOfMinesOnBoard(mineCount);

    console.log(typeof mineCount);
  };

  const handleSetSquaresState = () => {
    /*
  }

  const handleGameStarted = () => {
    /* When the user clicks to start the game:
    - openNeighbors = open all neighbors, looping over any who also have 0 mine neighbors;
      check that each open square that is touching a closed square has at least one mine neighbor,
      if not open its neighbors

    - note the square that was clicked by its row, column coordinates
    - note all neighbors of square clicked
    - ensure clicked square is not a mine, and has 0 mine neighbors
    - setGameStarted to true
    - openNeighbors
      */
  };
  const handleSquareMainClick = (squareRow: number, squareColumn: number) => {
    /*
     Animate the smiley face. If game is not started, handleGameStarted; if square is already open,
     or has a flag, do not handle; Set square to open.
    If square is a mine:
     - setIsGameOver to true
     - set remaining mines to open
     - set any incorrectly flagged squares to X
     - sad, dead not-so-smiley face
    If square has no mine neighbors
     - openNeighbors
    If square is last remaining non-mine square on the board, set isGameWon to true:
    this is the number of squares on the board (rows* columns) minus the number of mines set on the board; 
    if gameboardOpenSquareLocations has this number of entries, the game must be won— all remaining squares, whether flagged or not, are mines
    */

    setGameboardOpenSquareLocations((prevState) => {
      const newState = { ...prevState };
      if (prevState[squareRow]) {
        if (prevState[squareRow][squareColumn]) {
          return newState;
        }
        prevState[squareRow][squareColumn] = true;
        return newState;
      }
      newState[squareRow] = { [squareColumn]: true };
      return newState;
    });
  };

  // Rest of the code remains the same
  const handleSquareDoubleClick = () => {
    /*
    An open square is shortcut eligible if the count of mines adjacent to the square is exactly equal to the number of flags touching the square.
    
    Animate the smiley face. If game is not started, handleGameStarted; if square is not already open,
    or has a flag or is not shortcut eligible, do not handle; otherwise, open all neighbor squares
    */
  };
  const handleSquareRightClick = () => {
    /*
    A square is flag eligible if it is not open. A square is peek eligible if it has neighbors who are not open.
    If square is not already open, set flag to true, disable the square from being clicked. If square is already open:
    If on first right click "toggle," highlight the square's neighbors, and leave them highlit on mouseup. If on second
    right click toggle, un-highlight the square's neighbors on mouseup;
    */
  };

  return (
    <div>
      <UserSettings
        handleClick={handleSetMineCount}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
      />
      <Gameboard
        gameboardOpenSquareLocations={gameboardOpenSquareLocations}
        handleClick={handleSquareMainClick}
        isGameStarted={isGameStarted}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
        numberOfRowsOnBoard={numberOfRowsOnBoard}
        numberOfSquaresOnEachRow={numberOfSquaresOnEachRow}
      />
    </div>
  );
};

export default Board;
