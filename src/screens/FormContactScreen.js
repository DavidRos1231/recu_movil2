import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import React, { useState } from 'react';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const FormContactScreen = (props) => {
	const {item} = props.route.params;

	console.log('item ', item);
	const navigation = useNavigation();

	const dbRef = ref(getDatabase());
	const [origin, setOrigin] = React.useState({
		latitude: 18.95104,
		longitude: -99.193285,
	});

	const [nombre, setNombre] = useState(item ? item.nombre : '');
	const [telefono, setTelefono] = useState(item ? item.telefono : '');
	const [latitud, setLatitud] = useState(item ? item.latitud : 1);
	const [longitud, setLongitud] = useState(item ? item.longitud : '');

	const writeUserData = async (nombre, telefono, latitud, longitud) => {

		try {
			let correo = getAuth().currentUser.email;
			correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

			if (item) {
				const db = getDatabase();
				const snapshot = await get(child(dbRef, `contactos/` + correo + '/' + item.id));

				if (snapshot.exists()) {
					await set(ref(db, 'contactos/' + correo + '/' + item.id), {
						id: item.id,
						nombre: nombre,
						telefono: telefono,
						latitud: latitud,
						longitud: longitud,
					});
				} else {
					console.error('El elemento no existe en la base de datos.');
				}

				navigation.navigate('indexS');
			} else {
				const db = getDatabase();
				const numIdRef = ref(db, 'numId/' + correo); // Referencia al contador de id

				// Obtener el valor actual del contador de id
				const numIdSnapshot = await get(numIdRef);
				let numId = 1; // Valor predeterminado si no existe el contador de id

				if (numIdSnapshot.exists()) {
					numId = numIdSnapshot.val();
				}

				await set(ref(db, 'contactos/' + correo + '/' + numId), {
					id: numId,
					nombre: nombre,
					telefono: telefono,
					latitud: latitud,
					longitud: longitud,
				});

				// Incrementar el contador de id en 1
				await set(numIdRef, numId + 1);

				navigation.navigate('indexS');
			}

		/*try {
			let correo = getAuth().currentUser.email;
			correo = correo.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

			if (item) {
				let numId = 1;
				const db = getDatabase();
				const snapshot = await get(
					child(dbRef, `contactos/` + correo + item?.id)
				);

				if (snapshot.exists()) {
					numId = snapshot.val().id;
				}

				await set(ref(db, 'contactos/' + correo + '/' + numId), {
					nombre: nombre,
					telefono: telefono,
					latitud: latitud,
					longitud: longitud,
					id: numId,
				});

				navigation.navigate('indexS');
			} else {
				let numId = 1;
				get(child(dbRef, `contactos/` + correo))
					.then((snapshot) => {
						if (snapshot.exists()) {
							const data = snapshot.val();
							// Obtener el número de elementos en el objeto
							const conteo = Object.keys(data).length;
							numId = conteo + 1;

							const db = getDatabase();
							set(ref(db, 'contactos/' + correo + '/' + numId), {
								id: numId,
								nombre: nombre,
								telefono: telefono,
								longitud: longitud,
								latitud: latitud,
							});
						} else {
							numId = 1;
							const db = getDatabase();
							set(ref(db, 'contactos/' + correo + '/' + numId), {
								id: numId,
								nombre: nombre,
								telefono: telefono,
								latitud: latitud,
								longitud: longitud,
							});
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}*/

			Toast.show({
				type: 'success',
				position: 'bottom',
				text1: item ? 'Contacto actualizado' : 'Contacto registrado',
				text2: item
					? 'Se ha actualizado el contacto correctamente'
					: 'Se ha registrado el contacto correctamente',
			});
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			nombre: item ? item.nombre : '',
			telefono: item ? item.telefono : '',
			latitud: item ? item.latitud : origin.latitude,
			longitud: item ? item.longitud : origin.longitude,
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			//telefono obligatorio no mayor a 10 digitos y no menor a 10
			telefono: Yup.string()
				.required('El telefono es obligatorio')
				.min(10, 'El telefono debe tener 10 digitos')
				.max(10, 'El telefono debe tener 10 digitos'),
		}),
		validateOnChange: false,
		onSubmit: async (formData) => {
			try {
				await writeUserData(
					formData.nombre,
					formData.telefono,
					formData.latitud,
					formData.longitud
				);
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

	// console.log(origin);
	return (
		<View style={styles.viewForm}>
			<Input
				placeholder='Nombre'
				containerStyle={styles.input}
				// onChangeText={(nombre) => setNombre(nombre)}
				onChangeText={(nombre) =>
					formik.setFieldValue('nombre', nombre)
				}
				errorMessage={formik.errors.nombre}
				value={formik.values.nombre}
			/>
			<Input
				placeholder='Telefono'
				keyboardType='numeric'
				maxLength={10}
				containerStyle={styles.input}
				onChangeText={(text) => formik.setFieldValue('telefono', text)}
				errorMessage={formik.errors.telefono}
				value={formik.values.telefono}
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
				title={item ? 'Actualizar contacto' : 'Agregar contacto'}
				containerStyle={styles.containerBtn}
				buttonStyle={styles.btn}
				onPress={formik.handleSubmit}
				loading={formik.isSubmitting}
			/>
		</View>
	);
};
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
