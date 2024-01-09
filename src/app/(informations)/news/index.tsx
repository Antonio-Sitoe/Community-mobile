import { View, Text } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'

export default function News() {
	return (
		<>
			<HeaderModular isDefault={false} title="Noticias" />
			<Text>Lista de noticias</Text>
		</>
	)
}
