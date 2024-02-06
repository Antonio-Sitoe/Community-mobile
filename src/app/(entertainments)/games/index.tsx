import { View, ScrollView } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { svg1223, svg1222, svg1221, svg1220 } from '@/assets/Icons/out'
import { ArraySectios } from '@/@types/interfaces'
import { CardModular } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import Colors from '@/constants/Colors'

export default function Games() {
	const gameInfo: ArraySectios = [
		{
			href: `/(entertainments)/games/` as Route<string>,
			cardTitles: ['Xadrez'],
			img: {
				imgType: 'svg',
				x: -7,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1220,
			},
		},
		{
			href: `/(entertainments)/games/TicTacToe` as Route<string>,
			cardTitles: ['Jogo do Galo'],
			img: {
				imgType: 'svg',
				x: -4,
				y: 68,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1221,
			},
		},
		{
			href: `/(entertainments)/games/` as Route<string>,
			cardTitles: ['Damas'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 75,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1222,
			},
		},
		{
			href: `/(entertainments)/games/` as Route<string>,
			cardTitles: ['Solitarie'],
			img: {
				imgType: 'svg',
				x: -22,
				y: 58,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: svg1223,
			},
		},
	]

	const width = 220
	const height = 128.5

	return (
		<>
			<HeaderModular isDefault={false} title="Jogos" />
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
					{gameInfo.map((item, index) => {
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
