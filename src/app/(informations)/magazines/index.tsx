import Colors from '@/constants/Colors'
import React from 'react'
import { ArraySectios } from '@/@types/interfaces'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import { View, ScrollView, StyleSheet } from 'react-native'

const font_size = fonts.size.md
const width = 220
const height = 128.5

const sections: ArraySectios = [
	{
		color: Colors.light.mutedGreen,
		href: '/(informations)/magazines/8' as Route<string>,
		cardTitles: ['Xonguila'],
		img: {
			imgType: 'img',
			x: -55,
			y: 50,
			fit: 'contain',
			height: 140,
			width: 200,
			image_url_import: require('@/assets/Thumbnails/assets_456.png'),
		},
	},
	{
		color: Colors.light.sunflowerYellow,
		href: '/(informations)/magazines/8' as Route<string>,
		cardTitles: ['Índico'],
		img: {
			imgType: 'img',
			x: -55,
			y: 50,
			fit: 'contain',
			height: 140,
			width: 200,
			image_url_import: require('@/assets/Thumbnails/assets_458.png'),
		},
	},
	{
		color: Colors.light.alternativeBlue,
		href: '/(informations)/magazines/8' as Route<string>,
		cardTitles: ['Exame'],
		img: {
			imgType: 'img',
			x: -55,
			y: 50,
			fit: 'contain',
			height: 140,
			width: 200,
			image_url_import: require('@/assets/Thumbnails/assets_460.png'),
		},
	},
]

export default function Magazines() {
	return (
		<View>
			<HeaderModular isDefault={false} title="Revistas" />
			<ScrollView contentContainerStyle={styles.scrollView}>
				{sections.map((item, i) => {
					return (
						<CardModular
							key={i}
							color={Colors.light.lavenderBlush}
							font_size={font_size}
							height={height}
							width={width}
							href={item.href}
							cardTitles={item.cardTitles}
							img={item.img}
						/>
					)
				})}
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	scrollView: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 50,
		paddingVertical: 42,
		gap: 20,
		flexWrap: 'wrap',
	},
	text: {
		fontSize: 42,
	},
})
