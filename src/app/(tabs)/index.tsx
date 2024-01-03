import { Alert, Button, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { CREATE_USER } from '@/database/actions/user/create'
import { READ_USER } from '@/database/actions/user/read'
import { UPDATE_USER } from '@/database/actions/user/update'
import { useCounter } from '@/contexts'
import { useTranslation } from 'react-i18next'
import Colors from '@/constants/Colors'

export default function TabOneScreen() {
	const { counter, increaseCounter } = useCounter()
	const { t, i18n } = useTranslation()
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

	function deleteUser() {
		console.log('dsd')
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Hello world</Text>
			<Button onPress={increaseCounter} title={'Contagem ' + counter} />
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
			<View lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
				<View style={{ flexDirection: 'row' }}>
					<Button
						onPress={() => i18n.changeLanguage('en')}
						title="English"
						color="#FF8400"
					/>

					<Button
						onPress={() => i18n.changeLanguage('pt')}
						title="Portuguese"
						color={Colors.light.lavenderBlush}
					/>
				</View>
				<Text style={{ padding: 20 }}>{t('screens.intro.title')}</Text>
			</View>
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
