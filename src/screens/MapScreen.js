import {StyleSheet, View, Text} from "react-native";
import  * as React from "react";
import MapView, {Marker} from "react-native-maps";

export const MapScreen = (props) => {
    const[origin, setOrigin] = React.useState({
        latitude:18.849321436984003 ,
        longitude: -99.20020191371043,
    
    });

    return (
        <View>
             <MapView
        style={styles.map}
        initialRegion={{
            latitude:18.85079106954406, 
            longitude:-99.20034926192342,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude:18.85079106954406, longitude:-99.20034926192342 }}
          title={'UTEZ'}
        />
      </MapView>
        </View>
    )

}

const styles = StyleSheet.create({
map: {
    height: "100%",
    width: "100%",
},
})