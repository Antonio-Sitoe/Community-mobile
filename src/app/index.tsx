import { View } from '@/components/Themed'
import { Others } from '@/components/screens/home/Others'
import { StyleSheet } from 'react-native'
import { Meteorology } from '@/components/screens/home/Meteorology'
import { SectionsFour } from '@/components/screens/home/SectionsFour'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useTranslation } from 'react-i18next'
import { useTranslateHome } from '@/hooks/useTranslateHome'

import Colors from '@/constants/Colors'
import React from 'react'

export default function Home() {
	const { t } = useTranslation()
	const { sectionsEntrete, sectionsInfo, sectionsOthers } = useTranslateHome()
	return (
		<>
			<HeaderModular isDefault />
			<View style={styles.container}>
				<View style={styles.containerChild}>
					<SectionsFour
						title={t('screens.home.info.title')}
						colorTitle={Colors.light.sunsetOrange}
						hasBackground={false}
						sections={sectionsInfo}
					/>

					<Meteorology />
				</View>
				<View style={styles.containerChild}>
					<SectionsFour
						title={t('screens.home.entertainments.title')}
						colorTitle={Colors.light.lavenderBlush}
						hasBackground={true}
						sections={sectionsEntrete}
					/>
					<Others sections={sectionsOthers} />
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 40.5,
	},
	containerChild: {
		width: '100%',
		flexDirection: 'row',
		gap: 23,
		marginBottom: 20,
	},
})
