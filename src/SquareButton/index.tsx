import React, { FC, useState } from "react";
interface SquareProps {
  handleMainClick: () => void;
  handleSquareDoubleClick: () => void;
  handleSquareRightClick: () => void;
  isMine: boolean;
  isFlagged: boolean;
  isGameStarted: boolean;
  isGameOver: boolean;
  isSquareOpen: boolean;
  numberOfNeighborsWhoAreMines: number | 0;
  optionalText?: string;
}
const SquareButton: FC<SquareProps> = (props) => {
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

  const [longPress, setLongPress] = useState(false);
  let timerId: NodeJS.Timeout;

  const handleTouchStart = () => {
    timerId = setTimeout(() => {
      setLongPress(true);
    }, 300);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    clearTimeout(timerId);
    if (longPress) {
      event.preventDefault();
      handleSquareRightClick();
      setLongPress(false);
    }
  };

  return (
    <button
      onClick={handleMainClick}
      onContextMenu={(event) => {
        event.preventDefault();
        handleSquareRightClick();
      }}
      // onMouseUp={handleSquareRightClick}
      onDoubleClick={handleSquareDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor:
          (isSquareOpen && !isMine) || isFlagged ? "lightGray" : "gray",
        boxSizing: "border-box",
        height: "30px",
        minWidth: "30px",
        width: "30px",
        fontSize: "10px",
        WebkitUserSelect: "none",
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

export default SquareButton;
