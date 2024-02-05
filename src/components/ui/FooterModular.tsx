import React, { useEffect } from 'react'
import Colors from '@/constants/Colors'
import Lupa from '@/assets/Icons/lupa.svg'
import Svg1273 from '@/assets/Icons/svg1273.svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { fonts } from '@/constants/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, StyleSheet } from 'react-native'
import { SliderModular } from './Slider'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue, withSpring } from 'react-native-reanimated'

const BTN_WIDTH_AND_HEIGT = 50

export const FooterModular = ({
	pages,
	slider,
	onAddZoom,
	setFullScrean,
	isFullScrean,
}) => {
	const { page, total, setPage } = pages
	const { scale, setScale } = slider

	const progressPage = useSharedValue(0)
	const minPage = useSharedValue(1)
	const maxPage = useSharedValue(total)

	useEffect(() => {
		progressPage.value = page
	}, [page, progressPage])

	if (isFullScrean) {
		return (
			<View style={styles.footerLoaderFull}>
				<TouchableOpacity
					style={[styles.btn, styles.btnWidth]}
					onPress={() => setFullScrean(false)}
				>
					<MaterialCommunityIcons
						name="fullscreen-exit"
						size={40}
						color={Colors.light.white}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={styles.footer}>
			<Text style={styles.footerText}>
				{page}/{total}
			</Text>
			<View style={styles.footerPages}>
				<Slider
					panDirectionValue={page}
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
					markStyle={{
						width: 40,
					}}
					bubble={(s: number) => Math.floor(s).toString()}
					onValueChange={(value) => {
						setPage(value)
					}}
				/>
			</View>
			<View style={styles.footerRight}>
				<SliderModular
					startFromZero
					value={scale}
					setValue={setScale}
					min={0}
					max={4}
				/>
				<TouchableOpacity style={styles.btn} onPress={onAddZoom}>
					<Lupa />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => setFullScrean(true)}
				>
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

	footerLoaderFull: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: Colors.light.darkSlateGray,
		paddingBottom: 10,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	btnWidth: {
		backgroundColor: Colors.light.ebony,
		borderRadius: 7,
	},
})
