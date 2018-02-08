import React, {Component} from 'react';
import '../../styles/Pokedex.css';

function Header() {
  return (<div className="row poke-header">
    <h1>React Pokedex!</h1>
    <img src="http://pixelartmaker.com/art/2af58207d5ccce4.png" alt="pokedex-circle"/>
  </div>);
}


function PokeImg() {
  return (<div className="seven columns">
    <img className="poke-img-main" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="pokemon"/>
  </div>);
}

class PokeInfo extends Component {
  render(props) {

    return (<div className="five columns">
      <div className="row poke-name-con">
        <div className="row poke-name">

          <img src="http://pixelartmaker.com/art/797ff81281c7a32.png" alt="pixel_poke"/>
          <h6>
            <span>#{this.props.pokeId}</span>
            {this.props.pokeName.toUpperCase()}</h6>

        </div>
        <div className="row poke-alt-name">
          <h6>Entrancing Pokemon</h6>
        </div>
      </div>
      <div className="row poke-type-con">
        <div>
          <h6>POISON</h6>
        </div>
        <div>
          <h6>ELECTR</h6>
        </div>
      </div>
      <div className="row poke-body-con">
        <div className="row">
          <span>HT</span>
          <h6>5&apos;11&quot;</h6>
        </div>
        <div className="row">
          <span>WT</span>
          <h6>22.5lbs</h6>
        </div>
      </div>
    </div>);
  }

}

class PokeDesc extends Component {
  render(props) {
    return (<div className="row">
      <h2>Pokemon description</h2>
      <p>{this.props.pokeDesc}</p>
    </div>);
  }
}

class PokeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});

    console.log(this.state.value);
  }

  render(props) {
    return (<div className="row">
      <input className="u-full-width" type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.props.pokemonValue}/>
    </div>);
  }
}

export default class Pokedex extends Component {
  constructor(props) {
    super();
    this.state = {
      pokemonData: [],
      pokemonName: 'ivysaur',
      pokemonId: 2,
      pokemonDesc: "There is a bud on this Pokémon’s back. To support its weight, Ivysaur’s legs and trunk grow thick and strong.If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon.",
    };

    fetch('http://pokeapi.salestock.net/api/v2/pokemon-species/' + this.state.pokemonId + '/').then(results => {
      return results.json();
    }).then(data => {
      this.setState({pokemonData: data});
    });
  }

  render(props) {
    const pokemon = this.state.pokemonData;
    const pokeName = this.state.pokemonName;
    const pokeId = this.state.pokemonId;
    const pokeDesc = this.state.pokemonDesc;

    console.log(pokemon);

    return (<div className="container pokedex">
      <Header/>
        <div className="row">
          <PokeImg />
          <PokeInfo pokeName={this.state.pokemonName} pokeId={pokeId} />
        </div>
      <PokeDesc pokeDesc={pokeDesc}/>
      <PokeInput pokemonValue={this.state.pokemonName}/>

    </div>);
  }
}
