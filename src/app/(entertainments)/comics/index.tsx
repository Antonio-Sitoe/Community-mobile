import Colors from '@/constants/Colors'

import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular, ImgProps } from '@/components/ui/CardModular'
import { useQuery } from '@tanstack/react-query'
import { split_and_concat_string } from '@/utils'
import { READ_BY_CATEGORY_NAME } from '@/database/actions/pdfs/read'
import { View, ScrollView, ActivityIndicator } from 'react-native'

async function getCosmics(slug: string) {
	const pdf = await READ_BY_CATEGORY_NAME(slug)
	return pdf.map((item) => ({
		href: {
			pathname: `/(entertainments)/comics/${item.id}` as Route<string>,
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
export default function Comics() {
	const { data, isLoading } = useQuery({
		queryKey: ['magazine_get_one'],
		queryFn: () => getCosmics('banda desenhada'),
		networkMode: 'always',
	})

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
					{isLoading ? (
						<ActivityIndicator color={Colors.light.sunsetOrange} />
					) : (
						<>
							{data?.map((item, index) => {
								return (
									<View key={index}>
										<CardModular
											color={Colors.light.lavenderBlush}
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
						</>
					)}
				</View>
			</ScrollView>
		</>
	)
}
