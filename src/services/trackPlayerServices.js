import TrackPlayer, {
	AppKilledPlaybackBehavior,
	Capability,
	RepeatMode,
	Event,
} from 'react-native-track-player'

export async function setupPlayer() {
	let isSetup = false
	try {
		await TrackPlayer.getCurrentTrack()
		isSetup = true
	} catch {
		await TrackPlayer.setupPlayer()
		await TrackPlayer.updateOptions({
			android: {
				appKilledPlaybackBehavior:
					AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
			},
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.SeekTo,
			],
			compactCapabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
			],
			progressUpdateEventInterval: 2,
		})

		isSetup = true
	} finally {
		return isSetup
	}
}

export async function addTracks() {
	await TrackPlayer.add([
		{
			id: '1',
			url: require('@/assets/Audio/Hello.mp3'),
			title: 'Hello',
			artist: 'VOID',
			artwork: require('@/assets/Thumbnails/assets_163.png'),
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
	])
	await TrackPlayer.setRepeatMode(RepeatMode.Off)
}

export async function playbackService() {
	// TODO: Attach remote event handlers
}
