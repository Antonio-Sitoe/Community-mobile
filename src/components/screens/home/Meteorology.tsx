import { View, Text } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { DELETE_WEATHER } from '@/database/actions/weather/delete'
import { READ_WEATHER } from '@/database/actions/weather/read'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function Meteorology() {
	const [state, setState] = useState(null)
	async function handle() {
		const b = await READ_WEATHER()
		// const b = await DELETE_WEATHER()
		console.log(b)
	}
	async function deletell() {
		const b = await DELETE_WEATHER()
	}
	return (
		<>
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<Text style={styles.textTitle}>Metereologia</Text>
					<View style={{ paddingVertical: 10, flex: 1 }}>
						<View style={styles.cardMeteorlogia}>
							<Text>{JSON.stringify(state)}</Text>
						</View>
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
						<TouchableOpacity
							style={styles.cardWhitesmoke}
							onPress={handle}
						></TouchableOpacity>
						<TouchableOpacity
							style={styles.cardWhitesmoke}
							onPress={deletell}
						></TouchableOpacity>
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
