import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { useState } from 'react'
import { useWeather } from '@/contexts/LocationContext'
import { gen_categories, gen_videos } from '@/utils/faker/gen_categories'

export default function News() {
	const [load, setLoad] = useState(false)
	const [loadl, setLoadl] = useState(false)
	const { refetchWeather } = useWeather()
	async function genData() {
		setLoad(true)
		await gen_categories()
		refetchWeather()
		setLoad(false)
	}
	async function gen_videos_data() {
		setLoadl(true)
		await gen_videos()
		refetchWeather()
		setLoadl(false)
	}
	return (
		<>
			<HeaderModular isDefault={false} title="Noticias" />
			<Text>Lista de noticias</Text>
			<TouchableOpacity style={styles.cardWhitesmoke} onPress={genData}>
				{load && <ActivityIndicator color={Colors.light.sunsetOrange} />}
			</TouchableOpacity>
			<TouchableOpacity style={styles.cardWhitesmoke} onPress={gen_videos_data}>
				{loadl && <Text>carregar</Text>}
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	mainCardWhiteSmokeContainer: {
		flexDirection: 'row',
		gap: 6,
		paddingVertical: 10,
	},
	cardWhitesmoke: {
		width: 94,
		height: 70,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
