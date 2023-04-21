import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-toast-message'


export default function RegisterForm() {
  const navigation = useNavigation()
  const irLogin = () => {
    navigation.navigate('loginS')
  }


  const [password, setPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);

  const showPass = () => {
    setPassword(!password)
  }

  const showRepeatPass = () => {
    setRepeatPassword(!repeatPassword)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validateOnChange: false,
    onSubmit: async (formData) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth,
          formData.email, formData.password)
        navigation.goBack()
        console.log("registrado exitosamente")
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text: "Error al registrar el usuario"
        })
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Formato no valido").required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
      repeatPassword: Yup.string().required("El repetir la contraseña es obligatorio").oneOf([Yup.ref('password')], "Las contraseñas no coinciden").min(6, "La contraseña debe tener al menos 6 caracteres")
    })
  })

  return (
    <View style={styles.viewForm}>
      <Input placeholder='Email'
        leftIcon={<Icon
          type='material-community'
          name='at' />}
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input placeholder='Contraseña'
        leftIcon={{ type: 'material-community', name: 'lock-outline' }}
        secureTextEntry={password ? false : true}
        rightIcon={<Icon type="material-community" name={password ? "eye-off-outline" : "eye-outline"}
          onPress={showPass} />}
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input placeholder='Repetir Contraseña'
        leftIcon={{ type: 'material-community', name: 'lock-outline' }}
        secureTextEntry={repeatPassword ? false : true}
        rightIcon={<Icon type="material-community" name={repeatPassword ? "eye-off-outline" : "eye-outline"}
          onPress={showRepeatPass} />}
        onChangeText={text => formik.setFieldValue('repeatPassword', text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button title='Registrar' onPress={formik.handleSubmit} buttonStyle={styles.btn} loading={formik.isSubmitting} />
      <Text style={styles.login} onPress={irLogin} >¿Ya tienes una cuenta? Inicia Sesión</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  TextForm: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewForm: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    textAlign: 'center',
    padding: 10,
    paddingBottom: 20,
  },
  login: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    borderRadius: 10,
    backgroundColor: '#00a680',
  }
})