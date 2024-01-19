import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { svg1224, svg1225, svg1226, svg1227 } from '@/assets/Icons/out'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'
import { CardModular } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import Colors from '@/constants/Colors'

export default function Videos() {
	const sectionsInfoRadio: ArraySectios = [
		{
			href: `/(entertainments)/videos/3` as Route<string>,
			cardTitles: ['Nutrição'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 70,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1224,
			},
		},
		{
			href: `/(entertainments)/videos/3` as Route<string>,
			cardTitles: ['Saúde'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 70,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1225,
			},
		},
		{
			href: `/(entertainments)/videos/3` as Route<string>,
			cardTitles: ['Agricultura'],
			img: {
				imgType: 'svg',
				x: -6,
				y: 65,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1226,
			},
		},
		{
			href: `/(entertainments)/videos/3` as Route<string>,
			cardTitles: ['Higiene'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 70,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1227,
			},
		},
	]

	const width = 220
	const height = 128.5

	return (
		<>
			<HeaderModular isDefault={false} title="Vídeos" />
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 50,
					paddingVertical: 42,
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
		</>
	)
}
