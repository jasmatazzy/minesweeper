import React from "react";

interface UserSettingsProps {
  handleClick: () => void;
  numberOfMinesOnBoard: number;
}

const UserSettings = (props
: UserSettingsProps
): JSX.Element => {
  const {
    handleClick,
    numberOfMinesOnBoard
  } = props;
  return (
    <div>
      <input type="number" id="mine-count" value={numberOfMinesOnBoard} onChange={handleClick}></input>
    </div>
  );
};

export default UserSettings;
