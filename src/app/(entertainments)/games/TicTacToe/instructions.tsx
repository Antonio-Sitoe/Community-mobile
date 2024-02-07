import { StyleSheet, Text, View } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
	const router = useRouter()
	const { text } = useLocalSearchParams()

	function gotoGAme() {
		router.push('/(entertainments)/games/TicTacToe/')
	}
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
									No jogo do galo, jogadores escolhem entre {`"X"`} e {`"O"`}{' '}
									para formar filas no tabuleiro.
								</Text>
								<Text style={styles.wrapperChildText}>
									Estrategicamente, começar com {`"X"`} na casa do meio otimiza
									as chances de vitória, com quatro possíveis combinações para
									formar uma fila de três {`"X"`} ou {`"O"`}.
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
									Os jogadores alternam suas jogadas, desenhando seus
									respectivos símbolos no tabuleiro.
								</Text>
								<Text style={styles.wrapperChildText}>
									O objetivo é evitar que o oponente forme uma fila e ao mesmo
									tempo concentrar-se em sua própria estratégia para alcançar a
									vitória.
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
									Os jogadores alternam suas jogadas até que um deles vença ao
									formar uma linha de três símbolos consecutivos, seja
									horizontal, vertical ou diagonal.
								</Text>
								<Text style={styles.wrapperChildText}>
									Em caso de habilidade semelhante entre os jogadores, as
									chances de empate são significativas.
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.rigthContainer}>
					<TouchableOpacity
						style={styles.rigthContainerButton}
						onPress={gotoGAme}
					>
						<Text style={styles.rigthContainerButtonText}>
							{text || 'Iniciar Jogo'}
						</Text>
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
		paddingVertical: 50,
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
		gap: 23,
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
		width: 250,
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
