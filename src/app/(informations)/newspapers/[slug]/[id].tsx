import { View, Text } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useLocalSearchParams } from 'expo-router'

export default function News() {
	const { id, slug } = useLocalSearchParams()
	return (
		<>
			<HeaderModular isDefault={false} title="Leitor" />
			<Text>
				Lista de{slug} lwito{id}
			</Text>
		</>
	)
}
