import Colors from '@/constants/Colors'

import Lupa from '@/assets/Icons/lupa.svg'
import Svg1273 from '@/assets/Icons/svg1273.svg'

import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import { fonts } from '@/constants/fonts'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BTN_WIDTH_AND_HEIGT = 50

export const FooterModular = ({ page, total, setPage }) => {
	const progressPage = useSharedValue(0)
	const minPage = useSharedValue(1)
	const maxPage = useSharedValue(total)

	const progressZoom = useSharedValue(0)
	const minZoom = useSharedValue(1)
	const maxZoom = useSharedValue(100)

	return (
		<View style={styles.footer}>
			<Text style={styles.footerText}>
				{page}/{total}
			</Text>
			<View style={styles.footerPages}>
				<Slider
					progress={progressPage}
					minimumValue={minPage}
					maximumValue={maxPage}
					theme={{
						disableMinTrackTintColor: Colors.light.white,
						maximumTrackTintColor: Colors.light.white,
						minimumTrackTintColor: Colors.light.darkSlateGray,
						cacheTrackTintColor: Colors.light.charcoal,
						bubbleBackgroundColor: Colors.light.sunsetOrange,
					}}
					bubbleTranslateY={-30}
					containerStyle={{
						width: '100%',
						height: 8,
						borderRadius: 7,
						overflow: 'hidden',
					}}
					bubble={(s: number) => Math.floor(s).toString()}
					onValueChange={(value) => {
						setPage(value)
					}}
				/>
			</View>
			<View style={styles.footerRight}>
				<Slider
					progress={progressZoom}
					minimumValue={minZoom}
					maximumValue={maxZoom}
					theme={{
						disableMinTrackTintColor: Colors.light.white,
						maximumTrackTintColor: Colors.light.white,
						minimumTrackTintColor: Colors.light.darkSlateGray,
						cacheTrackTintColor: Colors.light.charcoal,
						bubbleBackgroundColor: Colors.light.sunsetOrange,
					}}
					bubbleTranslateY={-30}
					containerStyle={{
						width: '100%',
						height: 8,
						borderRadius: 7,
						overflow: 'hidden',
					}}
					bubble={(s: number) => Math.floor(s).toString()}
				/>
				<TouchableOpacity style={styles.btn}>
					<Lupa />
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn}>
					<Svg1273 />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	btnView: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		width: BTN_WIDTH_AND_HEIGT,
		height: BTN_WIDTH_AND_HEIGT,
		alignItems: 'center',
		justifyContent: 'center',
	},

	footer: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 30,
		backgroundColor: Colors.light.sunsetOrange,
		height: 68,
	},
	footerPages: {
		flex: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 20,
	},
	footerRight: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 20,
	},

	footerText: {
		fontSize: fonts.size.lg,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.white,
	},
	fullScreean: {
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
		width: BTN_WIDTH_AND_HEIGT,
		height: BTN_WIDTH_AND_HEIGT,
	},
})
