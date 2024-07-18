import React from "react";
import Board from "../../components/Board";

const Main = (): JSX.Element => {
  return (
    <div
    style={{padding: "30px"}}
    >
      <div>💃🏾 This IS Minesweeper</div>
      <Board />
    </div>
  );
};

export default Main;
