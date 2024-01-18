import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'

const VideoNovelasList = () => {
	return (
		<View>
			<HeaderModular isDefault={false} title="Aquele Papo" />
			<Text>Lista</Text>
			<Link href="/(entertainments)/novels/radionovels/454">Ver</Link>
		</View>
	)
}

export default VideoNovelasList

const styles = StyleSheet.create({})
