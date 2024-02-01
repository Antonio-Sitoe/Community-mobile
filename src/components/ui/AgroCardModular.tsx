import { Link, Route } from 'expo-router'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { MediaCardModularProps } from './MediaCardModular'

export interface AgroCardModularProps {
	imageUri: string | number
	title: string
	href: Route<string>
	price: string
}

export function AgroCardModular({
	imageUri,
	title,
	href,
	price,
}: AgroCardModularProps) {
	const image =
		typeof imageUri === 'number'
			? imageUri
			: {
					uri: imageUri,
				}
	return (
		<Link href="#">
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
					<Text style={styles.textMinuts}>{price}</Text>
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
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 106,
		height: 94,
		borderRadius: 24,
		backgroundColor: '#fff',
		elevation: 2,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		width: 106,
		height: 94,
	},
	containerTexts: { flex: 1, width: 300 },
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lg,
		color: Colors.light.text,
		marginBottom: 4,
		width: '100%',
	},
	textMinuts: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.sm,
		color: Colors.light.text,
	},
})
