import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PlacesScreen} from "../screens/PlacesScreen";
import {ForPlaceScreen} from "../screens/ForPlaceScreen";


const Stack = createNativeStackNavigator();
export const PlacesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="placesS" component={PlacesScreen} options={{title: "Lugares favoritos"}}/>
            <Stack.Screen name="formPlaceS" component={ForPlaceScreen} options={{title: ""}}/>
        </Stack.Navigator>
    )
}