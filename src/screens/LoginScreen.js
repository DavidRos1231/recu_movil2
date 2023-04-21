
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import { Image } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const LoginScreen = (props) => {
    const navigation = useNavigation();

    // const irARegistro = () => {
    //     navigation.navigate('registerS');
    //     console.log("irARegistro")
    // };

    
    return (
        
        <KeyboardAwareScrollView style={styles.keyboard}>
            <View style={styles.view}>
                <Image source={require('../../assests/img/desconocido.png')}
                    style={styles.image} />
                <Text style={styles.title}>Iniciar Sesión</Text>
                <LoginForm />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
        borderRadius: 100,
    },
    view: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        height: "100%",
    },
    keyboard: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
