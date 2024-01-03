import { Alert, Button, StyleSheet, TextInput } from 'react-native'
import EditScreenInfo from '../../components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { CREATE_USER } from '@/database/actions/user/create'
import { READ_USER } from '@/database/actions/user/read'
import { UPDATE_USER } from '@/database/actions/user/update'

export default function TabOneScreen() {
	async function handleCreateUser() {
		try {
			const body = {
				name: 'antonio sitoe',
				email: 'antoniositoehl@gmail.com',
			}
			const user = await CREATE_USER(body)
			console.log('user', user)
		} catch (error) {
			console.log('error', error)
		}
	}
	async function update_user() {
		try {
			const body = {
				name: 'sonia sitoe',
				email: 'sonia@gmail.com',
			}
			const user = await UPDATE_USER(body)
			console.log('user', user)
		} catch (error) {
			console.log('error', error)
		}
	}

	async function readUser() {
		const user = await READ_USER()
		Alert.alert(JSON.stringify(user))
	}

	function deleteUser() {}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Hello world</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<Button
				onPress={handleCreateUser}
				title="criar usuario"
				color="#FF8400"
			/>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<Button onPress={readUser} title="ler usuario" color="#FF8400" />
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<Button onPress={update_user} title="atualizar usuario" color="#FF8400" />
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<Button onPress={deleteUser} title="apagar usuario" color="#FF8400" />
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/(tabs)/index.tsx" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
})
