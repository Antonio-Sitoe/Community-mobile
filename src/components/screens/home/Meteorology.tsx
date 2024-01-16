import { fonts } from '@/constants/fonts'
import { capitalizeString } from '@/utils'
import { StyleSheet, View, Text } from 'react-native'
import { ChooseWeatherIcon } from '@/utils/meteorology'
import { IResultProps, READ_WEATHER } from '@/database/actions/weather/read'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'

import Colors from '@/constants/Colors'

export function Meteorology() {
	const [weather, setWeather] = useState<IResultProps | null>(null)
	const WeatherIcon: any = weather && ChooseWeatherIcon(weather?.today.icon_id)
	async function handle() {
		try {
			const weather = await READ_WEATHER()
			if (weather) {
				setWeather(weather as never)
			}
		} catch (error) {
			console.log('[Falha ao buscar os dados de meteologia]', error)
		}
	}

	useEffect(() => {
		handle()
	}, [])

	return (
		<>
			<View style={styles.container}>
				<View style={{ flex: 1 }}>
					<Text style={styles.textTitle}>Metereologia</Text>
					<View style={{ paddingVertical: 10, flex: 1 }}>
						<View style={styles.cardMeteorlogia}>
							<View style={styles.currentMet}>
								{weather && <WeatherIcon width={100} height={100} />}
								<View>
									<View style={styles.currentMetView}>
										<Text style={styles.currentMetText}>Max</Text>
										<Text style={styles.currentMetText}>Min</Text>
									</View>
									<Text style={styles.mainTitle}>
										{weather?.today.max}º/{weather?.today.min}º
									</Text>
									<Text style={styles.descriptionText}>
										{weather?.today.description &&
											capitalizeString(weather?.today.description)}
									</Text>
								</View>
							</View>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.ScrollviewCards}
							>
								{weather?.nextDays.map((item, i) => {
									const IconSVG = ChooseWeatherIcon(item.icon_id)
									return (
										<View key={i} style={{ alignItems: 'center' }}>
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
						<TouchableOpacity
							style={styles.cardWhitesmoke}
							onPress={handle}
						></TouchableOpacity>
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
		gap: 50,
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
