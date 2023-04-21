import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { deleteUser, getAuth, signOut } from 'firebase/auth';
import { ProfileInfo } from '../components/account/ProfileInfo';
import { Loading } from '../components/common/Loading';
import { ProfileOptions } from '../components/account/ProfileOptions';
import {DeleteForm} from '../components/account/DeleteForm';

export const ProfileScreen = () => {
	const navigation = useNavigation();
	const [visibleLoading, setVisibleLoading] = useState(false);
	const [textLoading, setTextLoading] = useState('');
	const [reaload, setReaload] = useState(false);

	const onReload = () => setReaload((prevState) => !prevState);

	const cerrarSesion = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			navigation.navigate('indexS', { screen: 'indexS' });
		} catch (error) {
			console.log(error);
		}
	};

	const eliminarCuenta = async () => {
		try {
			const auth = getAuth();
			const user = auth.currentUser;
			await deleteUser(user);
			navigation.navigate('indexS', { screen: 'indexS' });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<ProfileInfo
				setVisibleLoading={setVisibleLoading}
				setTextLoading={setTextLoading}
			/>

			<ProfileOptions onReload={onReload} />
			<Button
				title='Eliminar Cuenta'
				onPress={eliminarCuenta}
				buttonStyle={styles.button}
				titleStyle={styles.title}
			/>
			<Button
				title='Cerrar sesión'
				onPress={cerrarSesion}
				buttonStyle={styles.button}
				titleStyle={styles.title2}
			/>
			<Loading visible={visibleLoading} text={textLoading} />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: '#e3e3e3',
		borderBottomColor: '#e3e3e3',
		marginTop: 30,
		paddingVertical: 10,
	},
	title: {
		color: 'red',
	},
	title2: {
		color: '#0D5BD7',
	},
});
