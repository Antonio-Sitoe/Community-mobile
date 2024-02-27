import { View, Text } from '@/components/Themed'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts } from '@/constants/fonts'

import HandSwatch from '@/assets/Icons/HandSwatch.svg'
import Colors from '@/constants/Colors'
import { CardModular } from '@/components/ui/CardModular'
import { ArraySectios } from '@/@types/interfaces'
import { useTranslation } from 'react-i18next'

const font_size = fonts.size.md
const width = 220
const height = 128.5
const SCROLLVIEW_WIDTH = Math.floor(width * 4 - 150)

export function Others({ sections }: { sections: ArraySectios }) {
	const { t } = useTranslation()
	return (
		<View style={styles.container}>
			<View style={styles.containerTexts}>
				<Text style={styles.textTitle}>{t('screens.home.others.title')}</Text>

				<Text style={styles.helperText}>
					{t('screens.home.others.helper')} <HandSwatch />
				</Text>
			</View>

			<View style={styles.scrollViewContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View bgColor="transparent" style={styles.scrollView}>
						{sections.map((item, i) => {
							return (
								<CardModular
									key={i}
									color={item.color || Colors.light.charcoal}
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
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1.4,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.grayAlternative,
		marginBottom: 8,
	},
	containerTexts: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	helperText: {
		fontSize: 14,
		color: Colors.light.grayAlternative,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},

	mainCards: {
		padding: 10,
		borderRadius: 9,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 25,
	},
	card: {
		width: 220,
		height: 128.5,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 9,
	},
	scrollViewContainer: {
		padding: 10,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 9,
		flex: 1,
	},
	scrollView: {
		gap: 23,
		flex: 1,
		flexWrap: 'wrap',
		width: SCROLLVIEW_WIDTH,
		paddingHorizontal: 10,
	},
})
