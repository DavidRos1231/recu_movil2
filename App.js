import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import {LogBox} from "react-native";
import { app } from './src/utils/firebase';


LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
    </>
  );
}

