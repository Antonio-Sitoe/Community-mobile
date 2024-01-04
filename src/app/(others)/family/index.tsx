import { View, Text, Button } from 'react-native'
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
		<View>
			<Text>Lista de Family</Text>
			<Button onPress={goto} title={'navegar'} />
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
					text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quasi harum, odit ea doloremque libero distinctio officiis tenetur laboriosam dolorem. Consequatur doloremque nostrum labore maiores, voluptatibus architecto quisquam repudiandae voluptatem."
					color="red"
					// Font is optional
					font={font}
				/>
			</Canvas>
		</View>
	)
}
