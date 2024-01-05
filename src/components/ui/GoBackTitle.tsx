import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from '../Themed'
import GoBack from '@/assets/Icons/goback.svg'
import { StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { useRouter } from 'expo-router'

export function GoBackTitle({ title }) {
	const { back } = useRouter()
	return (
		<TouchableOpacity style={styles.container} onPress={back}>
			<GoBack />
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 22,
	},
	text: {
		color: Colors.light.white,
		fontSize: fonts.size.xl,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
})
