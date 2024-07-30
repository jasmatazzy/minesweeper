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
    if (!isGameStarted) return;
    timerId = setTimeout(() => {
      setLongPress(true);
    }, 300);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!isGameStarted) return;
    clearTimeout(timerId);
    if (longPress) {
      event.preventDefault();
      handleSquareRightClick();
      setLongPress(false);
    }
  };

  const displayEmojiOrNumber = () => {
    if (isGameOver && isMine) {
      return `💣`;
    } else if (isGameOver && isFlagged && !isMine) {
      return `😩🚫`;
    } else if (isGameOver && isFlagged && isMine) {
      return `✅💣`;
    } else if (isSquareOpen && numberOfNeighborsWhoAreMines > 0) {
      return numberOfNeighborsWhoAreMines;
    } else if (isFlagged) {
      return `🚩`;
    } else if (isSquareOpen && numberOfNeighborsWhoAreMines ===undefined) {
      return " ";
    }
  }

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
      {displayEmojiOrNumber()}
      {/* {optionalText} */}
    </button>
  );
};

export default SquareButton;
