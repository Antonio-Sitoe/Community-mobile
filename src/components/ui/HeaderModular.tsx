import { fonts } from '@/constants/fonts'
import { Logotipo } from '@/components/ui/Logo'
import { View, Text } from '../Themed'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

import Colors from '@/constants/Colors'
import { Volume } from '../ui/Volume'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { GoBackTitle } from './GoBackTitle'

type HeaderModularProps = {
	isDefault?: boolean
	title?: string
}
const HeaderModular = ({ isDefault = true, title }: HeaderModularProps) => {
	const [lang, setLang] = useState<'en' | 'pt'>('pt')
	const { i18n } = useTranslation()

	function handleChangeLanguage() {
		if (lang === 'en') {
			i18n.changeLanguage('pt')
			setLang('pt')
		} else {
			i18n.changeLanguage('en')
			setLang('en')
		}
	}

	return (
		<View style={[styles.container, !isDefault && styles.containerWithBg]}>
			{isDefault ? <Logotipo /> : <GoBackTitle title={title} />}

			<View style={styles.actions} bgColor="transparent">
				<Volume isDefault={isDefault} />
				<TouchableOpacity
					onPress={handleChangeLanguage}
					style={[
						styles.btn,
						styles.btnLeft,
						{
							flexDirection: 'row',
							gap: 5,
						},
					]}
				>
					<Image
						source={require('@/assets/Icons/bandera.png')}
						width={18}
						height={18}
						alt="Bandera"
					/>
					<Text style={styles.btnText}>{lang === 'pt' ? 'PT' : 'EN'}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.btn, isDefault ? styles.btnRigth : styles.btnLeft]}
				>
					<Text
						style={styles.btnText}
						color={isDefault ? Colors.light.white : Colors.light.sunsetOrange}
					>
						+ info
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export { HeaderModular }

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
})
