import React, { FC } from "react";
import "./style.css";
interface SquareProps {
  handleClick: () => void;
  isMine: boolean;
  isFlagged: boolean;
  isGameStarted: boolean;
  isSquareOpen: boolean;
  numberOfAdjacentMines: number | 0;
  optionalText?: string | void;
}
const Square: FC<SquareProps> = (props) => {
  const {
    handleClick,
    isMine,
    isFlagged,
    isGameStarted,
    isSquareOpen,
    numberOfAdjacentMines,
  } = props;

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isSquareOpen ? "lightGray" : "gray",
      }}
      disabled={isFlagged ? true : false}
    >
      {isGameStarted &&
        (isSquareOpen && isMine
          ? `💣`
          : isSquareOpen && numberOfAdjacentMines > 0
          ? numberOfAdjacentMines
          : isFlagged
          ? `🚩`
          : isSquareOpen && numberOfAdjacentMines === 0
          ? `🌴`
          : " ")}
    </button>
  );
};

export default Square;
