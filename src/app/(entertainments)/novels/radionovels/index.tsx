import { StyleSheet, View } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { ScrollView } from 'react-native-gesture-handler'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'
import { Route } from 'expo-router'

const RadioNovelasList = () => {
	const radioNovelasList: MediaCardModularProps[] = [
		{
			duration: '12 minutos',
			href: '/(entertainments)/novels/radionovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_499.png'),
			title: 'Ouro Negro: Episodio 1',
		},
		{
			duration: '12 minutos',
			href: '/(entertainments)/novels/radionovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_499.png'),
			title: 'Ouro Negro: Episodio 2',
		},
		{
			duration: '12 minutos',
			href: '/(entertainments)/novels/radionovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_499.png'),
			title: 'Ouro Negro: Episodio 3',
		},
		{
			duration: '12 minutos',
			href: '/(entertainments)/novels/radionovels/6' as Route<string>,
			imageUri: require('@/assets/Thumbnails/Retângulo_499.png'),
			title: 'Ouro Negro: Episodio 4',
		},
	]
	return (
		<>
			<HeaderModular isDefault={false} title="Ouro Negro" />
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
					{radioNovelasList.map(({ duration, href, imageUri, title }, i) => {
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

export default RadioNovelasList

const styles = StyleSheet.create({})
