import React, { useState } from "react";

export const BlankBoxes = ({ boxes, onOpenBox }) => {
  const isBoxLoaded = boxes && boxes.length > 0;
  if (!isBoxLoaded) {
    return (<div>Loading...</div>);
  }

  let closedBoxes = boxes.map((box, index) => (
    <button key={index} className="blank-box" disabled={box.selected}
      onClick={() => onOpenBox(box.amount)}> {box.selected ? "$" + box.amount : (index + 1)}</button>
  ));


  return closedBoxes;
}