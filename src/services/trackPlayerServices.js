/* eslint-disable no-unsafe-finally */
import TrackPlayer, {
	AppKilledPlaybackBehavior,
	Capability,
	RepeatMode,
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

export async function addTracks(playList) {
	await TrackPlayer.add(playList)
	await TrackPlayer.setRepeatMode(RepeatMode.Off)
}

export async function playbackService() {
	try {
		// TODO: Attach remote event handlers
	} catch (error) {
		console.log('dsd')
	}
}
