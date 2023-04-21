import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {getAuth} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import {useNavigation} from "@react-navigation/native";

export const PlaceItem = ({item}) => {
    const navigation = useNavigation();
    const handleDelete = (id) => {
        try {
            let correo = getAuth().currentUser.email;
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            const db = getDatabase();
            set(ref(db, 'lugares/' + correo + "/" + id), {
                id: null,
                nombre: null,
                telefono: null,
                longitud: null,
                latitud: null,
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View
            style={{position: 'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{width: 90}}>{item.nombre}</Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("formPlaceS", {screen: "formPlaceS", item})}>
                    <Icon name={"edit"} type={"font-awesome"} size={20} style={{marginRight: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name={"edit"} type={"font-awesome"} size={20}
                          onPress={() => handleDelete(item.id)}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}