import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import { CardModular, ImgProps } from '@/components/ui/CardModular'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { READ_PDF_CATEGORIES } from '@/database/actions/pdfs/read'
import Colors from '@/constants/Colors'

const width = 220
const height = 128.5

async function getNewsPapper() {
	const news_papper = await READ_PDF_CATEGORIES('jornal')
	const sectionsInfo = news_papper.map((item) => {
		return {
			href: {
				pathname: `/(informations)/newspapers/${item.name}` as Route<string>,
				params: {
					id: item.id,
					slug: item.name,
				},
			},
			cardTitles: [item.name],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: item.icon,
			},
		}
	})

	return sectionsInfo
}

export default function NewsPappers() {
	const { data, isLoading } = useQuery({
		queryKey: ['newspaper'],
		queryFn: getNewsPapper,
		networkMode: 'always',
	})

	return (
		<>
			<HeaderModular isDefault={false} title="Jornais" />
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 50,
					paddingVertical: 42,
				}}
			>
				{isLoading ? (
					<ActivityIndicator color={Colors.light.sunsetOrange} />
				) : (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 20,
						}}
					>
						{data?.map((item, index) => {
							return (
								<View key={index}>
									<CardModular
										color={Colors.light.sunsetOrange}
										font_size={fonts.size.md}
										height={height}
										width={width}
										href={item.href}
										cardTitles={item.cardTitles}
										img={item.img as ImgProps}
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
