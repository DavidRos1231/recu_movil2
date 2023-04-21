import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import RegisterForm from '../components/Auth/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function RegisterScreen() {
    return (
      <KeyboardAwareScrollView style={styles.keyboard}>
        <View style={styles.view}>
          <Image source={require('../../assests/img/desconocido.png')}
            style={styles.image} />
          <Text style={styles.title}>Registro nuevo usuraio</Text>
          <View>
            <RegisterForm style={styles.formText} />
          </View>
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
    },
    keyboard: {
      backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
  })