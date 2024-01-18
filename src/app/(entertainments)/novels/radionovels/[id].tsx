import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import Colors from '@/constants/Colors'
import TrackPlayer, {
	State,
	Track,
	usePlaybackState,
	useProgress,
} from 'react-native-track-player'
import { setupPlayer, addTracks } from '@/services/trackPlayerServices'
import { MediaControlers } from '@/components/ui/MediaControlers'

const PLAY_LIST = [
	{
		id: '1',
		url: 'https://65381g.ha.azioncdn.net/4/0/8/6/KSOFC-a-promessa-c54de1f1.mp3',
		title: 'Promsesas',
		artist: 'VOID',
		artwork: 'https://www.palcomp3.com.br/kemillysantos/foto/2934415/',
		duration: 60,
	},
	{
		id: '2',
		url: require('@/assets/Audio/Lion.mp3'),
		title: 'Lion',
		artist: 'Florest',
		artwork: require('@/assets/Thumbnails/assets_164.png'),
		duration: 66,
	},
	{
		id: '3',
		url: require('@/assets/Audio/Birds.mp3'),
		title: 'Birds',
		artist: 'Beach',
		artwork: require('@/assets/Thumbnails/assets_165.png'),
		duration: 73,
	},
	{
		id: '4',
		url: require('@/assets/Audio/Dog.mp3'),
		title: 'Dog',
		artist: 'Home',
		artwork: require('@/assets/Thumbnails/assets_448.png'),
		duration: 73,
	},
]

export default function Novels() {
	const [isPlayerReady, setIsPlayerReady] = useState(false)
	const [currentTrack, setCurrentTrack] = useState<null | Track>(null)

	const playerState = usePlaybackState()
	const { duration, position } = useProgress()

	const ontogglePlayer = async () => {
		if ((await TrackPlayer.getState()) === State.Playing) {
			console.log('pause')
			TrackPlayer.pause()
		} else {
			console.log('play')
			TrackPlayer.play()
		}
	}
	const onSkipToPrevious = () => {
		TrackPlayer.skipToPrevious()
	}
	const onSkipToNext = () => {
		TrackPlayer.skipToNext()
	}
	const onSlidingComplete = async (value: number) => {
		await TrackPlayer.seekTo(value)
	}

	useEffect(() => {
		async function getCurrentTrackInfo() {
			const currentActiveTrack = await TrackPlayer.getActiveTrack()
			if (!currentActiveTrack) return
			setCurrentTrack(currentActiveTrack)
		}
		if (isPlayerReady) {
			getCurrentTrackInfo()
		}
	}, [isPlayerReady, duration])

	useEffect(() => {
		async function setup() {
			const isSetup = await setupPlayer()
			const queue = await TrackPlayer.getQueue()
			if (isSetup && queue.length <= 0) {
				await addTracks(PLAY_LIST)
			}
			setIsPlayerReady(isSetup)
		}
		setup()
		return () => {
			TrackPlayer.pause()
		}
	}, [])
	console.log('dsdddddddddddd')

	return (
		<>
			<HeaderModular isDefault={false} title={currentTrack?.title} />
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					{isPlayerReady ? (
						<>
							{currentTrack?.artwork && (
								<Image
									source={{
										uri: currentTrack?.artwork,
									}}
									style={styles.image}
									height={232.92}
									width={362.61}
									alt=""
								/>
							)}
						</>
					) : (
						<ActivityIndicator color={Colors.light.sunsetOrange} size={60} />
					)}
				</View>
				<MediaControlers
					isPlaying={playerState.state === State.Playing}
					duration={duration}
					position={position}
					onSkipToNext={onSkipToNext}
					onSkipToPrevious={onSkipToPrevious}
					onSlidingComplete={onSlidingComplete}
					ontogglePlayer={ontogglePlayer}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		backgroundColor: '#F8F8F8',
	},
	image: {
		borderRadius: 24,
	},
})
