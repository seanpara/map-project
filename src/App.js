import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./Map.js"
import MapDescription from "./MapDescription.js"
import MapContainer from "./MapContainer"
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {

  state = {
    mapData: [],
    mapDecriptions: []
  }

  getMapData = () => {
    fetch("http://localhost:3000/api/v1/maps")
    .then(r => r.json())
    .then( (mapRes) => {
      this.setState((state) => {
        return {mapData: mapRes}
      })
    })
  }

  getMapDescriptions = () => {
    fetch("http://localhost:3000/api/v1/map_descriptions")
    .then(r => r.json())
    .then( (descriptionRes) => {
      this.setState((state) => {
        return {mapDecriptions: descriptionRes}
      })
    })
  }

  componentDidMount(){
    this.getMapData()
    this.getMapDescriptions()
  }

  render() {
    return (

      <Router>
        <>
        <Route
        exact path="/"
        render={(props) => <MapContainer {...props}
          mapData={this.state.mapData[1]}
          mapDescription={this.state.mapDecriptions[1]}
          /> }
        />
        <Route
        exact path="/1399"
        render={(props) => <MapContainer {...props}
          mapData={this.state.mapData[0]}
          mapDescription={this.state.mapDecriptions[0]}
          /> }
        />
        <Route
        exact path="/1429"
        render={(props) => <MapContainer {...props}
          mapData={this.state.mapData[1]}
          mapDescription={this.state.mapDecriptions[1]}
          /> }
        />
        </>
      </Router>


    );
  }
}

export default App;


// {this.state.mapData.length === 0 && this.state.mapDecriptions[0] === undefined ?  null :
//   <MapContainer
//     }
//   />}
