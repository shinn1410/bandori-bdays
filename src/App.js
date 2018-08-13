import React, { Component } from 'react';
import Bday from './Bday';
import './App.css';

export default class App extends Component {
  render() {
    console.log("Entered App.render()")
    return (
      <div className="app">
        <Bday id="mainTable" />
      </div>
    );
  }
}
