import React from 'react'
import Colors from '@/constants/Colors'

import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import { CardModular } from '@/components/ui/CardModular'
import { ArraySectios } from '@/@types/interfaces'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { series_generate } from '@/utils/faker/generate_series'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { split_and_concat_string } from '@/utils'
import { useTranslation } from 'react-i18next'

export const filter = (data: any[], params: string) =>
	data.filter((item) => item.category_type === params)

const Novelas = () => {
	const { t } = useTranslation()
	const sectionsInfoRadio: ArraySectios = filter(
		series_generate.data,
		'Radionovelas',
	).map((item) => {
		return {
			href: {
				pathname: `/(entertainments)/novels/radionovels/`,
				params: {
					id: item.id,
					name: item.name,
				},
			},

			cardTitles: split_and_concat_string(item.name),
			img: {
				imgType: 'img',
				x: -170,
				y: 70,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: item.icon,
			},
		}
	})

	const sectionsInfoVideo: ArraySectios = filter(
		series_generate.data,
		'Telenovelas',
	).map((item) => {
		return {
			href: {
				pathname: `/(entertainments)/novels/telenovels` as Route<string>,
				params: {
					id: item.id,
					name: item.name,
				},
			},
			cardTitles: split_and_concat_string(item.name),
			img: {
				imgType: 'img',
				x: -170,
				y: 60,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: item.icon,
			},
		}
	})

	const width = 220
	const height = 128.5

	return (
		<>
			<HeaderModular
				isDefault={false}
				title={t('screens.home.entertainments.novels')}
			/>
			<View
				style={{
					paddingHorizontal: 45,
					marginTop: 36,
					marginBottom: 43,
				}}
			>
				<Text style={styles.textTitle}>Radionovelas</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop: 17,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 20,
						}}
					>
						{sectionsInfoRadio.map((item, index) => {
							return (
								<View key={index}>
									<CardModular
										color={Colors.light.lavenderBlush}
										font_size={fonts.size.md}
										height={height}
										width={width}
										href={item.href}
										cardTitles={item.cardTitles}
										img={item.img}
									/>
								</View>
							)
						})}
					</View>
				</ScrollView>
			</View>
			{/* Video Novels */}
			<View
				style={{
					paddingHorizontal: 45,
					marginBottom: 43,
				}}
			>
				<Text style={styles.textTitle}>Telenovelas</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop: 17,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 20,
						}}
					>
						{sectionsInfoVideo.map((item, index) => {
							return (
								<View key={index}>
									<CardModular
										color={Colors.light.lavenderBlush}
										font_size={fonts.size.md}
										height={height}
										width={width}
										href={item.href}
										cardTitles={item.cardTitles}
										img={item.img}
									/>
								</View>
							)
						})}
					</View>
				</ScrollView>
			</View>
		</>
	)
}

export default Novelas

const styles = StyleSheet.create({
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.xlsm,
		color: Colors.light.sunsetOrange,
	},
})
