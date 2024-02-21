import { fonts } from '@/constants/fonts'
import { View } from '../Themed'
import { StyleSheet } from 'react-native'
import { GoBackTitle } from './GoBackTitle'
import { useTranslateHome } from '@/hooks/useTranslateHome'

import Colors from '@/constants/Colors'
import Dropdown from './Dropdown'

const InfoHeader = ({ isDefault = true, title }) => {
	const { lang, languageData, handleChangeLanguage } = useTranslateHome()
	return (
		<View style={[styles.container, !isDefault && styles.containerWithBg]}>
			<GoBackTitle title={title} />
			<View style={styles.modularView} bgColor="transparent">
				<Dropdown
					right={50}
					label={lang}
					data={languageData}
					onSelect={handleChangeLanguage}
				/>
			</View>
		</View>
	)
}

export { InfoHeader }

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 50,
		paddingTop: 13,
		paddingBottom: 23,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	containerWithBg: {
		backgroundColor: Colors.light.sunsetOrange,
		height: 100,
	},

	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
	},
	btn: {
		width: 68,
		height: 30,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnLeft: {
		backgroundColor: Colors.light.smokeWhite,
	},
	btnRigth: {
		backgroundColor: Colors.light.sunsetOrange,
	},

	btnText: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.sm,
	},

	modularView: {
		position: 'relative',
	},
	modularBtn: {
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		width: 140,
		flexDirection: 'row',
		gap: 5,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 18,
	},
})
