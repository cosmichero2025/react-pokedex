import React, {Component} from 'react';
import '../../styles/Pokedex.css';

function Header(props) {
  return (<div className="row poke-header">
    <h1>React Pokedex!</h1>
    <img src="http://pixelartmaker.com/art/2af58207d5ccce4.png" alt="pokedex-circle"/>
  </div>);
}

function PokeImg(props) {
  return (<div className="seven columns">
    <img className="poke-img-main" src={props.pokeImg} alt="pokemon"/>
  </div>);
}

function TypesListItem(props) {
  console.log('Hey: ' + props.value);
  return (
    <li>
    <div>
      <h6>{props.value}</h6>
    </div>
  </li>
);
}

function TypeList(props) {
  const pokemonTypes = props.pokeTypes;
  console.log(pokemonTypes);
  const pokeTypesList = pokemonTypes.map((typeI) =>
  <TypesListItem key={typeI.type.name} value={typeI.type.name}/>
  );
  return (<ul>{pokeTypesList}</ul>);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokeInfo(props) {
  return (<div className="five columns">
    <div className="row poke-name-con">
      <div className="row poke-name">

        <img src="http://pixelartmaker.com/art/797ff81281c7a32.png" alt="pixel_poke"/>
        <h6 style={{float: 'left'}}>#{props.pokeId}</h6>
        <h6>{capitalizeFirstLetter(props.pokeName)}</h6>
      </div>
      <div className="row poke-alt-name">
        <h6>Entrancing Pokemon</h6>
      </div>
    </div>
    <div className="row poke-type-con">
      <TypeList pokeTypes={props.pokeTypes}/>
    </div>
    <div className="row poke-body-con">
      <div className="row">
        <span>HT</span>
        <h6>{props.pokeHeight}ft</h6>
      </div>
      <div className="row">
        <span>WT</span>
        <h6>{props.pokeWeight}lbs</h6>
      </div>
    </div>
  </div>);

}

function PokeDesc(props) {
  return (<div className="row">
    <h2>Pokemon description</h2>
    <p>{props.pokeDesc}</p>
  </div>);
}

class PokeInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      this.props.updatePokemon(e);
      console.log('Did it');
    } else {
      console.log('nah');
    }
  }

  render(props) {
    return (<div className="row">
      <input className="u-full-width" type="text" onChange={this.handleChange} onKeyUp={this.handleEnter} placeholder="Pokemon name or #"/>
    </div>);
  }
}

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeUrlGeneral: 'http://pokeapi.salestock.net/api/v2/pokemon/1/',
      pokeUrlSpecific: 'http://pokeapi.salestock.net/api/v2/pokemon-species/1/',
      pokemonId: '',
      pokemonName: '',
      pokemonWeight: '',
      pokemonHeight: '',
      pokemonDesc: '... Loading',
      pokemonTypes: []
    };

    this.updatePokemon = this.updatePokemon.bind(this);

    this.requestAPI();
  }

  requestAPI() {
    console.log('API request');
    fetch(this.state.pokeUrlGeneral).then(results => {
      return results.json();
    }).then(data => {
      const pokeArrayNew = [];



      this.setState({pokemonName: data.name, pokemonId: data.id, pokemonWeight: data.weight, pokemonHeight: data.height, pokemonTypes: data.types});

      console.log('General', data);
    });

    fetch(this.state.pokeUrlSpecific).then(results => {
      return results.json();
    }).then(data => {
      this.setState({pokemonDesc: data.flavor_text_entries[1].flavor_text});
      console.log('Specific', data);
    });
  }

  parseUrl(id, type) {
    if (type === 'general') {
      return 'http://pokeapi.salestock.net/api/v2/pokemon/' + id + '/';
    } else if (type === 'specific') {
      return 'http://pokeapi.salestock.net/api/v2/pokemon-species/' + id + '/';
    } else {
      console.log('Not a right id');
    }
  }

  updatePokemon(e) {
    e.preventDefault();
    console.log('Called updatePokemon()');
    let input = e.target.value;
    this.setState({
      pokeUrlGeneral: this.parseUrl(input, 'general'),
      pokeUrlSpecific: this.parseUrl(input, 'specific')
    });
    this.requestAPI();
  }
  render(props) {
    const pokeName = this.state.pokemonName;
    const pokeId = this.state.pokemonId;
    const pokeWeight = this.state.pokemonWeight;
    const pokeHeight = this.state.pokemonHeight;
    const pokeDesc = this.state.pokemonDesc;
    const pokeTypes = this.state.pokemonTypes;
    const pokeImg = 'https://img.pokemondb.net/artwork/' + pokeName + '.jpg';

    return (<div className="container pokedex">
      {
        pokeName
          ? (<div>
            <Header/>
            <div className="row">
              <PokeImg pokeImg={pokeImg}/>
              <PokeInfo pokeName={pokeName} pokeId={pokeId} pokeTypes={pokeTypes} pokeWeight={pokeWeight} pokeHeight={pokeHeight}/>
            </div>
            <PokeDesc pokeDesc={pokeDesc}/>
            <PokeInput updatePokemon={this.updatePokemon} pokeName={pokeName}/>
          </div>)
          : (<h2>Loading Pokemon...</h2>)
      }
    </div>);

  }
}
