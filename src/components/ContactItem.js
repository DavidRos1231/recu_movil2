import React from 'react';
import {View, Text, Button} from "react-native";
import {Icon, Input} from "react-native-elements";
import {TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {db} from "../utils";
import {getAuth} from "firebase/auth";
import {child, get, getDatabase, ref, set} from "firebase/database"; // Importa TouchableOpacity para crear botones pulsables

export const ContactItem = ({item}) => {
    const navigation = useNavigation();


    const handleDelete = (id) => {
        try {
            let correo = getAuth().currentUser.email;
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            const db = getDatabase();
            set(ref(db, 'contactos/' + correo + "/" + id), {
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
                <TouchableOpacity onPress={() => navigation.navigate("formS", {screen: "formS", item})}>
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