import { View, ScrollView, ActivityIndicator } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular } from '@/components/ui/CardModular'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { Route, useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { READ_BY_CATEGORY_NAME } from '@/database/actions/pdfs/read'
import { split_and_concat_string } from '@/utils'

const width = 220
const height = 257

async function getMagazineOne(slug: string) {
	const pdf = await READ_BY_CATEGORY_NAME(slug)
	return pdf.map((item) => ({
		href: {
			pathname: `/(informations)/magazines/${slug}/${item.id}` as Route<string>,
			params: {
				file: item.file,
				title: `${item.edition}`,
			},
		},
		cardTitles: split_and_concat_string(item.edition),
		img: {
			imgType: 'img',
			x: -140,
			y: 100,
			fit: 'contain',
			height: 200,
			width: 400,
			image_url_import: item.icon,
		},
	}))
}

export default function MagazinesEdition() {
	const { slug } = useLocalSearchParams()
	const { data, isLoading } = useQuery({
		queryKey: ['magazine_get_one'],
		queryFn: () => getMagazineOne(slug as string),
		networkMode: 'always',
	})

	return (
		<>
			<HeaderModular isDefault={false} title="Revistas" />
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
										img={item.img as any}
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
