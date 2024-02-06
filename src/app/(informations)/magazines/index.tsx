import Colors from '@/constants/Colors'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { CardModular, ImgProps } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import { Route } from 'expo-router'
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { READ_PDF_CATEGORIES } from '@/database/actions/pdfs/read'
import { split_and_concat_string } from '@/utils'

const font_size = fonts.size.md
const width = 220
const height = 128.5

async function getMagazines() {
	const pdf = await READ_PDF_CATEGORIES('revista')
	return pdf.map((item) => ({
		color: Colors.light.alternativeBlue,
		href: {
			pathname: ('/(informations)/magazines/' + item.name) as Route<string>,
		},
		cardTitles: split_and_concat_string(item.name),
		img: {
			imgType: 'img',
			x: -55,
			y: 50,
			fit: 'contain',
			height: 140,
			width: 200,
			image_url_import: item.icon,
		},
	}))
}
export default function Magazines() {
	const { data, isLoading } = useQuery({
		queryKey: ['magazine'],
		queryFn: getMagazines,
		networkMode: 'always',
	})
	return (
		<View>
			<HeaderModular isDefault={false} title="Revistas" />
			<ScrollView contentContainerStyle={styles.scrollView}>
				{isLoading ? (
					<ActivityIndicator color={Colors.light.sunsetOrange} />
				) : (
					<>
						{data?.map((item, i) => {
							return (
								<CardModular
									key={i}
									color={Colors.light.lavenderBlush}
									font_size={font_size}
									height={height}
									width={width}
									href={item.href}
									cardTitles={item.cardTitles}
									img={item.img as ImgProps}
								/>
							)
						})}
					</>
				)}
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
