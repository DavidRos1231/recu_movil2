import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MapScreen} from "../screens/MapScreen";


const Stack = createNativeStackNavigator();

export const MapStack = (props) => {
    const {navigation} = props
    const {navigate} = navigation
    return (
        <Stack.Navigator>
            <Stack.Screen name={"mapS"} component={MapScreen} options={{title:"Mapa"}}/>
        </Stack.Navigator>
    )
}