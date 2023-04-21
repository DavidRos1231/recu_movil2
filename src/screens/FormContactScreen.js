import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import React, {useState} from "react";
import {Field, useFormik} from "formik";
import * as Yup from "yup";
import MapView, {Marker} from "react-native-maps";
import Toast from "react-native-toast-message";
import {getDatabase, ref, set, onValue, get, child} from "firebase/database";
import {writeUserData} from "./functions/newContact";
import { getAuth } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export const FormContactScreen = ({route}) => {
    const dbRef = ref(getDatabase());
    const [origin, setOrigin] = React.useState(
        {
            latitude: 18.951040,
            longitude: -99.193285,
        }
    );

    const {item} = route.params;


    const [nombre, setNombre] = useState(item ? item.nombre:'');
    const [telefono, setTelefono] = useState(item ? item.telefono:'');
    const [latitud, setLatitud] = useState(item ? item.latitud:1);
    const [longitud, setLongitud] = useState(item ? item.longitud: '');

    async function writeUserData(nombre, telefono, latitud, longitud) {
        try {
            let correo = getAuth().currentUser.email;
            //quitar de correo todos los caracteres especiales
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

            let numId = 1;
            get(child(dbRef, `contactos/`+correo)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Obtener el número de elementos en el objeto
                    const conteo = Object.keys(data).length;
                    numId = conteo + 1;

                    const db = getDatabase();
                    set(ref(db, 'contactos/' + correo+"/"+numId), {
                        id: numId,
                        nombre: nombre,
                        telefono: telefono,
                        longitud: latitud,
                        latitud: longitud,


                    });
                } else {
                    numId = 1;
                    const db = getDatabase();
                    set(ref(db, 'contactos/' + correo+"/"+numId), {
                        id: numId,
                        nombre: nombre,
                        telefono: telefono,
                        longitud: latitud,
                        latitud: longitud,
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }catch (e) {
            console.log(e);
        }
    }

    const formik = useFormik({
        initialValues: {
            nombre: '',
            telefono: '',
            latitud: origin.latitude,
            longitud: origin.longitude,

        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            //telefono obligatorio no mayor a 10 digitos y no menor a 10
            telefono: Yup.string().required('El telefono es obligatorio').min(10, 'El telefono debe tener 10 digitos').max(10, 'El telefono debe tener 10 digitos'),
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await writeUserData(formData.nombre, formData.telefono, formData.latitud, formData.longitud);
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Contacto registrado',
                    text2: 'Se ha registrado el contacto correctamente',
                });

            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al registrar',
                    text2: error.message,
                });
                console.log(error);
            }
        },
    });
    return (

            <View style={styles.viewForm}>
                <Input
                    placeholder='Nombre'
                    containerStyle={styles.input}
                    onChangeText={(nombre) => setNombre(nombre)}
                    errorMessage={formik.errors.nombre}
                />
                <Input
                    placeholder='Telefono'
                    keyboardType="numeric"
                    maxLength={10}
                    containerStyle={styles.input}
                    onChangeText={(text) => formik.setFieldValue('telefono', text)}
                    errorMessage={formik.errors.telefono}
                />
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.0,
                        longitudeDelta: 0.04,
                    }}
                >
                    <Marker draggable={true}
                            coordinate={origin}
                            onDragEnd={(direction) => {setOrigin(direction.nativeEvent.coordinate)
                                console.log(direction.nativeEvent.coordinate)
                                formik.setFieldValue('latitud', direction.nativeEvent.coordinate.latitude)
                                formik.setFieldValue('longitud', direction.nativeEvent.coordinate.longitude)}
                            }
                    />
                </MapView>

                <Button
                    title='Registrar contacto'
                    containerStyle={styles.containerBtn}
                    buttonStyle={styles.btn}
                    onPress={formik.handleSubmit}
                    loading={formik.isSubmitting}
                />

            </View>


    )
}
const styles = StyleSheet.create({
    viewForm: {
        marginVertical: 30,
        paddingHorizontal: 15,
        paddingTop: 40,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 15,
    },
    icon: {
        color: 'gray',
    },
    containerBtn: {
        paddingTop: 20,
        width: '70%',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: 'green',
        borderRadius: 40,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: "50%",
    },
});






