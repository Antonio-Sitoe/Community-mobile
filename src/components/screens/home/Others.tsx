import { View, Text } from '@/components/Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts } from '@/constants/fonts'

import HandSwatch from '@/assets/Icons/HandSwatch.svg'
import Colors from '@/constants/Colors'

export function Others() {
	return (
		<View style={styles.container}>
			<Text
				style={[
					styles.textTitle,
					{
						color: Colors.light.charcoal,
					},
				]}
			>
				Outros |{' '}
				<Text
					style={{
						fontSize: 14,
						color: Colors.light.charcoal,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 6,
						fontFamily: fonts.fontFamyle.Gilroy_extraBold,
					}}
				>
					Arrasta <HandSwatch />
				</Text>
			</Text>
			<View
				style={{
					padding: 10,
					backgroundColor: Colors.light.smokeWhite,
					borderRadius: 9,
					flex: 1,
				}}
			>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						gap: 23,
						height: 'auto',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 10,
					}}
				>
					<View style={{ gap: 23 }} bgColor="transparent">
						<TouchableOpacity style={styles.card}></TouchableOpacity>
						<TouchableOpacity style={styles.card}></TouchableOpacity>
					</View>
					<View style={{ gap: 23 }} bgColor="transparent">
						<TouchableOpacity style={styles.card}></TouchableOpacity>
						<TouchableOpacity style={styles.card}></TouchableOpacity>
					</View>
					<View style={{ gap: 23 }} bgColor="transparent">
						<TouchableOpacity style={styles.card}></TouchableOpacity>
						<TouchableOpacity style={styles.card}></TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1.4,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.sunsetOrange,
		marginBottom: 8,
	},
	mainCards: {
		padding: 10,
		borderRadius: 9,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 25,
	},
	card: {
		width: 220,
		height: 128.5,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 9,
	},
})
