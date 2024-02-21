import { fonts } from '@/constants/fonts'
import { ChooseWeatherIcon } from '@/utils/meteorology'
import { capitalizeString } from '@/utils'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native'

import Colors from '@/constants/Colors'
import { useWeather } from '@/contexts/LocationContext'
import { useTranslation } from 'react-i18next'

export function Meteorology() {
	const { t } = useTranslation()
	const { data, isLoading } = useWeather()
	const WeatherIcon: any = data && ChooseWeatherIcon(data?.today.icon_id)

	return (
		<>
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<Text style={styles.textTitle}>
						{t('screens.home.meteorology.title')}
					</Text>
					<View style={{ paddingVertical: 10, flex: 1 }}>
						<View style={styles.cardMeteorlogia}>
							{isLoading && <ActivityIndicator color="white" />}
							{data && (
								<View style={styles.currentMet}>
									<WeatherIcon width={100} height={100} />
									<View>
										<View style={styles.currentMetView}>
											<Text style={styles.currentMetText}>Max</Text>
											<Text style={styles.currentMetText}>Min</Text>
										</View>
										<Text style={styles.mainTitle}>
											{data?.today.max}º/{data?.today.min}º
										</Text>
										<Text style={styles.descriptionText}>
											{data?.today.description &&
												capitalizeString(data?.today.description)}
										</Text>
									</View>
								</View>
							)}
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.ScrollviewCards}
							>
								{data?.nextDays.map((item, i) => {
									const IconSVG = ChooseWeatherIcon(item.icon_id)
									return (
										<View
											key={i}
											style={{
												alignItems: 'center',
												width: 140,
											}}
										>
											<Text style={styles.mainWeatherText}>
												{String(item?.date)}
											</Text>
											<IconSVG style={styles.svgMainSvg} height={60} />
											<Text style={styles.mainTextGraus}>
												{item.max}º/{item.min}º
											</Text>
										</View>
									)
								})}
							</ScrollView>
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
						<Image
							source={require('@/assets/Icons/JOGABETS-Logo.png')}
							alt="joga betis"
							style={styles.cardWhitesmoke}
						/>
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
		paddingTop: 30,
		paddingBottom: 14,
		paddingHorizontal: 20,
	},
	currentMet: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 40,
	},
	currentMetView: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 40,
	},
	currentMetText: {
		color: Colors.light.white,
		fontFamily: fonts.fontFamyle.Gilroy_light,
		textTransform: 'uppercase',
	},
	mainTitle: {
		color: Colors.light.white,
		fontSize: fonts.size.xl,
		fontFamily: fonts.fontFamyle.Gilroy_light,
		textAlign: 'center',
	},
	descriptionText: {
		color: Colors.light.white,
		fontSize: fonts.size.sm,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	ScrollviewCards: {
		paddingTop: 20,
		paddingRight: 40,
	},
	mainWeatherText: {
		color: Colors.light.white,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		height: 23,
	},
	svgMainSvg: {
		marginVertical: 6,
		alignSelf: 'center',
		fontSize: fonts.size.lg,
	},
	mainTextGraus: {
		color: Colors.light.white,
		textAlign: 'center',
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.sm,
		justifyContent: 'center',
	},

	mainCardWhiteSmokeContainer: {
		width: 198,
		flexDirection: 'row',
		gap: 6,
		paddingVertical: 10,
	},
	cardWhitesmoke: {
		flex: 1,
		height: 48,
		backgroundColor: Colors.light.smokeWhite,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
