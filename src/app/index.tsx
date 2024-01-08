import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { SectionsFour } from '@/components/screens/home/SectionsFour'
import { Meteorology } from '@/components/screens/home/Meteorology'

import Colors from '@/constants/Colors'
import React from 'react'
import { Others } from '@/components/screens/home/Others'

export default function Home() {
	return (
		<>
			<HeaderModular isDefault />
			<View style={styles.container}>
				<View style={styles.containerChild}>
					<SectionsFour
						title="Informação"
						colorTitle={Colors.light.sunsetOrange}
						hasBackground={false}
					/>

					<Meteorology />
				</View>
				<View style={styles.containerChild}>
					<SectionsFour
						title="Entretenimento"
						colorTitle={Colors.light.lavenderBlush}
						hasBackground={true}
					/>
					<Others />
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
