import { View, Text, ScrollView } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'
import Assets_448 from '@/assets/Thumbnails/assets_448.png'
import Assets_450 from '@/assets/Thumbnails/assets_450.png'
import Assets_452 from '@/assets/Thumbnails/assets_452.png'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'

export default function NewsPappers() {
	const sectionsInfo: ArraySectios = [
		{
			href: `/(informations)/newspapers/${8}` as Route<string>,
			cardTitles: ['Noticias'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Assets_448,
			},
		},
		{
			href: `/(informations)/newspapers/${8}` as Route<string>,
			cardTitles: ['Savana'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Assets_450,
			},
		},
		{
			href: `/(informations)/newspapers/${8}` as Route<string>,
			cardTitles: ['O Pais'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Assets_452,
			},
		},
	]

	const width = 220
	const height = 128.5

	return (
		<>
			<HeaderModular isDefault={false} title="Jornais" />
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
