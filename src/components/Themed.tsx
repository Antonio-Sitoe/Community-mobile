import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
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
