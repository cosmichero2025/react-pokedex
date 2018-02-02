import React, {Component} from 'react';
import {capitalize} from './scripts/helper.js';
import pokemonNames from './navigation-pokelist.json';

export default class Navigation extends Component {

  constructor() {
    super();

    let placeholder = this.handlePokeKeyUp = this.handleKeyUp.bind(this, 'pokeInput');
  }

  handleKeyUp(refName, e) {
    let inputText = (e.target.value).toLowerCase();

    this.setState({pokemon: inputText});
    // Set the state here so that the variable of input text is known
  }

  render() {

    return (<div>
      <input className="u-full-width" type="text" placeholder={capitalize(this.props.serverData.name)} onKeyUp={this.handlePokeKeyUp} ref="pokeInput"/>
    </div>);
  }

}
