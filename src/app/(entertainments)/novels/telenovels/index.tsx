import { View, ScrollView } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'

import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'

export default function NewsPappersEdition() {
	const sectionsInfo: ArraySectios = [
		{
			href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
			cardTitles: ['Noticias', '24/10/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_448.png'),
			},
		},
		{
			href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
			cardTitles: ['Noticias', '24/10/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_479.png'),
			},
		},
		{
			href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
			cardTitles: ['Noticias', '24/10/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_481.png'),
			},
		},

		{
			href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
			cardTitles: ['Noticias', '24/10/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_483.png'),
			},
		},
		{
			href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
			cardTitles: ['Noticias', '24/10/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_485.png'),
			},
		},
	]

	const width = 220
	const height = 257

	return (
		<>
			<HeaderModular isDefault={false} title="Jornal Notícias" />
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
					{sectionsInfo.map((item, index) => {
						return (
							<View key={index}>
								<CardModular
									color={Colors.light.sunsetOrange}
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
