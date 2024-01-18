/**
 * @flow
 */

import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Asset } from 'expo-asset'
import {
	Audio,
	InterruptionModeAndroid,
	InterruptionModeIOS,
	ResizeMode,
	Video,
} from 'expo-av'
import { MediaController } from '@/components/ui/MediaController.tsx'
import { HeaderModular } from '@/components/ui/HeaderModular'

export class PlaylistItem {
	constructor(name, uri, isVideo) {
		this.name = name
		this.uri = uri
		this.isVideo = isVideo
	}
}

const LOOPING_TYPE_ALL = 0
const LOOPING_TYPE_ONE = 1

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const BACKGROUND_COLOR = '#FFF8ED'
const FONT_SIZE = 14
const LOADING_STRING = '... loading ...'
const RATE_SCALE = 3.0

export default class MediaPlayer extends React.Component {
	constructor(props) {
		super(props)
		this.index = 0
		this.isSeeking = false
		this.PLAYLIST = props.PLAYLIST
		this.shouldPlayAtEndOfSeek = false
		this.playbackInstance = null
		this.state = {
			showVideo: false,
			playbackInstanceName: LOADING_STRING,
			loopingType: LOOPING_TYPE_ALL,
			muted: false,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
			videoWidth: DEVICE_WIDTH,
			videoHeight: DEVICE_HEIGHT,
			poster: false,
			useNativeControls: false,
			fullscreen: false,
			throughEarpiece: false,
		}
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			staysActiveInBackground: false,
			interruptionModeIOS: InterruptionModeIOS.DoNotMix,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
			playThroughEarpieceAndroid: false,
		})
	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync()
			// this.playbackInstance.setOnPlaybackStatusUpdate(null);
			this.playbackInstance = null
		}

		const source = { uri: this.PLAYLIST[this.index].uri }
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			shouldCorrectPitch: this.state.shouldCorrectPitch,
			volume: this.state.volume,
			isMuted: this.state.muted,
			isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
			// // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
			// androidImplementation: 'MediaPlayer',
		}

		if (this.PLAYLIST[this.index].isVideo) {
			if (typeof source.uri === 'number') {
				await this._video.loadAsync(source.uri, initialStatus)
			} else {
				await this._video.loadAsync(source, initialStatus)
			}
			// this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
			this.playbackInstance = this._video
			const status = await this._video.getStatusAsync()
		} else {
			if (typeof source.uri === 'number') {
				const { sound, status } = await Audio.Sound.createAsync(
					source.uri,
					initialStatus,
					this._onPlaybackStatusUpdate,
				)
				this.playbackInstance = sound
			} else {
				const { sound, status } = await Audio.Sound.createAsync(
					source,
					initialStatus,
					this._onPlaybackStatusUpdate,
				)
				this.playbackInstance = sound
			}
		}

		this._updateScreenForLoading(false)
	}

	_mountVideo = (component) => {
		this._video = component
		this._loadNewPlaybackInstance(false)
	}

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				showVideo: false,
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true,
			})
		} else {
			this.setState({
				playbackInstanceName: this.PLAYLIST[this.index].name,
				showVideo: this.PLAYLIST[this.index].isVideo,
				isLoading: false,
			})
		}
	}

	_onPlaybackStatusUpdate = (status) => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				muted: status.isMuted,
				volume: status.volume,
				loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
				shouldCorrectPitch: status.shouldCorrectPitch,
			})
			if (status.didJustFinish && !status.isLooping) {
				this._advanceIndex(true)
				this._updatePlaybackInstanceForIndex(true)
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`)
			}
		}
	}

	_onLoadStart = () => {
		console.log(`ON LOAD START`)
	}

	_onLoad = (status) => {
		console.log(`ON LOAD : ${JSON.stringify(status)}`)
	}

	_onError = (error) => {
		console.log(`ON ERROR : ${error}`)
	}

	_onReadyForDisplay = (event) => {
		const widestHeight =
			(DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
		if (widestHeight > DEVICE_HEIGHT) {
			this.setState({
				videoWidth:
					(DEVICE_HEIGHT * event.naturalSize.width) / event.naturalSize.height,
				videoHeight: DEVICE_HEIGHT,
			})
		} else {
			this.setState({
				videoWidth: DEVICE_WIDTH,
				videoHeight:
					(DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width,
			})
		}
	}

	_onFullscreenUpdate = (event) => {
		console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`)
	}

	_advanceIndex(forward) {
		this.index =
			(this.index + (forward ? 1 : this.PLAYLIST.length - 1)) %
			this.PLAYLIST.length
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true)

		this.setState({
			videoWidth: DEVICE_WIDTH,
			videoHeight: DEVICE_HEIGHT,
		})

		this._loadNewPlaybackInstance(playing)
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync()
			} else {
				this.playbackInstance.playAsync()
			}
		}
	}

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync()
		}
	}

	_onForwardPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(true)
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
		}
	}

	_onBackPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(false)
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
		}
	}

	_onMutePressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setIsMutedAsync(!this.state.muted)
		}
	}

	_onLoopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setIsLoopingAsync(
				this.state.loopingType !== LOOPING_TYPE_ONE,
			)
		}
	}

	_onVolumeSliderValueChange = (value) => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setVolumeAsync(value)
		}
	}

	_trySetRate = async (rate, shouldCorrectPitch) => {
		if (this.playbackInstance != null) {
			try {
				await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch)
			} catch (error) {
				// Rate changing could not be performed, possibly because the client's Android API is too old.
			}
		}
	}

	_onRateSliderSlidingComplete = async (value) => {
		this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch)
	}

	_onPitchCorrectionPressed = async (value) => {
		this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch)
	}

	_onSeekSliderValueChange = (value) => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay
			// this.playbackInstance.pauseAsync()
		}
	}

	_onSeekSliderSlidingComplete = async (value) => {
		if (this.playbackInstance != null) {
			this.isSeeking = false
			const seekPosition = value * this.state.playbackInstanceDuration
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition)
			} else {
				this.playbackInstance.setPositionAsync(seekPosition)
			}
		}
	}

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return (
				this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
			)
		}
		return 0
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000
		const seconds = Math.floor(totalSeconds % 60)
		const minutes = Math.floor(totalSeconds / 60)

		const padWithZero = (number) => {
			const string = number.toString()
			if (number < 10) {
				return '0' + string
			}
			return string
		}
		return padWithZero(minutes) + ':' + padWithZero(seconds)
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(
				this.state.playbackInstancePosition,
			)} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`
		}
		return ''
	}

	_onPosterPressed = () => {
		this.setState({ poster: !this.state.poster })
	}

	_onUseNativeControlsPressed = () => {
		this.setState({ useNativeControls: !this.state.useNativeControls })
	}

	_onFullscreenPressed = () => {
		try {
			this._video.presentFullscreenPlayer()
		} catch (error) {
			console.log(error.toString())
		}
	}

	_onSpeakerPressed = () => {
		this.setState(
			(state) => {
				return { throughEarpiece: !state.throughEarpiece }
			},
			() =>
				Audio.setAudioModeAsync({
					allowsRecordingIOS: false,
					interruptionModeIOS: InterruptionModeIOS.DoNotMix,
					playsInSilentModeIOS: true,
					shouldDuckAndroid: true,
					interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
					playThroughEarpieceAndroid: this.state.throughEarpiece,
				}),
		)
	}

	render() {
		return (
			<>
				<HeaderModular
					isDefault={false}
					title={this.state.playbackInstanceName}
				/>
				<View style={styles.container}>
					<View style={styles.videoContainer}>
						<Video
							ref={this._mountVideo}
							style={[
								styles.video,
								{
									opacity: this.state.showVideo ? 1.0 : 0.0,
									width: this.state.videoWidth,
									height: this.state.videoHeight,
								},
							]}
							resizeMode={ResizeMode.CONTAIN}
							onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
							onLoadStart={this._onLoadStart}
							onLoad={this._onLoad}
							onError={this._onError}
							onFullscreenUpdate={this._onFullscreenUpdate}
							onReadyForDisplay={this._onReadyForDisplay}
							useNativeControls={this.state.useNativeControls}
						/>
					</View>
					<MediaController
						duration={this.state.playbackInstanceDuration}
						position={this._getSeekSliderPosition()}
						isPlaying={this.state.isPlaying}
						onSkipToNext={this._onForwardPressed}
						onSkipToPrevious={this._onBackPressed}
						onSlidingComplete={this._onSeekSliderSlidingComplete}
						ontogglePlayer={this._onPlayPausePressed}
						onValueChangeSlide={this._onSeekSliderValueChange}
						Slidedisabled={this.state.isLoading}
						timestamp={this._getTimestamp()}
					/>
				</View>
			</>
		)
	}
}

const styles = StyleSheet.create({
	emptyContainer: {
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	container: {
		flex: 1,
	},
	nameContainer: {
		height: FONT_SIZE,
	},
	space: {
		height: FONT_SIZE,
	},
	videoContainer: {
		flex: 1,
	},

	playbackSlider: {
		alignSelf: 'stretch',
	},
	timestampRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'stretch',
		minHeight: FONT_SIZE,
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buffering: {
		textAlign: 'left',
		paddingLeft: 20,
	},
	timestamp: {
		textAlign: 'right',
		paddingRight: 20,
	},
	button: {
		backgroundColor: BACKGROUND_COLOR,
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	volumeSlider: {
		// width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
	},
	buttonsContainerBottomRow: {
		// maxHeight: ICON_THUMB_1.height,
		alignSelf: 'stretch',
		paddingRight: 20,
		paddingLeft: 20,
	},
	rateSlider: {
		width: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerTextRow: {
		maxHeight: FONT_SIZE,
		alignItems: 'center',
		paddingRight: 20,
		paddingLeft: 20,
		minWidth: DEVICE_WIDTH,
		maxWidth: DEVICE_WIDTH,
	},
})
