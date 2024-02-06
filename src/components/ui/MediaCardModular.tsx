import { Link, Route } from 'expo-router'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'

export interface MediaCardModularProps {
	id?: string
	imageUri: string | number
	title: string
	href: Route<any>
	duration: string
}

export function MediaCardModular({
	imageUri,
	title,
	href,
	duration,
}: MediaCardModularProps) {
	const image =
		typeof imageUri === 'number'
			? imageUri
			: {
					uri: imageUri,
				}
	return (
		<Link href={href}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<ImageBackground
						source={image}
						resizeMode="cover"
						style={styles.image}
					/>
				</View>
				<View style={styles.containerTexts}>
					<Text style={styles.textTitle}>{title}</Text>
					<Text style={styles.textMinuts}>{duration}</Text>
				</View>
			</View>
		</Link>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		gap: 23,
		alignItems: 'center',
		// borderWidth: 1,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 307,
		height: 215,
		borderRadius: 24,
		backgroundColor: '#fff',
		elevation: 2,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		width: 307,
		height: 215,
	},
	containerTexts: { flex: 1, maxWidth: 500 },
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.xl,
		color: Colors.light.text,
		textDecorationStyle: 'solid',
		textDecorationLine: 'underline',
		marginBottom: 4,
		width: '100%',
		flex: 1,
		flexWrap: 'wrap',
	},
	textMinuts: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lg,
		color: Colors.light.text,
	},
})
