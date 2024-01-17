import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import Next_icon from '@/assets/Icons/next_black.svg'
import Pause_black from '@/assets/Icons/pause_black.svg'
import Prev_icon from '@/assets/Icons/prev_black.svg'
import Play from '@/assets/Icons/play_black.svg'
import Settings from '@/assets/Icons/settings_black.svg'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import TrackPlayer, {
	State,
	usePlaybackState,
	useProgress,
} from 'react-native-track-player'
import { setupPlayer, addTracks } from '@/services/trackPlayerServices'
import { fonts } from '@/constants/fonts'
const icon = require('@/assets/Thumbnails/Retângulo_499.png')

export default function Novels() {
	const [isPlayerReady, setIsPlayerReady] = useState(false)
	const [currentTrack, setCurrentTrack] = useState(null)

	const playerState = usePlaybackState()
	const { duration, position } = useProgress()
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(duration)

	async function handlePlayPress() {
		if ((await TrackPlayer.getState()) == State.Playing) {
			console.log('pause')
			TrackPlayer.pause()
		} else {
			console.log('play')
			TrackPlayer.play()
		}
	}

	function format(seconds: number) {
		const mins = parseInt(seconds / 60)
			.toString()
			.padStart(2, '0')
		const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
		return `${mins}:${secs}`
	}
	useEffect(() => {
		progress.value = withTiming(position)
	}, [position])

	useEffect(() => {
		max.value = withTiming(duration)
		if (isPlayerReady) {
			;(async () => {
				const object = await TrackPlayer.getActiveTrack()
				console.log('current', object)
				setCurrentTrack(object)
			})()
		}
	}, [duration, isPlayerReady])

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
		return () => {
			TrackPlayer.pause()
		}
	}, [])

	return (
		<>
			<HeaderModular
				isDefault={false}
				title={currentTrack?.title || 'Ouro Negro: Episódio 1'}
			/>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 20,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F8F8F8',
						paddingVertical: 180,
					}}
				>
					{currentTrack?.artwork && (
						<Image
							source={{
								uri: currentTrack?.artwork,
							}}
							style={{
								borderRadius: 24,
							}}
							height={232.92}
							width={362.61}
							alt=""
						/>
					)}
				</View>
			</ScrollView>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 50,
					justifyContent: 'left',
					backgroundColor: Colors.light.white,
					paddingVertical: 20,
					paddingHorizontal: 40,
				}}
			>
				<View
					style={{
						width: 200,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					{!isPlayerReady ? (
						<Play onPress={() => console.log('Play Button Was Clicked')} />
					) : (
						<TouchableOpacity
							onPress={handlePlayPress}
							style={{
								height: 40,
								width: 40,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{playerState.state === State.Playing ? <Pause_black /> : <Play />}
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={{
							height: 40,
							width: 40,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={() => TrackPlayer.skipToPrevious()}
					>
						<Prev_icon />
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							height: 40,
							width: 40,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={() => TrackPlayer.skipToNext()}
					>
						<Next_icon />
					</TouchableOpacity>
				</View>
				<View
					style={{
						flex: 1,
						gap: 20,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Slider
						panDirectionValue={progress}
						progress={progress}
						minimumValue={min}
						maximumValue={max}
						onSlidingComplete={async (value) => {
							await TrackPlayer.seekTo(value)
						}}
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
					/>
					<Text
						style={{
							width: 120,
							alignSelf: 'center',
							color: '#B3B3B3',
							fontSize: fonts.size.sm,
							fontFamily: fonts.fontFamyle.Gilroy_extraBold,
						}}
					>
						<Text>{format(position)}</Text>
						{'/'}
						<Text>{format(duration)}</Text>
					</Text>
				</View>

				<Settings />
			</View>
		</>
	)
}
