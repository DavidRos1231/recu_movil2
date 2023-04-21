import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react'
import IndexStack from "./IndexStack";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ProfileStack} from "./ProfileStack";
import {MapStack} from "./MapStack";


const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    const [session, setSession] = useState(null);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setSession(!!user)
        })
        setSession(true)
    },[])

    return session ? (

        <>
            <Tab.Navigator screenOptions={({route}) => ({
                headerShown: false, tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "black",
                tabBarIcon: ({color, size}) => showIcons(route, color, size)
            })}>
                <Tab.Screen name="index" component={IndexStack} options={{title: "Contactos"}}/>
                <Tab.Screen name="profile" component={ProfileStack} options={{title: "Perfil"}}/>
                <Tab.Screen name="map" component={MapStack} options={{title: "Mapa"}}/>
            </Tab.Navigator>
        </>


    ) :
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false, tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "black",
            tabBarIcon: ({color, size}) => showIcons(route, color, size)
        })}>
            <Tab.Screen name="index" component={IndexStack} options={{title: "Inicio"}} />
        </Tab.Navigator>

}

function showIcons(route, color, size) {
    let icon;
    if (route.name === "index") {
        icon = "account-group"
    }
    if (route.name === "profile") {
        icon = "account-circle"
    }

    if (route.name === "map") {
        icon = "map"

    }


    return (
        <Icon type='material-community' name={icon}
              color={color} size={size}/>
    )
}