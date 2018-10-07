import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Location, Permissions } from "expo";
import Map from "./components/map";
import getCoffeeShops from "./utils/foursquare-api";

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

class App extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  };
  componentDidMount() {
    this.getLocationAsync();
  }
  getVenues = async () => {
    console.log(this.state.region);
    const { latitude, longitude } = this.state.region;
    console.log(latitude, longitude);
    const coffeeShops = await getCoffeeShops(latitude, longitude);
    this.setState({ coffeeShops });
  };
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({ error: "Permission to access location was denied" });
    }

    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    console.log(region);
    this.setState({ region });
    await this.getVenues();
  };
  render() {
    const { region, coffeeShops } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} places={coffeeShops} />
      </SafeAreaView>
    );
  }
}

export default App;
