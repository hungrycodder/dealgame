import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Game } from './Game';
import { boxes } from './assets/boxes';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Game boxCollection={boxes}></Game>
    );
  }
}

render(<App />, document.getElementById('root'));
