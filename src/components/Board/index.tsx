//You will create a function who receives an array— this array is a report of neighbors who have no mine neighbors
// function opens each square in list and also receives data about these secondary neighbors, and so on, until no one reports that they have a neighbor with no mine neighbors

import React, { useState } from "react";
import Gameboard from "../Gameboard/";
import UserSettings from "../UserSettings";
import squareNeighborLookUp from "../../functions/squareNeighborLookUp";

interface BoardProps {}

type LookUpTable = {
  [row: number]: {
    [column: number]: true;
  };
};

const Board = (props: BoardProps): JSX.Element => {
  /* STATE SETTERS for GameboardComponent*/
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(true);
  const [numberOfRowsOnBoard, setNumberOfRowsOnBoard] = useState(16);
  const [numberOfSquaresOnEachRow, setNumberOfSquaresOnEachRow] = useState(16);
  const [numberOfMinesOnBoard, setNumberOfMinesOnBoard] = useState(40);
  const [numberOfNeighborsWhoAreMines, setNumberOfNeighborsWhoAreMines] =
    useState<{ [row: number]: { [column: number]: number } }>({});
  const [gameboardFlagSquareLocations, setGameboardFlagSquareLocations] =
    useState<{ [row: number]: { [column: number]: true } }>({});
  const [gameboardMineSquareLocations, setGameboardMineSquareLocations] =
    useState<{ [row: number]: { [column: number]: true } }>({});
  const [gameboardOpenSquareLocations, setGameboardOpenSquareLocations] =
    useState<LookUpTable>({});
  // const [
  //   gameboardNeighborSquareLocations,
  //   setGameboardNeighborSquareLocations,
  // ] = useState<{ [row: number]: { [column: number]: true } }>({});

  /* STATE SETTERS for user inputs*/

  /*DERIVED STATE */

  const coordinatesExistInLookupTable = (
    row: number,
    column: number,
    table: LookUpTable
  ) => {
    if (table[row] && table[row][column]) return true;
    return false;
  };

  const isSquareAMine = (row: number, column: number) =>
    coordinatesExistInLookupTable(row, column, gameboardMineSquareLocations);

  const isSquareSafe = (squareRow: number, squareColumn: number): boolean => {
    if (
      (numberOfNeighborsWhoAreMines[squareRow] &&
        numberOfNeighborsWhoAreMines[squareRow][squareColumn]) ||
      isSquareAMine(squareRow, squareColumn)
    )
      return false;
    else return true;
  };

  const numberOfNeighborsWhoAreFlags = (
    squareRow: number,
    squareColumn: number
  ) => {
    let counter = 0;
    const neighbors = squareNeighborLookUp(
      squareRow,
      squareColumn,
      numberOfRowsOnBoard,
      numberOfSquaresOnEachRow
    );
    // if neighbor is flag, increase counter
    neighbors.forEach((neighbor) => {
      if (
        gameboardFlagSquareLocations[neighbor.row] &&
        gameboardFlagSquareLocations[neighbor.row][neighbor.column]
      ) {
        counter += 1;
      }
    });
    return counter;
  };

  /* EVENT HANDLERS */

  const addToLookupTable = (
    row: number,
    column: number,
    table: LookUpTable
  ) => {
    if (table[row] && table[row][column]) {
      return;
    }
    if (!table[row]) {
      table[row] = {};
    }
    table[row][column] = true;
  };

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
      (document.getElementById(`mine-count`) as HTMLInputElement).value,
      10
    );
    setNumberOfMinesOnBoard(mineCount);
  };

  const handleGameStarted = (startRow: number, startColumn: number) => {
    //distribute mines at random throughout the board & notify all neighbors that a new mine has moved into the neighborhood
    const buryTheMinesAndNotifyNewNeighbors = (): {
      [row: number]: { [column: number]: true };
    } => {
      const mineLocationsObject: { [row: number]: { [column: number]: true } } =
        {};
      const mineLocationsArray: { row: number; column: number }[] = [];
      Array.from({ length: numberOfMinesOnBoard }).forEach(() => {
        const randomRow = Math.floor(Math.random() * numberOfRowsOnBoard);
        const randomColumn = Math.floor(
          Math.random() * numberOfSquaresOnEachRow
        );

        const noMinesAllowed =
          (mineLocationsObject[randomRow] &&
            mineLocationsObject[randomRow][randomColumn]) ||
          (randomRow === startRow && randomColumn === startColumn) ||
          squareNeighborLookUp(
            randomRow,
            randomColumn,
            numberOfRowsOnBoard,
            numberOfSquaresOnEachRow
          ).some((neighbor) => {
            const { row, column } = neighbor;
            return row === startRow && column === startColumn;
          });

        if (!noMinesAllowed) {
          if (!mineLocationsObject[randomRow]) {
            mineLocationsObject[randomRow] = {};
          }
          mineLocationsObject[randomRow][randomColumn] = true;
          mineLocationsArray.push({ row: randomRow, column: randomColumn });
        }
      });
      setGameboardMineSquareLocations(mineLocationsObject);

      mineLocationsArray.forEach((mineLocation) => {
        const { row, column } = mineLocation;
        const neighborsOfMines = squareNeighborLookUp(
          row,
          column,
          numberOfRowsOnBoard,
          numberOfSquaresOnEachRow
        );
        neighborsOfMines.forEach((neighbor) => {
          const { row, column } = neighbor;
          console.log(`i'm the neighbor ${row} ${column}`);
          setNumberOfNeighborsWhoAreMines((prevState) => {
            const newState = { ...prevState };
            if (prevState[row]) {
              if (prevState[row][column]) {
                newState[row][column] += 1;
                return newState;
              }
              newState[row][column] = 1;
              return newState;
            }
            newState[row] = { [column]: 1 };
            return newState;
          });
        });
      });
      return gameboardMineSquareLocations;
    };

    buryTheMinesAndNotifyNewNeighbors();
    setIsGameStarted(true);

    /* When the user clicks to start the game:
    ***gameboardMineSquareLocations
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



  const tempState: LookUpTable = { ...gameboardOpenSquareLocations };
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

    /*
        create empty array called Collection of row/column objects
        add clicked square coordinates to array
        if square has mine neighbors, push this ...array to the gameboardOpenSquareLocations state, return with no further action
        if square has no mine neighbors
        - identify all its neighbors
        - push these identities to the Collection, they are safe to open
        --check each identity for whether they have mine neighbors
        --if the neighborneighbor has a mine neighbor, return the Collection and take no further action
        ---if not, run the function on neighborneighbors who had no mine neighbors

        */

    if (
      (tempState[squareRow] && tempState[squareRow][squareColumn]) ||
      (gameboardOpenSquareLocations[squareRow] &&
        gameboardOpenSquareLocations[squareRow][squareColumn]) ||
      (gameboardFlagSquareLocations[squareRow] &&
        gameboardFlagSquareLocations[squareRow][squareColumn]) ||
      isGameOver
    )
      return;
    if (!isGameStarted) {
      handleGameStarted(squareRow, squareColumn);
      return;
    }
    const neighbors = (
      row: number,
      column: number
    ): { row: number; column: number }[] =>
      squareNeighborLookUp(
        row,
        column,
        numberOfRowsOnBoard,
        numberOfSquaresOnEachRow
      );

    const unopenedNeighbors = neighbors(squareRow, squareColumn).filter(
      (neighbor) =>
        (tempState[neighbor.row] &&
          tempState[neighbor.row][neighbor.column]) !== true
    );

    addToLookupTable(squareRow, squareColumn, tempState);

    if (isSquareAMine(squareRow, squareColumn)) {
      console.log(`womp womp womp maybe next time`);
      const restOfMines = { ...gameboardOpenSquareLocations };

      const stageMinesForFinalReveal = () =>
        Object.getOwnPropertyNames(gameboardMineSquareLocations).forEach(
          (row) => {
            Object.getOwnPropertyNames(
              gameboardMineSquareLocations[parseInt(row, 10)]
            ).forEach((column) => {
              addToLookupTable(
                parseInt(row, 10),
                parseInt(column, 10),
                restOfMines
              );
            });
          }
        );

      stageMinesForFinalReveal();
      setGameboardOpenSquareLocations((prevState) => ({
        ...prevState,
        ...restOfMines,
      }));
      setIsGameOver(true);
    }

    if (!unopenedNeighbors || !isSquareSafe(squareRow, squareColumn)) {
      return setGameboardOpenSquareLocations((prevState) => ({
        ...prevState,
        ...tempState,
      }));
    } else {
      unopenedNeighbors.forEach((neighbor) => {
        if (
          tempState[neighbor.row] &&
          tempState[neighbor.row][neighbor.column]
        ) {
          return;
        }
        handleSquareMainClick(neighbor.row, neighbor.column);
      });
      return setGameboardOpenSquareLocations((prevState) => ({
        ...prevState,
        ...tempState,
      }));
    }
  };

  const handleSquareLeftClick = (row: number, column: number) => {
    if (!isGameStarted) {
      handleGameStarted(row, column);
    }
    //check if it was a single or a double click event, and run the appropriate callback
    handleSquareMainClick(row, column);
  };

  const handleSquareDoubleClick = (squareRow: number, squareColumn: number) => {
    const neighbors = squareNeighborLookUp(
      squareRow,
      squareColumn,
      numberOfRowsOnBoard,
      numberOfSquaresOnEachRow
    );
    console.log(`doubleclicked`);
    if (
      (gameboardFlagSquareLocations[squareRow] &&
        gameboardFlagSquareLocations[squareRow][squareColumn]) ||
      isGameOver
    )
      return;
    if (
      numberOfNeighborsWhoAreMines[squareRow] &&
      numberOfNeighborsWhoAreMines[squareRow][squareColumn] ===
        numberOfNeighborsWhoAreFlags(squareRow, squareColumn)
    ) {
      neighbors.forEach((neighbor) =>
        handleSquareMainClick(neighbor.row, neighbor.column)
      );
    }
    /*
    An open square is shortcut eligible if the count of mines adjacent to the square is exactly equal to the number of flags touching the square.
    
    Animate the smiley face. If game is not started, handleGameStarted; if square is not already open,
    or has a flag or is not shortcut eligible, do not handle; otherwise, open all neighbor squares
    */
  };
  const handleSquareRightClick = (
    event: React.MouseEvent<HTMLElement>,
    squareRow: number,
    squareColumn: number
  ) => {
    /*
    A square is flag eligible if it is not open. A square is peek eligible if it has neighbors who are not open (come back to this. Instead of just returning for gameboardOpenSquareLocations first check if it is peek eligible).
    If square is not already open, set flag to true, disable the square from being clicked. If square is already open:
    If on first right click "toggle," highlight the square's neighbors, and leave them highlit on mouseup. If on second
    right click toggle, un-highlight the square's neighbors on mouseup;
    */
    event.preventDefault();
    const updatedStateOfFlagLocations = { ...gameboardFlagSquareLocations };
    if (
      (gameboardOpenSquareLocations[squareRow] &&
        gameboardOpenSquareLocations[squareRow][squareColumn]) ||
      isGameOver
    )
      return;
    if (
      gameboardFlagSquareLocations[squareRow] &&
      gameboardFlagSquareLocations[squareRow][squareColumn]
    ) {
      delete updatedStateOfFlagLocations[squareRow][squareColumn];
    } else {
      addToLookupTable(squareRow, squareColumn, updatedStateOfFlagLocations);
    }
    return setGameboardFlagSquareLocations((prevState) => ({
      ...prevState,
      ...updatedStateOfFlagLocations,
    }));
  };
  const handleSquareRightClickMouseUp = (
    event: React.MouseEvent<HTMLElement>,
    squareRow: number,
    squareColumn: number
  ) => {
    /*
    A square is flag eligible if it is not open. A square is peek eligible if it has neighbors who are not open (come back to this. Instead of just returning for gameboardOpenSquareLocations first check if it is peek eligible).
    If square is not already open, set flag to true, disable the square from being clicked. If square is already open:
    If on first right click "toggle," highlight the square's neighbors, and leave them highlit on mouseup. If on second
    right click toggle, un-highlight the square's neighbors on mouseup;
    */
    event.preventDefault();
    const updatedStateOfFlagLocations = { ...gameboardFlagSquareLocations };
    if (
      (gameboardOpenSquareLocations[squareRow] &&
        gameboardOpenSquareLocations[squareRow][squareColumn]) ||
      isGameOver
    )
      return;
    if (
      gameboardFlagSquareLocations[squareRow] &&
      gameboardFlagSquareLocations[squareRow][squareColumn]
    ) {
      delete updatedStateOfFlagLocations[squareRow][squareColumn];
    } else {
      addToLookupTable(squareRow, squareColumn, updatedStateOfFlagLocations);
    }
    return setGameboardFlagSquareLocations((prevState) => ({
      ...prevState,
      ...updatedStateOfFlagLocations,
    }));
  };

  return (
    <div>
      <UserSettings
        getMineCount={handleSetMineCount}
        isGameStarted={isGameStarted}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
      />
      <Gameboard
        gameboardFlagSquareLocations={gameboardFlagSquareLocations}
        gameboardMineSquareLocations={gameboardMineSquareLocations}
        gameboardOpenSquareLocations={gameboardOpenSquareLocations}
        handleSquareDoubleClick={handleSquareDoubleClick}
        handleSquareLeftClick={handleSquareLeftClick}
        handleSquareRightClick={handleSquareRightClick}
        isGameOver={isGameOver}
        isGameStarted={isGameStarted}
        numberOfMinesOnBoard={numberOfMinesOnBoard}
        numberOfNeighborsWhoAreFlags={numberOfNeighborsWhoAreFlags}
        numberOfNeighborsWhoAreMines={numberOfNeighborsWhoAreMines}
        numberOfRowsOnBoard={numberOfRowsOnBoard}
        numberOfSquaresOnEachRow={numberOfSquaresOnEachRow}
      />
    </div>
  );
};

export default Board;
