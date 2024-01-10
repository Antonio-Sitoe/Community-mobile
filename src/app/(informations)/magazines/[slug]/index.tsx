import { View, ScrollView } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { ArraySectios } from '@/@types/interfaces'
import { Route } from 'expo-router'

const width = 220
const height = 257

export default function MagazinesEdition() {
	const sections: ArraySectios = [
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 62'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_486.png'),
			},
		},
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 63'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_490.png'),
			},
		},
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 64'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_494.png'),
			},
		},
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 65'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_496.png'),
			},
		},
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 66'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_488.png'),
			},
		},
		{
			href: `/(informations)/magazines/${8}/${1}` as Route<string>,
			cardTitles: ['Xonguila 67'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_492.png'),
			},
		},
	]

	return (
		<>
			<HeaderModular isDefault={false} title="Revistas" />
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
					{sections.map((item, index) => {
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
