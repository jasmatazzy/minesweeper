import React, { FC } from "react";
import "./style.css";
interface SquareProps {
  handleMainClick: () => void;
  handleSquareDoubleClick: () => void;
  handleSquareRightClick: (event: React.MouseEvent<HTMLElement>) => void;
  isMine: boolean;
  isFlagged: boolean;
  isGameStarted: boolean;
  isGameOver: boolean;
  isSquareOpen: boolean;
  numberOfNeighborsWhoAreMines: number | 0;
  optionalText?: string;
}
const Square: FC<SquareProps> = (props) => {
  const {
    handleMainClick,
    handleSquareDoubleClick,
    handleSquareRightClick,
    isMine,
    isFlagged,
    isGameOver,
    isGameStarted,
    isSquareOpen,
    // optionalText,
    numberOfNeighborsWhoAreMines,
  } = props;
  return (
    <button
      onClick={handleMainClick}
      onContextMenu={handleSquareRightClick}
      onDoubleClick={handleSquareDoubleClick}
      style={{
        backgroundColor: isSquareOpen || isFlagged ? "lightGray" : "gray",
      }}
    >
      {isGameStarted &&
        (isGameOver && isFlagged && !isMine ? `😩🚫` : isSquareOpen && isMine
          ? `💣`
          : isSquareOpen && numberOfNeighborsWhoAreMines > 0
          ? numberOfNeighborsWhoAreMines
          : isFlagged
          ? `🚩`
          : isSquareOpen && numberOfNeighborsWhoAreMines === 0
          ? " "
          : " ")
          }
          {/* {optionalText} */}
    </button>
  );
};

export default Square;
