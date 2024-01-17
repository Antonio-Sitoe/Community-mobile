import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import Next_icon from '@/assets/Icons/next_black.svg'
import Prev_icon from '@/assets/Icons/prev_black.svg'
import Play from '@/assets/Icons/play_black.svg'
import Settings from '@/assets/Icons/settings_black.svg'
import { useSharedValue } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import TrackPlayer, {
	useTrackPlayerEvents,
	Event,
	State,
	usePlaybackState,
	useProgress,
} from 'react-native-track-player'
import { setupPlayer, addTracks } from '@/services/trackPlayerServices'
import { Foundation } from '@expo/vector-icons'
import { SliderModular } from '@/components/ui/Slider'

const icon = require('@/assets/Thumbnails/Retângulo_499.png')
export default function Novels() {
	const [isPlayerReady, setIsPlayerReady] = useState(false)
	const { duration, position } = useProgress()
	const playerState = usePlaybackState()

	const progress = useSharedValue(30)
	const min = useSharedValue(0)
	const max = useSharedValue(100)

	async function handlePlayPress() {
		if ((await TrackPlayer.getState()) == State.Playing) {
			console.log('pause')
			TrackPlayer.pause()
		} else {
			console.log('play')
			TrackPlayer.play()
		}
	}

	useEffect(() => {
		async function setup() {
			const isSetup = await setupPlayer()

			const queue = await TrackPlayer.getQueue()
			if (isSetup && queue.length <= 0) {
				await addTracks()
			}

			setIsPlayerReady(isSetup)
		}

		setup()
	}, [])

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
					{/* <Play onPress={() => console.log('Play Button Was Clicked')} /> */}
					{!isPlayerReady ? (
						<Play onPress={() => console.log('Play Button Was Clicked')} />
					) : (
						<TouchableOpacity onPress={handlePlayPress}>
							{playerState.state === State.Playing ? (
								<Foundation name="pause" size={30} />
							) : (
								<Play />
							)}
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
						<Prev_icon />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
						<Next_icon />
					</TouchableOpacity>
					<SliderModular
						max={duration}
						min={0}
						value={position}
						setValue={(value) => {
							console.log('AA', value)
							TrackPlayer.seekTo(value)
						}}
					/>
					<Settings />
				</View>
			</ScrollView>
		</>
	)
}
