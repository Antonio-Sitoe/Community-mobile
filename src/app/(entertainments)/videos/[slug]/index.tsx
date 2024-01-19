import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Route } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'

const VideoList = () => {
	const teleNovelasList: MediaCardModularProps[] = [
		{
			duration: '12 minutos',
			href: '/(entertainments)/videos/3/0' as Route<string>,
			imageUri: require('@/assets/Thumbnails/assets_163.png'),
			title: 'Nutrição 101: Fundamentos de uma Dieta Saudável',
		},
		{
			duration: '23 minutos',
			href: '/(entertainments)/videos/3/1' as Route<string>,
			imageUri: require('@/assets/Thumbnails/assets_164.png'),
			title: '10 Alimentos Saudáveis que Deveria Comer',
		},
		{
			duration: '26 minutos',
			href: '/(entertainments)/videos/3/2' as Route<string>,
			imageUri: require('@/assets/Thumbnails/assets_165.png'),
			title: 'Desvendando Mitos da Nutrição: Separando Fato de Ficção',
		},
	]

	return (
		<>
			<HeaderModular isDefault={false} title="Nutrição" />
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

export default VideoList

const styles = StyleSheet.create({})
