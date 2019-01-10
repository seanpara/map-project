import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { addMapDataToState, selectMap } from "../actions"
import './App.css';
import Map from "./Map.js"
import MapDescription from "./MapDescription.js"
import MapContainer from "./MapContainer"
import NavBar from "./NavBar"

class App extends Component {

  state = {
    mapData: []
  }

  getMapData = () => {

    fetch("http://localhost:3000/api/v1/maps")
    .then(r => r.json())
    .then( (mapRes) => {
      this.setState((state) => {
        return {mapData: mapRes} // would make this a dispatch with the action of ADD_MAP_DATA
      })
    })
  }

  componentDidMount(){
    this.props.addMapDataToState()
    // console.log(this.props.mapData)
    this.getMapData()
  }

  // componentDidUpdate(prevProps, prevState){
  //   console.log(prevProps.selectedMap, prevState, this.props.selectedMap)
  // }

  addHistoricalEventToMapDataState = (historicalEventObj) => {
    // would make this a dispatch of ADD_EVENT_TO_MAP
    this.setState((state) => {
      return {
        mapData: state.mapData.map((mapBoxMap) => {
          if (mapBoxMap.id === historicalEventObj.map_id){
            const newMapBox = {...mapBoxMap}
            newMapBox.historical_events = [...mapBoxMap.historical_events, historicalEventObj]
            return newMapBox
          }
          else {
            return mapBoxMap
          }
        })
      }
    })
  }

  mapBasedOnURL = (mapUrl) => {
    // console.log(mapUrl)
    const mapYearNum = parseInt(mapUrl)
    const chosenMap = this.state.mapData.find((reactMap) => {
      return reactMap.year === mapYearNum
    })
    return chosenMap
    // in Redux: same process, but find map in redux store instead of component state, and call selectMap action with it
  }

  render() {
    // console.log(this.state.mapData)
    //  routes will need to be revised when redux is added
    if (this.state.mapData.length === 0) {
      return null
    }

    return (
      <Router>
        <div className="App">
          <NavBar mapData={this.state.mapData}/>
          <Route
            exact path="/"
            render={(props) => {
              return <MapContainer {...props}
                mapData={this.mapBasedOnURL(1429)}
                />
            }}
          />
          <Route
            path="/:mapYear"
            render={(props) => {
              return <MapContainer {...props}
                mapData={this.mapBasedOnURL(props.match.params.mapYear)}
                />
            }}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    selectedMap: state.selectedMap
  }
}

export default connect(mapStateToProps, {addMapDataToState, selectMap})(App)
