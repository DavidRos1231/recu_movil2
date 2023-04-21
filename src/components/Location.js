import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";

export default function Location() {
    const [location, setLocation] = useState({
        latitude: 18.8502885,
        longitude: -99.2029242,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0521,
    });

    const [newPosition, setNewPosition] = useState({
        latitude: 18.8502885,
        longitude: -99.2029242,
    })

    const obtainLocation = (coordinate) => {
        console.log("Coordenadas: ", coordinate);
    };

    const changeLocation = () => {

    }

    return (
        <View style={styles.viewContainer}>
            <MapView
                style={styles.map}
                region={location}
                onPress={(e) => obtainLocation(e.nativeEvent.coordinate)}
            >
                <Marker
                    key={1}
                    coordinate={{ latitude: 18.8502885, longitude: -99.2029242 }}
                    title="UTEZ"
                    description="Me cagan los halcones"
                    // image={{uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png"}}
                >
                    <Image
                        style={styles.logo}
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Logo-utez.png",
                        }}
                    />
                </Marker>
                <Circle
                    radius={1000}
                    center={{ latitude: 18.8502885, longitude: -99.2029242 }}
                    strokeWidth={2}
                    strokeColor="#0D5BD7"
                    fillColor={"rgba(13, 91, 215, 0.2)"}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        height: "auto",
        padding: 0,
        marginBottom: -75,
        borderRadius: 15,
    },
    map: {
        width: "95%",
        height: "85%",
    },
    logo: {
        height: 50,
        width: 100,
    },
});
