import React from 'react';
import {View, Text} from "react-native";

export const ContactItem = ({item}) => {
return (
        <View>
            <Text>{item.nombre}</Text>
            <Text>{item.telefono}</Text>
        </View>
    )
}