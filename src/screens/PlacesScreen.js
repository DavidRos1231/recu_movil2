import {View, Text, FlatList, Button} from "react-native";
import {child, get, getDatabase, ref} from "firebase/database";
import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ContactItem} from "../components/ContactItem";
import {PlaceItem} from "../components/PlaceItem";

export const PlacesScreen = (props) => {
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
            get(child(dbRef, `lugares/` + correo)).then((snapshot) => {
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
    return (
        <View>
            <FlatList data={data} renderItem={({item}) => <PlaceItem item={item}/>}></FlatList>

            <Button title={"+"} Icon={"plus"} onPress={() => navigate("formPlaceS", {screen: "formPlaceS"})}></Button>
        </View>
    )
}