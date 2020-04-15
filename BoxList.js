import React from "react";

export const BoxList = ({ boxes }) => {
  const isBoxLoaded = boxes && boxes.length > 0;
  if (!isBoxLoaded) {
    return (<div>Loading...</div>);
  }
  return (
  <ul>
    { boxes.map(box => (<li key={box.amount}><button  type="button" disabled={box.selected}>{box.amount}</button></li>))}
  </ul>
)
};