import { View, Text } from '@/components/Themed'
import { useRouter } from 'expo-router'
import {
	Canvas,
	Circle,
	Fill,
	Group,
	RoundedRect,
	Text as TextSkia,
	useFont,
} from '@shopify/react-native-skia'
import { Button, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'

export default function Family() {
	const router = useRouter()
	const width = 500
	const height = 256
	const r = width * 0.33
	const font = useFont(require('../../../assets/fonts/Gilroy-Medium.ttf'))
	function goto() {
		router.back()
	}
	return (
		<View
			style={styles.container}
			darkColor={Colors.light.white}
			lightColor={Colors.light.white}
		>
			<Text>Lista de Family</Text>
			<Button onPress={goto} title={'navegar'} />
			<TouchableOpacity>
				<Canvas style={{ width, height }}>
					<RoundedRect
						x={0}
						y={0}
						width={500}
						height={256}
						r={25}
						color="lightblue"
					/>
					<TextSkia
						x={10}
						y={32}
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
						color="red"
						// Font is optional
						font={font}
					/>
				</Canvas>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 50,
		flex: 1,
	},
})
