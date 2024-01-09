import { HeaderModular } from '@/components/ui/HeaderModular'
import Colors from '@/constants/Colors'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import PDF from 'react-native-pdf'
import Svg1271 from '@/assets/Icons/svg1271.svg'
import Svg1272 from '@/assets/Icons/svg1272.svg'
import Svg1273 from '@/assets/Icons/svg1273.svg'
import Lupa from '@/assets/Icons/lupa.svg'
import React, { useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import { fonts } from '@/constants/fonts'

const { width, height } = Dimensions.get('window')

const BTN_WIDTH_AND_HEIGT = 50
const PDF_WIDTH = width * 0.8
const PDF_HEIGHT = height - 200

console.log({ PDF_WIDTH, PDF_HEIGHT })

export default function Newspapers() {
	const [currentPage, setCurrentPage] = useState(1)

	const [totalPages, setTotalPages] = useState(0)
	const hideNext = currentPage >= totalPages
	const hidePreviews = currentPage <= 1
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(100)

	const pdfSource = {
		uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
		cache: true,
	}

	function onLoadComplete(pages: number, _, ob) {
		setTotalPages(pages)
		console.log(ob)
	}
	function onPageChanged(page: number) {
		console.log('Current page', page)
		setCurrentPage(page)
	}
	function goToNextPage() {
		if (currentPage >= totalPages) {
			return
		}
		console.log('NextPage', currentPage + 1)
		setCurrentPage(currentPage + 1)
	}
	function goToPreviewsPage() {
		if (currentPage <= 0) {
			return
		}
		console.log('Voltar para', currentPage - 1)
		setCurrentPage(currentPage - 1)
	}
	return (
		<>
			<HeaderModular isDefault={false} title="Jornais" />
			<View style={styles.container}>
				<View
					style={[
						styles.btnView,
						{
							paddingRight: 50,
						},
					]}
				>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							if (!hidePreviews) goToPreviewsPage()
						}}
					>
						{hidePreviews ? null : <Svg1271 />}
					</TouchableOpacity>
				</View>
				<View style={styles.pdContainer}>
					<PDF
						horizontal={true}
						enablePaging={true}
						trustAllCerts={false}
						page={currentPage}
						source={pdfSource}
						style={styles.pdf}
						onLoadComplete={onLoadComplete}
						onPageChanged={onPageChanged}
						renderActivityIndicator={() => (
							<ActivityIndicator size={60} color={Colors.light.sunsetOrange} />
						)}
					/>
				</View>
				<View
					style={[
						styles.btnView,
						{
							paddingLeft: 50,
						},
					]}
				>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							if (!hideNext) goToNextPage()
						}}
					>
						{!hideNext ? <Svg1272 /> : null}
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					{currentPage}/{totalPages}
				</Text>
				<View style={styles.footerPages}>
					<Slider
						progress={progress}
						minimumValue={min}
						maximumValue={max}
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
				</View>
				<View style={styles.footerRight}>
					<Slider
						progress={progress}
						minimumValue={min}
						maximumValue={max}
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
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: Colors.light.darkSlateGray,
		paddingHorizontal: 50,
		alignItems: 'center',
	},
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
	pdContainer: {
		flex: 1,
		width: PDF_WIDTH,
		height: PDF_HEIGHT,
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: Colors.light.darkSlateGray,
		borderWidth: 5,
		borderColor: 'blue',
	},
	pdf: {
		flex: 1,
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
