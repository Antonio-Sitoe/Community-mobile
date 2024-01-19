import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Route } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'

const VideoNovelasList = () => {
	const teleNovelasList: MediaCardModularProps[] = [
		{
			duration: '12 minutos',
			href: '/(entertainments)/novels/telenovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_502.png'),
			title: 'Aquele Papo: Episódio 1',
		},
		{
			duration: '23 minutos',
			href: '/(entertainments)/novels/telenovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_502.png'),
			title: 'Aquele Papo: Episódio 2',
		},
		{
			duration: '26 minutos',
			href: '/(entertainments)/novels/telenovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_502.png'),
			title: 'Aquele Papo: Episódio 3',
		},
		{
			duration: '60 minutos',
			href: '/(entertainments)/novels/telenovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_502.png'),
			title: 'Aquele Papo: Episódio 4',
		},
	]

	return (
		<>
			<HeaderModular isDefault={false} title="Aquele Papo" />
			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 50,
						gap: 30,
						paddingVertical: 61,
						width: '100%',
						maxWidth: 1000,
					}}
				>
					{teleNovelasList.map(({ duration, href, imageUri, title }, i) => {
						return (
							<MediaCardModular
								key={i}
								href={href}
								duration={duration}
								imageUri={imageUri}
								title={title}
							/>
						)
					})}
				</ScrollView>
			</View>
		</>
	)
}

export default VideoNovelasList

const styles = StyleSheet.create({})
