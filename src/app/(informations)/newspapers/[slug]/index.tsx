import { View, ScrollView, ActivityIndicator } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'

import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { useQuery } from '@tanstack/react-query'
import { READ_PDF } from '@/database/actions/pdfs/read'
import { ArraySectios } from '@/@types/interfaces'
import { useLocalSearchParams } from 'expo-router'

async function getNewsletter() {
	const pdf = await READ_PDF()
	return pdf.map((item) => ({
		id: item.id,
		file: item.file,
		type: item.type,
	}))
}

export default function NewsPappersEdition() {
	const { slug } = useLocalSearchParams()
	const { data, isLoading } = useQuery({
		queryKey: ['pdf_newsletter'],
		queryFn: getNewsletter,
		networkMode: 'always',
	})

	const sectionsInfo: ArraySectios = data?.map((item, i) => {
		return {
			href: {
				pathname: `/(informations)/newspapers/${slug}/${item.id}`,
				params: {
					file: item.file,
					title: `${slug} ${'1' + (1 + i)}/01/2024`,
				},
			},
			cardTitles: [slug, '1' + (1 + i) + '/01/2024'],
			img: {
				imgType: 'img',
				x: -140,
				y: 100,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: require('@/assets/Thumbnails/assets_479.png'),
			},
		}
	})

	// [
	// 	{
	// 		href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
	// 		cardTitles: ['Noticias', '17/01/2024'],
	// 		img: {
	// 			imgType: 'img',
	// 			x: -140,
	// 			y: 100,
	// 			fit: 'contain',
	// 			height: 200,
	// 			width: 400,
	// 			image_url_import: require('@/assets/Thumbnails/assets_448.png'),
	// 		},
	// 	},
	// 	{
	// 		href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
	// 		cardTitles: ['Noticias', '18/01/2024'],
	// 		img: {
	// 			imgType: 'img',
	// 			x: -140,
	// 			y: 100,
	// 			fit: 'contain',
	// 			height: 200,
	// 			width: 400,
	// 			image_url_import: require('@/assets/Thumbnails/assets_479.png'),
	// 		},
	// 	},
	// 	{
	// 		href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
	// 		cardTitles: ['Noticias', '19/01/2024'],
	// 		img: {
	// 			imgType: 'img',
	// 			x: -140,
	// 			y: 100,
	// 			fit: 'contain',
	// 			height: 200,
	// 			width: 400,
	// 			image_url_import: require('@/assets/Thumbnails/assets_481.png'),
	// 		},
	// 	},

	// 	{
	// 		href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
	// 		cardTitles: ['Noticias', '20/02/2024'],
	// 		img: {
	// 			imgType: 'img',
	// 			x: -140,
	// 			y: 100,
	// 			fit: 'contain',
	// 			height: 200,
	// 			width: 400,
	// 			image_url_import: require('@/assets/Thumbnails/assets_483.png'),
	// 		},
	// 	},
	// 	{
	// 		href: `/(informations)/newspapers/${8}/${1}` as Route<string>,
	// 		cardTitles: ['Noticias', '21/01/2024'],
	// 		img: {
	// 			imgType: 'img',
	// 			x: -140,
	// 			y: 100,
	// 			fit: 'contain',
	// 			height: 200,
	// 			width: 400,
	// 			image_url_import: require('@/assets/Thumbnails/assets_485.png'),
	// 		},
	// 	},
	// ]

	const width = 220
	const height = 257

	return (
		<>
			<HeaderModular isDefault={false} title={`${slug}`} />
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 50,
					paddingVertical: 42,
				}}
			>
				{isLoading ? (
					<ActivityIndicator />
				) : (
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
				)}
			</ScrollView>
		</>
	)
}
