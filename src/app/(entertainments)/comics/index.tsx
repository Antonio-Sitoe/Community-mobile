import { View, ScrollView } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'

export default function Comics() {
	const sectionsInfo: ArraySectios = [
		{
			href: `/(entertainments)/comics/${8}` as Route<string>,
			cardTitles: ['Os Informais'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_470.png'),
			},
		},
		{
			href: `/(entertainments)/comics/${8}` as Route<string>,
			cardTitles: ['Banga'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_472.png'),
			},
		},
		{
			href: `/(entertainments)/comics/${8}` as Route<string>,
			cardTitles: ['Electus'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_474.png'),
			},
		},
	]

	const width = 220
	const height = 257

	return (
		<>
			<HeaderModular isDefault={false} title="Banda Desenhada" />
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
