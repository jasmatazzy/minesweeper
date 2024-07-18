import React, { FC } from "react";
import "./style.css";
interface SquareProps {
  handleClick: () => void;
  isAMineSquare: boolean;
  isFlagged: boolean;
  isSquareOpen: boolean;
  numberOfAdjacentMines: number | 0;
  squaresState: {};
  optionalText?: string | void
}
const Square: FC<SquareProps> = (props) => {
  const {
    handleClick,
    isAMineSquare,
    isFlagged,
    isSquareOpen, 
    numberOfAdjacentMines,
    optionalText,
    squaresState
  } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          backgroundColor: isSquareOpen ? "lightGray" : "gray",
        }}
        disabled={isFlagged ? true : false}
      >
        {/* {isSquareOpen && isAMineSquare ? `💣`
        : isSquareOpen && numberOfAdjacentMines > 0 ? numberOfAdjacentMines
        : isFlagged ? `🚩`
        : isSquareOpen && numberOfAdjacentMines === 0 ? `🌴` : " "
        } */}
        {isSquareOpen ? `true` : `nah`}
        {/* {JSON.stringify(optionalText)} */}
        {<br />}
      </button>
    </div>
  );
};

export default Square;
