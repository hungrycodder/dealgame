import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { BoxList } from './BoxList';
import { BlankBoxes } from './BlankBoxes';
import shuffle from 'lodash/shuffle';
import { boxes } from './assets/boxes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      boxes: shuffle(boxes),
      silverBoxes: boxes.slice(0, 13),
      goldBoxes: boxes.slice(13, 26)
    };
  }

  onOpenBox = (amount) => {



    const getUpdatedBoxes = (b_amount, boxCollection) => {
      return boxCollection.map(b => {
        if (b.amount === b_amount)
          b.selected = true;
        return b;
      });
    };

    this.setState({ boxes: getUpdatedBoxes(amount, this.state.boxes) });

    let silverBox = this.state.silverBoxes.find(b => b.amount === amount);
    if (silverBox) {
      this.setState({ silverBoxes: getUpdatedBoxes(amount, this.state.silverBoxes) });
    } else {
      this.setState({ goldBoxes: getUpdatedBoxes(amount, this.state.goldBoxes) });
    }
    this.endOfGameCheck();
  }

  endOfGameCheck() {
    setTimeout(() => {
      const openBoxes = this.state.boxes.filter(b => b.selected);
      if (openBoxes && openBoxes.length === this.state.boxes.length - 1) {
        const lastBox = this.state.boxes.find(b=>!b.selected);
        alert(`The game is finished and you won $${lastBox.amount}`);
        return;
      }

      this.makeAnOffer();
    }, 0);
  }


  makeAnOffer() {
    const openBoxes = this.state.boxes.filter(b => b.selected);
    if (openBoxes && openBoxes.length % 6 === 0) {
      alert("Would you like to accept an offer of $3000?");
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <BoxList boxes={this.state.silverBoxes}></BoxList>
              </td>
              <td>
                <BlankBoxes boxes={this.state.boxes} onOpenBox={this.onOpenBox}></BlankBoxes>
              </td>
              <td>
                <BoxList boxes={this.state.goldBoxes}></BoxList>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
