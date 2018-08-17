import React, { Component } from 'react';
import './Active.css';

export default class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null
    }
  }
  componentDidMount() {
    this.setState({"character":this.props.character})
  }
  render() {
    console.log(this.state.character);
    if(this.state.character) {
      console.log(this.state.character.chibi);
      return (
        <div>
          <p>Happy Birthday</p>
          <img
            className="chibi"
            src={this.state.character.chibi}
            alt={this.state.character.name} />
          <p>{this.state.character.name}!</p>
        </div>
      );
    }
    else {
      return null;
    }
  }
}
