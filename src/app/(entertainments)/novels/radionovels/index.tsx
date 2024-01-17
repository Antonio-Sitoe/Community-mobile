import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'

const RadioNovelasList = () => {
	return (
		<View>
			<HeaderModular isDefault={false} title="Ouro Negro" />
			<Text>Lista</Text>
			<Link href="/(entertainments)/novels/radionovels/454">Ouvir</Link>
		</View>
	)
}

export default RadioNovelasList

const styles = StyleSheet.create({})
