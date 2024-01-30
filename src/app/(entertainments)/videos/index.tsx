import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { svg1224, svg1225, svg1226, svg1227 } from '@/assets/Icons/out'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'
import { CardModular } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import Colors from '@/constants/Colors'
import videos from '@/utils/faker/category.json'

const width = 220
const height = 128.5

export default function Videos() {
	const [categories, setCategories] = useState(
		videos.data.filter((item) => item.type === 'videos'),
	)
	const icons = [svg1224, svg1225, svg1226, svg1227]
	const sectionsInfoRadio: ArraySectios = categories.map((category) => {
		return {
			href: `/(entertainments)/videos/${category.name}` as Route<string>,
			cardTitles: [category.name],
			img: {
				imgType: 'svg',
				x: -10,
				y: 70,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: icons[category.id - 1],
			},
		}
	})

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
