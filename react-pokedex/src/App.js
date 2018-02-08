import React, {Component} from 'react';
import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/App.css';
import Pokedex from './components/Pokedex/Pokedex.js';

// http://pokeapi.salestock.net/

class Navigation extends Component {
  render() {
    return (<div className="navigation-wrapper">
      <ul className="navigation">
        <li>
          <a href="./">Encloy</a>
        </li>
        <li>
          <a href="./">Pokedex</a>
        </li>
        <li>
          <a href="./">Me</a>
        </li>
      </ul>
    </div>);
  }
}

class App extends Component {
  constructor() {
    super();
    console.log('App Loaded');
}
// http://pokeapi.salestock.net/

  render(props) {
    return (
    <div className="App">
      <Navigation/>
      <Pokedex />
    </div>
  );
  }
}

export default App;
