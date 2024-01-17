import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { Link } from 'expo-router'

const Novelas = () => {
	return (
		<>
			<HeaderModular isDefault={false} title="Novelas" />
			<Text>index</Text>
			<Link
				href="/(entertainments)/novels/radionovels/"
				style={{ height: 20, borderWidth: 2 }}
			>
				Radio
			</Link>
			<Link href="/(entertainments)/novels/telenovels">Telenovelas</Link>
		</>
	)
}

export default Novelas

const styles = StyleSheet.create({})
