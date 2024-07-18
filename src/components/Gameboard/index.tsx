import React, { FC, useState, useEffect } from "react";
import Row from "../Row";
import Square from "../../Square";


interface GameboardProps {
  handleClick: Function;
  isGameStarted: boolean;
  numberOfMinesOnBoard: number;
  numberOfRowsOnBoard: number;
  numberOfSquaresOnEachRow: number;
  squaresState: LookUpTable; 
  tempClick: (newSquareState: any) => void
}

type LookUpTable = {
  [row: number]: {
    [column: number]: boolean;
  };
};

const Gameboard: FC<GameboardProps> = (props) => {
  const {
    handleClick,
    isGameStarted,
    numberOfRowsOnBoard,
    numberOfSquaresOnEachRow,
    squaresState,
    tempClick
  } = props;

  const [testState, setTestState] = useState(0)

  /* Template board to display to user before they activate live board with first click;
side effect runs while game is not started, when user updates desired number of rows
or columns, or when isGameStarted is set to true; Live board displays on final useEffect update of isGameStarted
 */

const isObjectEmpty = (object:{}) =>  {
  if (Object.keys(object).length <= 0)
    return true
  return false
}

useEffect(()=>{


}, [testState])

  return (
      <div>
          <button onClick={()=> setTestState(testState+1)}>MeSeeks</button>
      </div>
  );
};

export default Gameboard;
