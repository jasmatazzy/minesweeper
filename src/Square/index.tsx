import React, { FC } from "react";
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
      // onMouseUp={handleSquareRightClick}
      onDoubleClick={handleSquareDoubleClick}
      style={{
        backgroundColor: (isSquareOpen && !isMine) || isFlagged  ? "lightGray" : "gray",
        boxSizing: "border-box",
        height: "30px",
        minWidth: "30px",
        width: "30px",
        // display: "flex",
        fontSize: "20px",
      }}
    >
      {isGameStarted &&
        (isGameOver && isFlagged && !isMine ? `😩🚫` : isGameOver && isFlagged && isMine ? `✅💣` : isSquareOpen && isMine
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
