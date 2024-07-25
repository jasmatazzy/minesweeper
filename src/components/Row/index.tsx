import React, { PropsWithChildren } from "react";

const Row = ({children}: PropsWithChildren) => {
  return (
    <div style={{ display: "flex",
    margin: 0,
    padding: 0,
     }}>
      {children}
    </div>
  );
};

export default Row;
