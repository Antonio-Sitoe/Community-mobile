import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'

interface SectionsFourProps {
	hasBackground: boolean
	title: string
	colorTitle: string
}

export function SectionsFour({
	title,
	colorTitle,
	hasBackground,
}: SectionsFourProps) {
	return (
		<View style={styles.container}>
			<Text
				style={[
					styles.textTitle,
					{
						color: colorTitle,
					},
				]}
			>
				{title}
			</Text>
			<View style={[styles.mainCards, hasBackground && styles.mainCardsBg]}>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.sunsetOrange,
		marginBottom: 8,
		paddingLeft: 10,
	},
	mainCards: {
		borderRadius: 9,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 23,
	},
	mainCardsBg: {
		backgroundColor: Colors.light.smokeWhite,
	},
	card: {
		width: 220,
		height: 128.5,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 9,
	},
})
