import { StyleSheet } from 'react-native'
import { fonts } from '@/constants/fonts'
import { Text, View } from '@/components/Themed'

import Colors from '@/constants/Colors'
import { CardModular } from '@/components/ui/CardModular'
import { ArraySectios } from '@/@types/interfaces'

interface SectionsFourProps {
	hasBackground: boolean
	title: string
	colorTitle: string
	sections: ArraySectios
}

const font_size = fonts.size.md
const width = 220
const height = 128.5

export function SectionsFour({
	title,
	colorTitle,
	hasBackground,
	sections,
}: SectionsFourProps) {
	return (
		<View style={styles.container}>
			<Text
				style={[
					styles.textTitle,
					{
						color: colorTitle,
					},
				]}
			>
				{title}
			</Text>
			<View style={[styles.mainCards, hasBackground && styles.mainCardsBg]}>
				{sections.map((item, i) => {
					return (
						<CardModular
							key={i}
							color={colorTitle}
							font_size={font_size}
							height={height}
							width={width}
							href={item.href}
							cardTitles={item.cardTitles}
							img={item.img}
						/>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.sunsetOrange,
		marginBottom: 8,
		paddingLeft: 10,
	},
	mainCards: {
		borderRadius: 9,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 23,
	},
	mainCardsBg: {
		backgroundColor: Colors.light.smokeWhite,
	},
})
