import React, {Component} from 'react';
import {capitalize} from './scripts/helper.js';
import Navigation from './Navigation.js';

export default class Header extends Component {
  render () {

    return (
      <div className="row">
        <Navigation serverData={this.props.serverData}/>
        <h1>{capitalize(this.props.serverData.name)} <span>#{this.props.serverData.id}</span></h1>
        </div>
    );
  }
}
