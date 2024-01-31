import { StyleSheet } from 'react-native'
import { Slider } from 'react-native-awesome-slider'

import Colors from '@/constants/Colors'

import Minus from '@/assets/Icons/Minor.svg'
import MinusDark from '@/assets/Icons/Minor-black.svg'

import Plus from '@/assets/Icons/Plus.svg'
import PlusDark from '@/assets/Icons/Plus-black.svg'

import VolumeLigth from '@/assets/Icons/volume.svg'
import VolumeDark from '@/assets/Icons/volumeDark.svg'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { View } from '../Themed'

import { VolumeManager } from 'react-native-volume-manager'
import { useEffect } from 'react'

const Volume = ({ isDefault = true }) => {
	const progress = useSharedValue(1)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	useEffect(() => {
		async function getVoume() {
			const { volume } = await VolumeManager.getVolume()
			progress.value = withSpring(volume)
		}
		getVoume()
	}, [progress])

	useEffect(() => {
		// Listen to volume changes
		const volumeListener = VolumeManager.addVolumeListener((result) => {
			progress.value = withSpring(result.volume)
		})
		return () => volumeListener.remove()
	}, [progress])

	return (
		<View style={styles.range} bgColor="transparent">
			{isDefault ? <VolumeDark /> : <VolumeLigth />}
			<TouchableOpacity
				onPress={async () => {
					if (progress.value <= 0) return
					const current = progress.value - 0.07
					await VolumeManager.setVolume(current)
				}}
			>
				{isDefault ? <MinusDark /> : <Minus />}
			</TouchableOpacity>
			<View style={styles.sliderContainer} bgColor="transparent">
				<Slider
					progress={progress}
					minimumValue={min}
					maximumValue={max}
					theme={{
						disableMinTrackTintColor: Colors.light.white,
						maximumTrackTintColor: isDefault
							? Colors.light.sunsetOrange
							: Colors.light.white,
						minimumTrackTintColor: Colors.light.darkSlateGray,
						cacheTrackTintColor: Colors.light.charcoal,
						bubbleBackgroundColor: Colors.light.sunsetOrange,
					}}
					bubbleTranslateY={30}
					containerStyle={{
						width: '100%',
						height: 8,
						borderRadius: 7,
						overflow: 'hidden',
					}}
					bubble={(s: number) => Math.floor(s).toString()}
					onValueChange={async (valor) => {
						await VolumeManager.setVolume(valor)
					}}
				/>
			</View>
			<TouchableOpacity
				onPress={async () => {
					if (progress.value >= 1) return
					const current = progress.value + 0.07
					await VolumeManager.setVolume(current)
				}}
			>
				{isDefault ? <PlusDark /> : <Plus />}
			</TouchableOpacity>
		</View>
	)
}

export { Volume }

const styles = StyleSheet.create({
	range: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 5,
	},
	sliderContainer: {
		width: 136.48,
	},
})
