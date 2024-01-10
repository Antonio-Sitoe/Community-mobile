import Colors from '@/constants/Colors'
import { View } from '../Themed'
import { Slider } from '@miblanchard/react-native-slider'
import { StyleSheet } from 'react-native'

interface SliderProps {
	value: number
	setValue(value: number): void
	min: number
	max: number
}

export const SliderModular = ({ value, setValue, min, max }: SliderProps) => {
	return (
		<View style={styles.container} bgColor="transparent">
			<Slider
				value={value}
				onValueChange={(v) => {
					setValue(Math.ceil(v[0]))
				}}
				minimumValue={min}
				maximumValue={max}
				thumbStyle={{
					width: 15,
					height: 15,
				}}
				trackStyle={{
					height: 8,
					borderRadius: 7,
					backgroundColor: Colors.light.white,
				}}
				animationType="spring"
				maximumTrackTintColor={Colors.light.white}
				minimumTrackTintColor={Colors.light.darkSlateGray}
				containerStyle={{
					borderRadius: 50,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
})
