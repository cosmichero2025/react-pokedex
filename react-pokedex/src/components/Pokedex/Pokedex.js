import React, {Component} from 'react';
import '../../styles/Pokedex.css';

function Header(props) {
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
      inputValue: ''
    };

    //this.handleChange = this.handleChange.bind(this);
  }
/*
  handleChange(e) {
    this.setState({value: e.target.value});

    this.props.handler();


  }
*/
  render(props) {
    return (<div className="row">
      <input className="u-full-width" type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder={this.props.pokeName}/>
      <button value="squirtle" onClick = {this.props.handler}>Hey</button>
    </div>);
  }
}

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeUrlGeneral: 'http://pokeapi.salestock.net/api/v2/pokemon/' + 1 + '/',
      pokeUrlSpecific: 'http://pokeapi.salestock.net/api/v2/pokemon-species/' + 1 + '/',
      pokemonId: '',
      pokemonName: '',
      pokemonWeight: '',
      pokemonHeight: '',
      pokemonDesc: '... Loading',
    };

    this.handler = this.handler.bind(this);

    this.requestAPI();
  }

  requestAPI() {
    fetch(this.state.pokeUrlGeneral).then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({
        pokemonName: data.name,
        pokemonId: data.id,
        pokemonWeight: data.weight,
        pokemonHeight: data.height
      });
    });

    fetch(this.state.pokeUrlSpecific).then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        pokemonDesc: data.flavor_text_entries[1].flavor_text,
      });
    });
  }

  parseUrlGeneral(id) {
    return 'http://pokeapi.salestock.net/api/v2/pokemon/' + id + '/';
  }

  parseUrlSpecific(id) {
    return 'http://pokeapi.salestock.net/api/v2/pokemon-species/' + id + '/';
  }

  handler(e) {
    e.preventDefault();

    let input = e.target.value;
    this.setState({
      pokeUrlGeneral: this.parseUrlGeneral(input),
      pokeUrlSpecific: this.parseUrlSpecific(input),
    });

    this.requestAPI();
    console.log(this.state.pokemonName);
  }
  render(props) {
    const pokemon = this.state.pokemonData;
    const pokeName = this.state.pokemonName;
    const pokeId = this.state.pokemonId;
    const pokeDesc = this.state.pokemonDesc;

    //console.log(pokemon);

    return (<div className="container pokedex">
      <Header />
        <div className="row">
          <PokeImg />
          <PokeInfo pokeName={pokeName} pokeId={pokeId} />
        </div>
      <PokeDesc pokeDesc={pokeDesc}/>
      <PokeInput handler={this.handler}  pokeName={pokeName}/>

    </div>);
  }
}
