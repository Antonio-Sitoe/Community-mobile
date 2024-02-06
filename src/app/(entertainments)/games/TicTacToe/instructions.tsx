import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import First from '@/assets/Icons/Game_1197.svg'
import Second from '@/assets/Icons/Game_1199.svg'
import Thirt from '@/assets/Icons/Game_1198.svg'

const Icon = ({ index }) => {
	return (
		<View style={styles.numbering}>
			<Text style={styles.numberingText}>{index}</Text>
		</View>
	)
}

export default function Instructions() {
	const { back } = useRouter()
	return (
		<>
			<HeaderModular isDefault={false} title="Jogo da Galo" />
			<View style={styles.container}>
				<Text style={styles.title}>Instruções</Text>
				<View style={styles.wrapper}>
					<View style={styles.wrapperContainer}>
						<View style={styles.wrapperChild}>
							<View style={styles.wrapperChildFlex}>
								<Icon index={1} />
								<First width={150} height={150} />
							</View>
							<View style={styles.wrapperChildTexts}>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr
								</Text>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr ustomAlert é um componente de modal customizado que
									aceita propr
								</Text>
							</View>
						</View>
						<View style={styles.wrapperChild}>
							<View style={styles.wrapperChildFlex}>
								<Icon index={2} />
								<Second width={150} height={150} />
							</View>
							<View style={styles.wrapperChildTexts}>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr omAlert é um componente de modal
								</Text>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr ustomAlert é um
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.wrapperContainer}>
						<View style={styles.wrapperChild}>
							<View style={styles.wrapperChildFlex}>
								<Icon index={3} />
								<Thirt width={150} height={150} />
							</View>
							<View style={styles.wrapperChildTexts}>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr
								</Text>
								<Text style={styles.wrapperChildText}>
									CustomAlert é um componente de modal customizado que aceita
									propr ustomAlert é um componente de modal customizado que
									aceita propr
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.rigthContainer}>
					<TouchableOpacity style={styles.rigthContainerButton} onPress={back}>
						<Text style={styles.rigthContainerButtonText}>Iniciar Jogo</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 50,
		position: 'relative',
		paddingVertical: 80,
		backgroundColor: '#F5F5F5',
	},
	wrapperContainer: { flex: 1, gap: 80 },
	title: {
		fontSize: fonts.size.xl,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.textAlternative,
		marginBottom: 50,
	},
	wrapperChildTexts: { flex: 1, gap: 20 },
	wrapperChildText: {
		fontSize: 15,
		color: Colors.light.textAlternative,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		lineHeight: 20,
	},
	numbering: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		backgroundColor: Colors.light.sunsetOrange,
	},
	wrapperChild: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 20,
	},
	wrapperChildFlex: {
		flexDirection: 'row',
		gap: 15,
	},
	numberingText: {
		color: Colors.light.white,
		fontSize: fonts.size.md,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 90,
	},
	rigthContainer: {
		position: 'absolute',
		bottom: 80,
		right: 50,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	rigthContainerButton: {
		width: 200,
		height: 60,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rigthContainerButtonText: {
		fontSize: fonts.size.md,
		color: Colors.light.white,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
})
