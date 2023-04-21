import React from 'react';
import {View, Text} from "react-native";
import {Icon} from "react-native-elements";
import { TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native"; // Importa TouchableOpacity para crear botones pulsables

export const ContactItem = ({item}) => {
const navigation = useNavigation();


return (
    <View style={{position:'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{width: 90}}>{item.nombre}</Text>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate("formS", {screen: "formS", item})}>
                <Icon name={"edit"} type={"font-awesome"} size={20} style={{marginRight: 10}} />
            </TouchableOpacity>
            {/* Botón de Delete */}
            <TouchableOpacity>
                <Icon name={"edit"} type={"font-awesome"} size={20} style={{color: 'red'}} />
            </TouchableOpacity>
        </View>
    </View>

)
}