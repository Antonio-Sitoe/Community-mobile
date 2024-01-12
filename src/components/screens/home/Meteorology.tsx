import { View, Text } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function Meteorology() {
	return (
		<>
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<Text style={styles.textTitle}>Metereologia</Text>
					<View style={{ paddingVertical: 10, flex: 1 }}>
						<View style={styles.cardMeteorlogia}></View>
					</View>
				</View>
				<View>
					<Text
						style={[
							styles.textTitle,
							{
								color: Colors.light.sunsetOrange,
							},
						]}
					>
						Powered By
					</Text>
					<View style={styles.mainCardWhiteSmokeContainer}>
						<TouchableOpacity style={styles.cardWhitesmoke}></TouchableOpacity>
						<TouchableOpacity style={styles.cardWhitesmoke}></TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1.4,
		flexDirection: 'row',
		gap: 23,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.periwinkleGray,
		marginBottom: 8,
	},
	cardMeteorlogia: {
		backgroundColor: Colors.light.periwinkleGray,
		flex: 1,
		borderRadius: 9,
	},
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
	},
})
