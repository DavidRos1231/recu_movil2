import {Button, StyleSheet, Text, View, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import {LoginScreen} from "./LoginScreen";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import database from '@react-native-firebase/database';
import {getDatabase, ref, set, onValue, get, child} from "firebase/database";
import {ContactItem} from "../components/ContactItem";

export const IndexScreen = (props) => {
    const dbRef = ref(getDatabase());
    const {navigation} = props;
    const {navigate} = navigation;
    const [session, setSession] = useState(null);
    const [data, setData] = useState([]);

    var datos = [];


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setSession(!!user)
        })
        setSession(true)
    }, [])

    if (session) {
        try {
            let correo = getAuth().currentUser.email;
            //quitar de correo todos los caracteres especiales
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            get(child(dbRef, `contactos/` + correo)).then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    var childData = childSnapshot.val();
                    childData.key = childSnapshot.key;
                    datos.push(childData);
                })
                setData(datos);
            })
        } catch (e) {
            console.log(e);
        }
    }

    return session ? (
        <View>

            <FlatList data={data} renderItem={({item}) => <ContactItem item={item}/>}></FlatList>

            <Button title={"+"} Icon={"plus"} onPress={() => navigate("formS", {screen: "formS"})}></Button>
        </View>
    ) : <LoginScreen></LoginScreen>


}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#7f55d0",
        borderRadius: 100,
    },
    agregar: {
        backgroundColor: "#7f55d0",
        borderRadius: 100,
        width: 50
    }
});