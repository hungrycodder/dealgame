import React, { useState } from "react";
import shuffle from 'lodash/shuffle';

import { BoxList } from './BoxList';
import { BlankBoxes } from './BlankBoxes';

export const Game = ({ boxCollection }) => {
  const [boxes, setBoxes] = useState(shuffle(boxCollection));
  
  const _silverBoxes = boxCollection.filter(b => b.boxType === 1);
  const [silverBoxes, setSilverBoxes] = useState(_silverBoxes);

  const _goldBoxes = boxCollection.filter(b => b.boxType === 2);
  const [goldBoxes, setGoldBoxes] = useState(_goldBoxes);

  const [offerPercentage, setOfferPercentage] = useState([0.15, 0.25, 0.65, .75]);
  
  const markBoxAsOpened = (b_amount, boxCollection) => {
    return boxCollection.map(b => {
      if (b.amount === b_amount)
        b.selected = true;
      return b;
    });
  };

  const onOpenBox = (selectedBox) => {
    setBoxes(markBoxAsOpened(selectedBox.amount, boxes));
    const isSilverBox = selectedBox.boxType === 1;
    if (isSilverBox) {
      setSilverBoxes(markBoxAsOpened(selectedBox.amount, silverBoxes));
    } else {
      setGoldBoxes(markBoxAsOpened(selectedBox.amount, goldBoxes));
    }

    endOfGameCheck();
  }

  const endOfGameCheck = () => {
    setTimeout(() => {
      const openBoxes = boxes.filter(b => b.selected);
      const isSecondLastBox = openBoxes && openBoxes.length === boxes.length - 1;
      if (isSecondLastBox) {
        const lastBox = boxes.find(b => !b.selected);
        alert(`The game is finished and you won $${lastBox.amount}`);
        return;
      }

      if (openBoxes && openBoxes.length % 6 === 0) {
        const potMoney = boxes.filter(b => !b.selected)
          .map(b => b.amount)
          .reduce((a, b) => a + b);
        const ev = potMoney / (25 - openBoxes.length);
        let offerPercentages = [...offerPercentage];
        const perc = offerPercentages.shift();
        setOfferPercentage(offerPercentages);
        alert(`Would you like to accept an offer of $${ev* perc}?`);
      }

    }, 0);
  }

  return (
      <table>
        <tbody>
          <tr>
            <td>
              <BoxList boxes={silverBoxes}></BoxList>
            </td>
            <td>
              <BlankBoxes boxes={boxes} onOpenBox={onOpenBox}></BlankBoxes>
            </td>
            <td>
              <BoxList boxes={goldBoxes}></BoxList>
            </td>
          </tr>
        </tbody>
      </table>
  );
};