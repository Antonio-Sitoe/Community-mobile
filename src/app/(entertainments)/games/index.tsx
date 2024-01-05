import { View, Text } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'

export default function Games() {
	return (
		<>
			<HeaderModular isDefault={false} title="Jogos" />
			<View>
				<Text>Jogos</Text>
			</View>
		</>
	)
}
