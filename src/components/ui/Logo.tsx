import { StyleSheet } from 'react-native'
import { fonts } from '@/constants/fonts'
import { View, Text } from '../Themed'

import Logo from '@/assets/Icons/Logo.svg'
import Colors from '@/constants/Colors'

const Logotipo = () => {
	return (
		<View style={styles.logo}>
			<Logo fontSize={32} />
			<Text style={styles.logoTitle}>Tablet Solar</Text>
		</View>
	)
}

export { Logotipo }

const styles = StyleSheet.create({
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 5,
	},
	logoTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.md,
		color: Colors.light.sunsetOrange,
	},
})
