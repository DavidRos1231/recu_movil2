import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {child, get, getDatabase, ref, set} from "firebase/database";
import React, {useState} from "react";
import {getAuth} from "firebase/auth";
import {Button, Input} from "react-native-elements";
import MapView, {Marker} from "react-native-maps";
import {useFormik} from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

export const ForPlaceScreen = (props) => {
    const {item} = props.route.params;

    console.log('item ', item);
    const navigation = useNavigation();

    const dbRef = ref(getDatabase());
    const [origin, setOrigin] = React.useState({
        latitude: 18.95104,
        longitude: -99.193285,
    });
    const [nombre, setNombre] = useState(item ? item.latitud : '');
    const [latitud, setLatitud] = useState(item ? item.nombre : '');
    const [longitud, setLongitud] = useState(item ? item.longitud : '');

    const writePlaceData = async (latitud, longitud, nombre) => {
        /*try {
            let correo = getAuth().currentUser.email;
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

            if (item) {
                let numId = 100;
                const db = getDatabase();
                const snapshot = await get(
                    child(dbRef, `lugares/` + correo + item?.id)
                );

                if (snapshot.exists()) {
                    numId = snapshot.val().id;
                }

                await set(ref(db, 'lugares/' + correo + '/' + numId), {
                    nombre: nombre,
                    latitud: latitud,
                    longitud: longitud,
                    id: numId,
                });

                navigation.navigate('placesS');
            } else {
                let numId = 1;
                get(child(dbRef, `lugares/` + correo))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            // Obtener el número de elementos en el objeto
                            const conteo = Object.keys(data).length;
                            numId = conteo + 1;

                            const db = getDatabase();
                            set(ref(db, 'lugares/' + correo + '/' + numId), {
                                id: numId,
                                nombre: nombre,
                                latitud: latitud,
                                longitud: longitud,
                            });
                        } else {
                            numId = 1;
                            const db = getDatabase();
                            set(ref(db, 'lugares/' + correo + '/' + numId), {
                                id: numId,
                                nombre: nombre,
                                latitud: latitud,
                                longitud: longitud,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }*/
        try {
            let correo = getAuth().currentUser.email;
            correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

            if (item) {
                const db = getDatabase();
                const snapshot = await get(child(dbRef, `lugares/` + correo + '/' + item.id));

                if (snapshot.exists()) {
                    await set(ref(db, 'lugares/' + correo + '/' + item.id), {
                        id: item.id,
                        nombre: nombre,
                        latitud: latitud,
                        longitud: longitud,
                    });
                } else {
                    console.error('El elemento no existe en la base de datos.');
                }

                navigation.navigate('placesS');
            } else {
                const db = getDatabase();
                const numIdRef = ref(db, 'numId/' + correo); // Referencia al contador de id

                // Obtener el valor actual del contador de id
                const numIdSnapshot = await get(numIdRef);
                let numId = 1; // Valor predeterminado si no existe el contador de id

                if (numIdSnapshot.exists()) {
                    numId = numIdSnapshot.val();
                }
console.log('numId ', numId);
                await set(ref(db, 'lugares/' + correo + '/' + numId), {
                    id: numId,
                    nombre: nombre,
                    latitud: latitud,
                    longitud: longitud,
                });

                // Incrementar el contador de id en 1
                await set(numIdRef, numId + 1);

                navigation.navigate('placesS');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            nombre: item ? item.nombre : '', // Cambiar item.nombre a formik.values.nombre
            latitud: item ? item.latitud : origin.latitude, // Cambiar item.latitud a formik.values.latitud
            longitud: item ? item.longitud : origin.longitude,
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            //telefono obligatorio no mayor a 10 digitos y no menor a 10
        }),
        validateOnChange: false,
        onSubmit: async (formData) => {
            try {
                await writePlaceData(
                    formData.latitud,
                    formData.longitud,
                    formData.nombre
                );
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'CLugar registrado',
                    text2: 'Se ha registrado el lugar correctamente',
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
                placeholder='nombre'
                containerStyle={styles.input}
                onChangeText={(nombre) =>
                    formik.setFieldValue('nombre', nombre)
                }
                errorMessage={formik.errors.nombre}
                value={formik.values.nombre} // Cambiar formik.values.nombre a formik.values.nombre
            />


            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: formik.values.latitud,
                    longitude: formik.values.longitud,
                    latitudeDelta: 0.0,
                    longitudeDelta: 0.04,
                }}
            >
                <Marker
                    draggable={true}
                    coordinate={{
                        latitude: formik.values.latitud,
                        longitude: formik.values.longitud,
                    }}
                    onDragEnd={(direction) => {
                        setOrigin(direction.nativeEvent.coordinate);
                        console.log(direction.nativeEvent.coordinate);
                        formik.setFieldValue(
                            'latitud',
                            direction.nativeEvent.coordinate.latitude
                        );
                        formik.setFieldValue(
                            'longitud',
                            direction.nativeEvent.coordinate.longitude
                        );
                    }}
                />
            </MapView>

            <Button
                title={item ? 'Actualizar lugar' : 'Agregar lugar'}
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    );
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
        height: '50%',
    },
});
