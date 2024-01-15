import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import Next_icon from '@/assets/Icons/next_black.svg'
import Prev_icon from '@/assets/Icons/prev_black.svg'
import Play from '@/assets/Icons/play_black.svg'
import Settings from '@/assets/Icons/settings_black.svg'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { Audio } from 'expo-av'

const icon = require('@/assets/Thumbnails/Retângulo_499.png')

export default function Novels() {
	const progress = useSharedValue(30)
	const min = useSharedValue(0)
	const max = useSharedValue(100)

	const [sound, setSound] = useState()

	async function playSound() {
		console.log('Loading Sound')
		const { sound } = await Audio.Sound.createAsync(
			require('@/assets/Others/Hello.mp3'),
		)
		setSound(sound)

		console.log('Playing Sound', sound)
		await sound.playAsync()
	}

	async function stopSound() {
		try {
			// const result = await sound.current.getStatusAsync()
			// const { sound } = await Audio.Sound.createAsync(
			// 	require('@/assets/Others/Hello.mp3'),
			// )

			sound.pauseAsync()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound')
					sound.unloadAsync()
				}
			: undefined
	}, [sound])

	return (
		<>
			<HeaderModular isDefault={false} title="Ouro Negro: Episódio 1" />
			<ScrollView
				contentContainerStyle={{
					height: '100%',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 20,
						justifyContent: 'center',
						backgroundColor: '#F8F8F8',
						height: '90%',
						paddingVertical: 180,
					}}
				>
					<Image source={icon} />
				</View>

				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 50,
						justifyContent: 'left',
						backgroundColor: 'red',
						height: '10%',
						paddingVertical: 20,
						paddingHorizontal: 40,
					}}
				>
					<Play onPress={() => console.log('Play Button Was Clicked')} />
					<Prev_icon onPress={playSound} />
					<Next_icon onPress={stopSound} />

					<Slider
						panDirectionValue={progress}
						progress={progress}
						minimumValue={min}
						maximumValue={max}
						theme={{
							disableMinTrackTintColor: Colors.light.tabIconDefault,
							maximumTrackTintColor: Colors.light.tabIconDefault,
							minimumTrackTintColor: Colors.light.sunsetOrange,
							cacheTrackTintColor: Colors.light.charcoal,
							bubbleBackgroundColor: Colors.light.sunsetOrange,
						}}
						bubbleTranslateY={-30}
						containerStyle={{
							width: '100%',
							height: 4,
							borderRadius: 7,
							overflow: 'hidden',
						}}
						markStyle={{
							width: 40,
						}}
						bubble={(s: number) => Math.floor(s).toString()}
						// onValueChange={(value) => {
						// 	setPage(value)
						// }}
					/>
					<Settings />
				</View>
			</ScrollView>
		</>
	)
}
