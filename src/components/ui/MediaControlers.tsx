/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Next_icon from '@/assets/Icons/next_black.svg'
import Pause_black from '@/assets/Icons/pause_black.svg'
import Prev_icon from '@/assets/Icons/prev_black.svg'
import Play from '@/assets/Icons/play_black.svg'
import Settings from '@/assets/Icons/settings_black.svg'

import { fonts } from '@/constants/fonts'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
import Colors from '@/constants/Colors'

interface IMediaControlersProps {
	isPlaying: boolean
	position: number
	duration: number
	ontogglePlayer(): Promise<void>
	onSkipToPrevious(): void
	onSkipToNext(): void
	onSlidingComplete(value: number): Promise<void>
}

export function MediaControlers({
	isPlaying,
	position,
	duration,
	ontogglePlayer,
	onSkipToPrevious,
	onSkipToNext,
	onSlidingComplete,
}: IMediaControlersProps) {
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(duration)
	const sliderTheme = {
		disableMinTrackTintColor: Colors.light.tabIconDefault,
		maximumTrackTintColor: Colors.light.tabIconDefault,
		minimumTrackTintColor: Colors.light.sunsetOrange,
		cacheTrackTintColor: Colors.light.charcoal,
		bubbleBackgroundColor: Colors.light.sunsetOrange,
	}

	useEffect(() => {
		progress.value = withTiming(position)
	}, [position])

	useEffect(() => {
		max.value = withTiming(duration)
	}, [duration])

	function format(seconds: number) {
		const mins = parseInt(`${seconds / 60}`)
			.toString()
			.padStart(2, '0')
		const secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0')
		return `${mins}:${secs}`
	}

	return (
		<View style={styles.controlers}>
			<View style={styles.controlersView}>
				<TouchableOpacity onPress={ontogglePlayer} style={styles.btn}>
					{isPlaying ? <Pause_black /> : <Play />}
				</TouchableOpacity>

				<TouchableOpacity style={styles.btn} onPress={onSkipToPrevious}>
					<Prev_icon />
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={onSkipToNext}>
					<Next_icon />
				</TouchableOpacity>
			</View>
			<View style={styles.sliderContainer}>
				<Slider
					panDirectionValue={progress}
					progress={progress}
					minimumValue={min}
					maximumValue={max}
					onSlidingComplete={onSlidingComplete}
					theme={sliderTheme}
					bubbleTranslateY={-30}
					containerStyle={styles.sliderStyle}
					markStyle={{
						width: 40,
					}}
					bubble={(s: number) => Math.floor(s).toString()}
				/>
				<Text style={styles.TextsContainer}>
					<Text>{format(position)}</Text>
					{'/'}
					<Text>{format(duration)}</Text>
				</Text>
			</View>

			<Settings />
		</View>
	)
}

const styles = StyleSheet.create({
	controlers: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 50,
		justifyContent: 'flex-start',
		backgroundColor: Colors.light.white,
		paddingVertical: 20,
		paddingHorizontal: 40,
	},
	controlersView: {
		width: 200,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btn: {
		height: 40,
		width: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sliderContainer: {
		flex: 1,
		gap: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	TextsContainer: {
		width: 120,
		alignSelf: 'center',
		color: '#B3B3B3',
		fontSize: fonts.size.sm,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	sliderStyle: {
		width: '100%',
		height: 4,
		borderRadius: 7,
		overflow: 'hidden',
	},
})
