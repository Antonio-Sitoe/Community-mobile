import { StyleSheet, Text, View, Image } from 'react-native'
import { View as Container } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { InfoHeader } from '@/components/ui/InfoHeader'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts } from '@/constants/fonts'

export default function About() {
	return (
		<>
			<InfoHeader isDefault={false} title="+ Info" />
			<View style={styles.main}>
				<Container style={styles.container}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 60,
						}}
					>
						{/* tablet solar */}
						<View style={styles.view}>
							<Image
								source={require('@/assets/Icons/TabletSolar-Logo.png')}
								alt=""
								style={{ width: 200, height: 40 }}
							/>
							<Text style={styles.title}>Tablet SOLAR</Text>
							<Text style={styles.text}>
								É um dispositivo digital concebido no âmbito do projecto
								intitulado “Girafa Solar”, implementado em diversos locais de
								Moçambique e tem como objectivos: promover acesso a novas
								tecnologias de informação. A Fundação Carlos Morgado é
								implementadora das duas soluções, em parceria com a MWE –
								Mozambique Women of Energy, enquanto a VOID é responsável pelo
								desenvolvimento tecnológico do dispositivo digital.
							</Text>
						</View>
						{/* tablet solar */}
						<View
							style={{
								marginTop: 30,
								backgroundColor: Colors.light.sunsetOrange,
								padding: 10,
								width: 210,
							}}
						>
							<Image
								source={require('@/assets/Icons/carlos_morgado.png')}
								alt=""
								style={{
									objectFit: 'contain',
								}}
							/>
						</View>
						<View style={styles.view}>
							<Text style={styles.title}>Fundação Carlos Morgado</Text>
							<Text style={styles.subtitle}>Quem somos </Text>
							<Text style={styles.text}>
								Somos uma organização moçambicana sem fins lucrativos que visa
								potencializar e promover o desenvolvimento sustentável de
								Moçambique.
							</Text>
						</View>
						<View style={styles.view}>
							<Text style={styles.subtitle}>O que fazemos</Text>
							<Text style={styles.text}>
								Trabalhamos com as partes interessadas para conceber e
								implementar programas em educação, saúde e cultura para criar
								impacto positivo.
							</Text>
						</View>
						<View style={styles.view}>
							<Text style={styles.subtitle}>Como fazemos</Text>
							<Text style={styles.text}>
								Envolvemos as comunidades, governo e sector privado como
								parceiros para partilhar responsabilidades em direcção aos
								objectivos comuns.
							</Text>
						</View>
						<View style={styles.grid}>
							<View
								style={{
									marginBottom: 30,
									flexBasis: 300,
								}}
							>
								<Text style={styles.subtitle}>Telefones</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
							<View
								style={{
									marginBottom: 30,
									flexBasis: 300,
								}}
							>
								<Text style={styles.subtitle}>Celular</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.subtitle}>Faz</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.subtitle}>Email</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.subtitle}>Endereco</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.subtitle}>Website</Text>
								<Text style={styles.text}>25848848486</Text>
							</View>
						</View>

						{/* mwe */}
						<View style={styles.view}>
							<Image
								source={require('@/assets/Icons/mwe.png')}
								alt=""
								style={{ width: 100, height: 100, objectFit: 'contain' }}
							/>
							<Text style={styles.title}>MWE – Mozambique Women of Energy</Text>
							<View style={styles.view}>
								<Text style={styles.subtitle}>Quem somos </Text>
								<Text style={styles.text}>
									Somos uma organização não governamental dinâmica, sem fins
									lucrativos, empenhada em renovar a narrativa no sector
									energético em Moçambique. Concentramo-nos em capacitar
									mulheres, contribuindo activamente para os Objectivos de
									Desenvolvimento Sustentável 5 e 7, Igualdade de Género e
									Energia Acessível e Limpa para Todos, respectivamente.
								</Text>
							</View>

							<View style={styles.view}>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Endereco</Text>
									<Text style={styles.text}>
										Av. Paulo Samuel Kankhomba Nº 453, RC Maputo - Moçambique
									</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Email</Text>
									<Text style={styles.text}>energizeequality@gmail.com</Text>
								</View>

								<View style={styles.row}>
									<Text style={styles.subtitle}>Website</Text>
									<Text style={styles.text}>
										www.mozambiquewomenofenergy.com
									</Text>
								</View>
							</View>
						</View>
						<View style={styles.view}>
							<Image
								source={require('@/assets/Icons/void.png')}
								alt=""
								style={{ width: 100, height: 100, objectFit: 'contain' }}
							/>
							<Text style={styles.title}>VOID</Text>
							<View style={styles.view}>
								<Text style={styles.text}>
									Na Void, nossa filosofia é a inovação, criando algo novo ou
									transformando conceitos existentes. Vemos a {`"VOID"`} como o
									ponto inicial, de onde surgem novas ideias. Encaramos desafios
									começando do zero, analisando diversas perspectivas, e
									transformando mentes e comportamentos. Oferecendo serviços de
									consultoria de TI, desenvolvimento web/mobile, design UX/UI,
									branding, e comunicação com avanços reconhecidos em diversos
									sectores.
								</Text>
							</View>

							<View style={styles.containerRow}>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Telefones</Text>
									<Text style={styles.text}>+258 84 3129873</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Email</Text>
									<Text style={styles.text}>hello@void.co.mz</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Endereco</Text>
									<Text style={styles.text}>
										Av.Tomás Nduda, 386 Maputo – Mozambique
									</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.subtitle}>Website</Text>
									<Text style={styles.text}>www.void.co.mz</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</Container>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	main: { flex: 1, alignItems: 'center' },
	container: {
		flex: 1,
		width: 800,
		backgroundColor: Colors.light.white,
		paddingHorizontal: 52,
		paddingTop: 70,
	},
	title: {
		fontSize: fonts.size.lg,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.sunsetOrange,
		marginBottom: 10,
		marginTop: 25,
	},
	grid: {
		marginBottom: 30,
		flexDirection: 'row',
		alignContent: 'flex-start',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		flex: 1,
	},
	subtitle: {
		marginBottom: 3,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.charcoal,
	},
	text: {
		fontSize: fonts.size.mdSm,
		fontFamily: fonts.fontFamyle.Gilroy_regular,
		lineHeight: 30,
	},
	view: {
		marginBottom: 30,
	},
	containerRow: {
		marginBottom: 30,
		flexDirection: 'row',
		alignContent: 'flex-start',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		flex: 1,
	},
	row: {
		marginBottom: 30,
		flexBasis: 300,
	},
})
