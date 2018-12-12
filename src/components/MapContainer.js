import React, { Component } from 'react';
import Map from "./Map.js"
import MapDescription from "./MapDescription.js"
import HistoryEventDescription from "./HistoryEventDescription.js"
import NewHistoricalEventForm from "./NewHistoricalEventForm"


class MapContainer extends Component {
  state = {
    showEventDescription: false,
    historyEventDescriptionText: "",
    clickedLatitude: "",
    clickedLongitude: ""
  }

  renderEventDescription = (descriptionText) => {
    this.setState({showEventDescription: true, historyEventDescriptionText: descriptionText})
  }

  removeEventDescription = () => {
    this.setState({showEventDescription: false, historyEventDescriptionText: "" })
  }

  sendClickedLatLngToForm = (clickedLatitude, clickedLongitude) => {
    this.setState({clickedLatitude, clickedLongitude})
  }

  render() {
    console.log("MapContainer props are:",this.props)
    return (
      <div className="map-container">
        { this.props.mapData === undefined ? null:  <Map
            renderEventDescription={this.renderEventDescription}
            removeEventDescription={this.removeEventDescription}
            mapData={this.props.mapData}
            sendClickedLatLngToForm={this.sendClickedLatLngToForm}
          />}
          {this.state.showEventDescription ? <HistoryEventDescription text={this.state.historyEventDescriptionText}/> : null}
          <MapDescription mapDescription={this.props.mapDescription}/>
          {this.props.mapData === undefined ? null :<NewHistoricalEventForm
            addHistoricalEventToMapDataState={this.props.addHistoricalEventToMapDataState}
            mapId = {this.props.mapData.id}
            clickedLatitude = {this.state.clickedLatitude}
            clickedLongitude = {this.state.clickedLongitude}
          />}
      </div>
    );
  }

}

export default MapContainer;