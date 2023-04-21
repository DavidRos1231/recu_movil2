import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PlacesScreen} from "../screens/PlacesScreen";


const Stack = createNativeStackNavigator();
export const PlacesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="places" component={PlacesScreen} options={{title: "Lugares favoritos"}}/>
        </Stack.Navigator>
    )
}