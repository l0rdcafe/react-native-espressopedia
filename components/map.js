import React from "react";
import { StyleSheet } from "react-native";
import { MapView } from "expo";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

class Map extends React.Component {
  renderMarkers = () =>
    this.props.places.map((place, i) => (
      <MapView.Marker
        key={JSON.stringify(place)}
        title={place.venue.name}
        coordinate={{ latitude: place.venue.location.lat, longitude: place.venue.location.lng }}
      />
    ));
  render() {
    const { region } = this.props;
    console.log(region);
    return (
      <MapView style={styles.container} region={region} showsUserLocation showsMyLocationButton>
        {this.renderMarkers()}
      </MapView>
    );
  }
}

export default Map;
