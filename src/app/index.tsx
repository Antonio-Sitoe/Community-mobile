import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { SectionsFour } from '@/components/screens/home/SectionsFour'
import { Meteorology } from '@/components/screens/home/Meteorology'

import Colors from '@/constants/Colors'
import React from 'react'
import { Others } from '@/components/screens/home/Others'
import { useTranslateHome } from '@/hooks/useTranslateHome'
import { useTranslation } from 'react-i18next'
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/services/trackPlayerServices'

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
						title="Entretenimento"
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
TrackPlayer.registerPlaybackService(() => playbackService)
