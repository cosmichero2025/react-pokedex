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

  let typeColor = 'black';

  switch (props.value) {
    case 'normal':
      typeColor = '#A8A77A';
      break;
    case 'fire':
      typeColor = '#EE8130';
      break;

    case 'water':
      typeColor = '#6390F0';
      break;

    case 'electric':
      typeColor = '#F7D02C';
      break;

    case 'grass':
      typeColor = '#7AC74C';
      break;

    case 'ice':
      typeColor = '#96D9D6';
      break;

    case 'fighting':
      typeColor = '#C22E28';
      break;

    case 'poison':
      typeColor = '#A33EA1';
      break;

    case 'ground':
      typeColor = '#E2BF65';
      break;

    case 'flying':
      typeColor = '#A98FF3';
      break;

    case 'psychic':
      typeColor = '#F95587';
      break;

    case 'bug':
      typeColor = '#A6B91A';
      break;

    case 'rock':
      typeColor = '#B6A136';
      break;

    case 'ghost':
      typeColor = '#735797';
      break;

    case 'dragon':
      typeColor = '#6F35FC';
      break;

    case 'dark':
      typeColor = '#705746';
      break;

    case 'stell':
      typeColor = '#B7B7CE';
      break;

    case 'fairy':
      typeColor = '#D685AD';
      break;

    default:
      typeColor = '#ee1515';
  }

  return (<li>
    <div style={{
        backgroundColor: typeColor
      }}>
      <h6>{props.value}</h6>
    </div>
  </li>);
}

function TypeList(props) {
  const pokemonTypes = props.pokeTypes;

  const pokeTypesList = pokemonTypes.map((typeI) => <TypesListItem key={typeI.type.name} value={typeI.type.name}/>);
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
        <h6>#{props.pokeId}| {capitalizeFirstLetter(props.pokeName)}</h6>
      </div>
      <div className="row poke-alt-name">
        <h6>{capitalizeFirstLetter(props.pokeGen)}</h6>
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
    <p style={{ textAlign: 'left' }}>{props.pokeDesc}</p>
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
      this.setState({inputValue: ''});
      this.props.updatePokemon(e);
      console.log('Input field input confirmation')
    } else {
      return;
    }
  }

  render(props) {
    return (<div className="row">
      <input className="u-full-width" value={this.state.inputValue} type="text" onChange={this.handleChange} onKeyUp={this.handleEnter} placeholder="Pokemon name or #"/>
    </div>);
  }
}

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    // http://pokeapi.salestock.net/api/v2/pokemon/1/
    this.state = {
      pokeUrlGeneral: 'https://pokeapi.co/api/v2/pokemon/1/',
      pokeUrlSpecific: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      pokemonId: '',
      pokemonName: '',
      pokemonWeight: '',
      pokemonHeight: '',
      pokemonGen: '',
      pokemonDesc: '... Loading',
      pokemonTypes: [],
    };

    this.handleErrors = this.handleErrors.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
  }

  handleErrors(response) {
    if (!response.ok) {
      this.setState({
        pokemonName: 'Nonexistant',
        pokemonId: '0',
        pokemonGen: 'Generation 0',
        pokemonDesc: 'None'
      });
      throw Error(response.statusText);
      return;
    }
    return response;
  }

  requestAPI() {
    console.log('API request');

    fetch(this.state.pokeUrlGeneral).then(this.handleErrors).then(results => {
      return results.json();
    }).then(data => {
      this.setState((prevState, props) => ({
          pokemonName: data.name, pokemonId: data.id, pokemonWeight: data.weight, pokemonHeight: data.height, pokemonTypes: data.types
      }));
      console.log('General Pokemon Data: ', data);
    }).catch(error => {
      console.log('General Error: ', error);
      return;
    });

    fetch(this.state.pokeUrlSpecific).then(this.handleErrors).then(results => {
      return results.json();
    }).then(data => {
      let flavorText = data.flavor_text_entries;

      for(let i=0; i < flavorText.length; i++) {
        if(flavorText[i].language.name === "en" && flavorText[i].version.name === "alpha-sapphire") {
          this.setState({ pokemonDesc: flavorText[i].flavor_text })
        }
      }

      this.setState((prevState, props) => ({
        pokemonGen: data.generation.name,
      }));
      console.log('Specific Pokemon Data: ', data);
    }).catch(error => {
      console.log('Specific Error: ', error);
      return;
    });
  }

  parseUrl(id, type) {
    if (type === 'general') {
      return 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
    } else if (type === 'specific') {
      return 'https://pokeapi.co/api/v2/pokemon-species/' + id + '/';
    } else {
      console.log('Choose a API selector url');
    }
  }

  updatePokemon(e) {
    e.preventDefault();
    console.log('Called updatePokemon()');
    let input = e.target.value;
    this.setState({
      pokeUrlGeneral: this.parseUrl(input, 'general'),
      pokeUrlSpecific: this.parseUrl(input, 'specific'),
      pokemonGen: 'Loading ...',
      pokemonDesc: 'Loading ...'
    }, this.requestAPI);
  }

  render(props) {
    const pokeName = this.state.pokemonName;
    const pokeId = this.state.pokemonId;
    const pokeWeight = this.state.pokemonWeight;
    const pokeHeight = this.state.pokemonHeight;
    const pokeDesc = this.state.pokemonDesc;
    const pokeTypes = this.state.pokemonTypes;
    const pokeGen = this.state.pokemonGen;
    const pokeImg = 'https://img.pokemondb.net/artwork/' + pokeName + '.jpg';

    return (<div className="container pokedex">
      {
        pokeImg && pokeDesc && pokeName &&  pokeGen && pokeTypes ?
        (<div>
            <Header/>
            <div className="row">
              <PokeImg pokeImg={pokeImg}/>
              <PokeInfo pokeName={pokeName} pokeGen={pokeGen} pokeId={pokeId} pokeTypes={pokeTypes} pokeWeight={pokeWeight} pokeHeight={pokeHeight}/>
            </div>
            <PokeDesc pokeDesc={pokeDesc}/>
            <PokeInput updatePokemon={this.updatePokemon} pokeName={pokeName}/>
          </div>)
          : (<h2>Loading Pokemon...</h2>)
      }
    </div>);

  }
}
