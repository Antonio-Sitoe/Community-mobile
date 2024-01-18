import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Next_icon from '@/assets/Icons/next_black.svg'
import Pause_black from '@/assets/Icons/pause_black.svg'
import Prev_icon from '@/assets/Icons/prev_black.svg'
import Play from '@/assets/Icons/play_black.svg'
import Settings from '@/assets/Icons/settings_black.svg'

import { fonts } from '@/constants/fonts'
import Slider from '@react-native-community/slider'
import Colors from '@/constants/Colors'

interface IMediaControlersProps {
	isPlaying: boolean
	position: number
	duration: number
	ontogglePlayer(): Promise<void>
	onSkipToPrevious(): void
	onSkipToNext(): void
	onSlidingComplete(value: number): Promise<void>
	onValueChangeSlide(value: number): void
	Slidedisabled: boolean
	timestamp: string
}

export function MediaController({
	isPlaying,
	position,
	ontogglePlayer,
	onSkipToPrevious,
	onSkipToNext,
	onSlidingComplete,
	onValueChangeSlide,
	Slidedisabled,
	timestamp,
}: IMediaControlersProps) {
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
					style={styles.sliderStyle}
					value={position}
					onValueChange={onValueChangeSlide}
					onSlidingComplete={onSlidingComplete}
					disabled={Slidedisabled}
					thumbTintColor={Colors.light.sunsetOrange}
					minimumTrackTintColor={Colors.light.sunsetOrange}
				/>
				<Text style={styles.TextsContainer}>{timestamp}</Text>
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
		width: '85%',
		borderRadius: 7,
		overflow: 'hidden',
		color: 'red',
	},
})
