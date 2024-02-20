import { fonts } from '@/constants/fonts'
import { Logotipo } from '@/components/ui/Logo'
import { View, Text } from '../Themed'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { Volume } from '../ui/Volume'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { GoBackTitle } from './GoBackTitle'

type LanguageType = 'em' | 'pt' | 'shim'
type HeaderModularProps = {
	isDefault?: boolean
	hasVolume?: boolean
	title?: string
}
const HeaderModular = ({
	isDefault = true,
	title,
	hasVolume = false,
}: HeaderModularProps) => {
	const translateY = useSharedValue(-100)
	const isDropdownVisible = useSharedValue(false)
	const [lang, setLang] = useState<LanguageType>('pt')
	const { i18n } = useTranslation()

	function handleChangeLanguage(language: LanguageType) {
		i18n.changeLanguage(language)
		setLang(language)
	}
	const toggleDropdown = () => {
		isDropdownVisible.value = !isDropdownVisible.value
		translateY.value = withSpring(
			isDropdownVisible.value ? -3066666660 : -100,
			{},
			(finished) => {
				if (!finished) {
					isDropdownVisible.value = !isDropdownVisible.value
				}
			},
		)
	}

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		}
	})

	return (
		<View style={[styles.container, !isDefault && styles.containerWithBg]}>
			{isDefault ? <Logotipo /> : <GoBackTitle title={title} />}

			<View style={styles.actions} bgColor="transparent">
				{hasVolume && <Volume isDefault={isDefault} />}

				<View style={styles.modularView} bgColor="transparent">
					<TouchableOpacity onPress={toggleDropdown} style={styles.modularBtn}>
						<Text style={styles.btnText}>
							{lang === 'pt' ? 'Português' : 'Emakhwua'}
						</Text>
					</TouchableOpacity>

					<Animated.View
						style={[
							{
								position: 'absolute',
								top: -60,
								left: 0,
								width: 140,
								marginTop: 10,
								borderRadius: 18,
								backgroundColor: Colors.light.white,
							},
							// animatedStyle,
						]}
					>
						<TouchableOpacity
							onPress={() => handleChangeLanguage('pt')}
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								paddingTop: 20,
							}}
						>
							<Text style={styles.btnText}>Português</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleChangeLanguage('em')}
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								paddingTop: 20,
							}}
						>
							<Text style={styles.btnText}>Emakhwua</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleChangeLanguage('shim')}
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								paddingTop: 15,
								paddingBottom: 20,
							}}
						>
							<Text style={styles.btnText}>Shimakonde</Text>
						</TouchableOpacity>
					</Animated.View>
				</View>

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
