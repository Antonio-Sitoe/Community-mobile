import {
	Canvas,
	RoundedRect,
	useFont,
	Text as TextSkia,
} from '@shopify/react-native-skia'
import { Link, Route } from 'expo-router'

import font_url from '@/assets/fonts/Gilroy-ExtraBold.ttf'
import { ImageSKia, ImageSKiaProps, ImageSVGSkia } from '../Themed'
import Colors from '@/constants/Colors'

export interface ImgProps extends ImageSKiaProps {
	imgType: 'img' | 'svg'
	x: number
	y: number
}
interface CardModularProps {
	href: Route<string>
	font_size: number
	width: number
	height: number
	color: string
	img: ImgProps
	cardTitles: string[]
}

export function CardModular({
	href,
	font_size,
	width,
	height,
	color,
	img,
	cardTitles,
}: CardModularProps) {
	const radios = Math.ceil(width * 0.04)
	const padding_top_text = Math.ceil(height * 0.22)
	const font = useFont(font_url, font_size)

	return (
		<Link href={href}>
			<Canvas style={{ width, height }}>
				<RoundedRect
					x={0}
					y={0}
					width={width}
					height={height}
					r={radios}
					color={color}
				/>
				{cardTitles.map((title, i) => {
					const calcule_padding_top = padding_top_text
					const padding_y =
						i + 1 === 2
							? (calcule_padding_top / height) * 230
							: (calcule_padding_top / height) * 130 // coloca espacamento de um texto para o outro
					return (
						<TextSkia
							key={i}
							text={title}
							y={padding_y}
							x={15}
							font={font}
							color={Colors.light.white}
						/>
					)
				})}

				{img.imgType === 'svg' ? (
					<ImageSVGSkia
						x={img.x}
						y={img.y}
						height={img.height}
						width={img.width}
						image_url_import={img.image_url_import}
					/>
				) : (
					<ImageSKia
						fit={img.fit}
						x={img.x}
						y={img.y}
						height={img.height}
						width={img.width}
						image_url_import={img.image_url_import}
					/>
				)}
			</Canvas>
		</Link>
	)
}
