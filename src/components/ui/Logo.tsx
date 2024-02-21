import { StyleSheet, Image } from 'react-native'
import { View } from '../Themed'

const Logotipo = () => {
	return (
		<View style={styles.logo}>
			<Image
				source={require('@/assets/Icons/TabletSolar-Logo.png')}
				alt="joga betis"
				style={styles.image}
			/>
		</View>
	)
}

export { Logotipo }

const styles = StyleSheet.create({
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	image: {
		width: 180,
		height: 59,
	},
})
