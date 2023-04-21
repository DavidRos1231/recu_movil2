import {ContactScreen} from "../screens/ContactScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";


const Stack = createNativeStackNavigator();
export const ContactStack = (props) => {
    return(
        <Stack.Navigator>
           {/* <Stack.Screen name="contactS" component={ContactScreen} options={{title:"Contacto"}}/>
            <Stack.Screen name={"FormS"} component={FormContactScreen}/>*/}
        </Stack.Navigator>
    )
}