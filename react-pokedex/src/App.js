import React, {Component} from 'react';
import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/App.css';
import Header from './components/Header.js';
import {PokeInfo} from './components/info/PokeInfo.js';

class App extends Component {

  constructor() {
    super();

    this.state = {
      pokemon: 'bulbasaur',
      serverData: {}
    }
  }

  componentDidMount() {
    fetch('http://pokeapi.salestock.net/api/v2/pokemon/' + this.state.pokemon + '/').then(results => {
      return results.json();
    }).then(data => {
      /*
      let pictures = data.results.map((pic) => {
        return (
          <div key={pic.results}>
            <img src={pic.picture.medium} />
          </div>
        )
      })
      this.setState({pictures: pictures});
      console.log("State: " + this.state.pictures);
      */
      this.setState({serverData: data});

      this.setState({test: "test"});

      console.log(this.state.serverData);
      console.log('Name: ' + this.state.serverData.name);
      console.log('Weight: ' + this.state.serverData.weight + 'lbs');
      console.log('Height: ' + this.state.serverData.height + 'ft');
    })
  }

  render(props) {

    
    return (<div className="App">

      {
        this.state.serverData.name
          ? <div className="container">
              <Header serverData={this.state.serverData}/>
              <div className="row">
                <div className="one-half column">
                  <img src="http://static.pokemonpets.com/images/monsters-images-800-800/1-Bulbasaur.png" alt="pokeman" className="pokeImg"/>
                </div>
                <PokeInfo />
              </div>
              <div className="row">
                <div className="one-half column">
                  <h4>Stats</h4>
                  <p>Deal with this later</p>
                </div>
                <div className="one-half column">
                  <div className="row">
                    <h4>Type</h4>
                    <p>Grass & Poison</p>
                  </div>
                  <div className="row">
                    <h4>Weaknesses</h4>
                    <p>Fire, Flying, Ice, Psychic</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <h4>Evolutions</h4>
              </div>
            </div>
          : <h1>Loading...</h1>
      }
    </div>);

  }
}

export default App;
