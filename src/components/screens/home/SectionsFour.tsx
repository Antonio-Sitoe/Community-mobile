import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { fonts } from '@/constants/fonts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ImageSVGSkia, Text, View } from '@/components/Themed'
import {
	Canvas,
	RoundedRect,
	useFont,
	Text as TextSkia,
} from '@shopify/react-native-skia'

import Colors from '@/constants/Colors'
import font_url from '@/assets/fonts/Gilroy-ExtraBold.ttf'

const image_url_import = `<svg xmlns="http://www.w3.org/2000/svg" width="63.182" height="61.94" viewBox="0 0 63.182 61.94">
<g id="Grupo_1202" data-name="Grupo 1202" transform="translate(6.455 -67.557)">
  <g id="Grupo_1175" data-name="Grupo 1175" transform="translate(-6.455 67.557)">
    <path id="Caminho_2357" data-name="Caminho 2357" d="M164.445,183c.461,3.824.916,7.51,1.347,11.2.3,2.583-.857,3.5-3.33,2.647-1.863-.641-3.762-1.2-5.567-1.978a4.248,4.248,0,0,1-1.943-1.733c-1.242-2.31-2.355-4.7-3.409-7.1a1.409,1.409,0,0,0-1.89-.966,51.107,51.107,0,0,1-5.931,1.108,9.374,9.374,0,0,1-3.7-.442,6.813,6.813,0,0,1-2.622-1.692,20.984,20.984,0,0,1-6.368-18.015,6.926,6.926,0,0,1,4.718-5.9,80.465,80.465,0,0,0,28.388-19.25,14.284,14.284,0,0,0,1.416-1.72,8.391,8.391,0,0,1,10.252-3.362,18.363,18.363,0,0,1,7.769,5.669,43.847,43.847,0,0,1,9.274,18.639c1.181,4.8,1.724,9.69.48,14.564a16.36,16.36,0,0,1-2.087,4.773c-2.014,3.106-4.946,4.088-8.646,3.559C176.6,182.132,170.561,182.536,164.445,183Zm-1.569-35.02c-.655.556-1.112.943-1.568,1.332a87.321,87.321,0,0,1-24.1,14.747A2.928,2.928,0,0,0,135.1,166.6a16.836,16.836,0,0,0,5.544,14.771,2.99,2.99,0,0,0,2.933.623,134.789,134.789,0,0,1,29.441-3.452c.392,0,.785,0,1.388,0C166.551,169.736,162.929,159.671,162.876,147.975Zm13.337,26.066c1.016.949,1.921,1.906,2.938,2.725,4.86,3.914,8.778,2.489,10.035-3.617a26.648,26.648,0,0,0-.525-12.361,40.249,40.249,0,0,0-8.454-16.725,14.224,14.224,0,0,0-5.74-4.27,4.063,4.063,0,0,0-5.2,1.559c-1.624,2.268-1.87,4.92-2.12,7.71,3.062.188,5.127,1.872,6.829,4.1a23.2,23.2,0,0,1,4.584,10.207C179.209,167.143,179.148,170.811,176.214,174.041Zm-2.534-3.3c2.918-4.858-2.022-17.053-6.3-17.207A40.736,40.736,0,0,0,173.68,170.737Zm-13.464,12.672-4.813.653c.861,1.895,1.776,3.553,2.371,5.319.586,1.74,1.862,2.044,3.473,2.284C160.9,188.907,160.574,186.273,160.216,183.409Z" transform="translate(-130.86 -135.209)" fill="#fff"/>
  </g>
</g>
</svg>`
interface SectionsFourProps {
	hasBackground: boolean
	title: string
	colorTitle: string
}

const font_size = fonts.size.md
const width = 220
const height = 128.5
const radios = Math.ceil(width * 0.04)
const padding_top_text = Math.ceil(height * 0.22)

export function SectionsFour({
	title,
	colorTitle,
	hasBackground,
}: SectionsFourProps) {
	const font = useFont(font_url, font_size)
	// console.log(image_url_import())
	return (
		<View style={styles.container}>
			<Text
				style={[
					styles.textTitle,
					{
						color: colorTitle,
					},
				]}
			>
				{title}
			</Text>
			<View style={[styles.mainCards, hasBackground && styles.mainCardsBg]}>
				<Link href="/(others)/family">
					<Canvas style={{ width, height }}>
						<RoundedRect
							x={0}
							y={0}
							width={width}
							height={height}
							r={radios}
							color={colorTitle}
						/>
						<TextSkia
							text={`Noticias`}
							y={padding_top_text}
							x={15}
							font={font}
							color={Colors.light.white}
						/>

						<ImageSVGSkia
							x={-3}
							y={72}
							height={200}
							width={400}
							image_url_import={image_url_import}
						/>
					</Canvas>
				</Link>
				{/* </TouchableOpacity> */}
				<TouchableOpacity style={styles.card}></TouchableOpacity>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
				<TouchableOpacity style={styles.card}></TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.sunsetOrange,
		marginBottom: 8,
		paddingLeft: 10,
	},
	mainCards: {
		borderRadius: 9,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 23,
	},
	mainCardsBg: {
		backgroundColor: Colors.light.smokeWhite,
	},
	card: {
		width: 220,
		height: 128.5,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 9,
	},
})
