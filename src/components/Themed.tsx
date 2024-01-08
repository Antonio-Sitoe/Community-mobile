import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { ImageSVG, Skia } from '@shopify/react-native-skia'
import { Text as DefaultText, View as DefaultView } from 'react-native'

type ThemeProps = {
	color?: string
	bgColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']

export function Text(props: TextProps) {
	const { style, color, ...otherProps } = props
	const textColor = color || Colors.light.text
	return (
		<DefaultText
			style={[
				{ color: textColor, fontFamily: fonts.fontFamyle.Gilroy_regular },
				style,
			]}
			{...otherProps}
		/>
	)
}

export function View(props: ViewProps) {
	const { style, bgColor, ...otherProps } = props
	const backgroundColor = bgColor || Colors.light.background

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export const ImageSVGSkia = ({ x, y, image_url_import, height, width }) => {
	const svg = Skia.SVG.MakeFromString(`${image_url_import}`)!
	return (
		<>
			{svg && <ImageSVG svg={svg} width={width} height={height} x={x} y={y} />}
		</>
	)
}
