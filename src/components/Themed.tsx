import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import {
	ImageSVG,
	Skia,
	Image,
	useImage,
	Fit,
} from '@shopify/react-native-skia'
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
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const svg = Skia.SVG.MakeFromString(`${image_url_import}`)!
	return (
		<>
			{svg && <ImageSVG svg={svg} width={width} height={height} x={x} y={y} />}
		</>
	)
}

export interface ImageSKiaProps {
	fit: Fit
	x: number
	y: number
	width: number
	height: number
	image_url_import?: string
}

export const ImageSKia = ({
	fit = 'contain',
	x,
	y,
	width,
	height,
	image_url_import,
}: ImageSKiaProps) => {
	const image = useImage(image_url_import)
	return (
		<>
			{/* eslint-disable-next-line jsx-a11y/alt-text */}
			<Image
				image={image}
				fit={fit}
				x={x}
				y={y}
				width={width}
				height={height}
			/>
		</>
	)
}
