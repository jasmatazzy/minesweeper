import React, { FC } from "react";
import "./style.css";
interface SquareProps {
  handleClick: () => void;
  isMine: boolean;
  isFlagged: boolean;
  isGameStarted: boolean;
  isSquareOpen: boolean;
  numberOfNeighborsWhoAreMines: number | 0;
  optionalText?: string | void;
}
const Square: FC<SquareProps> = (props) => {
  const {
    handleClick,
    isMine,
    isFlagged,
    isGameStarted,
    isSquareOpen,
    optionalText,
    numberOfNeighborsWhoAreMines,
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
          : isSquareOpen && numberOfNeighborsWhoAreMines > 0
          ? numberOfNeighborsWhoAreMines
          : isFlagged
          ? `🚩`
          : isSquareOpen && numberOfNeighborsWhoAreMines === 0
          ? " "
          : " ")}
    </button>
  );
};

export default Square;
