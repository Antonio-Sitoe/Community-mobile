import { Button, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '@/components/Themed'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts } from '@/constants/fonts'

import HandSwatch from '@/assets/Icons/HandSwatch.svg'
import Colors from '@/constants/Colors'
import React from 'react'

export default function Home() {
	const { push } = useRouter()
	return (
		<>
			<HeaderModular isDefault />
			<View style={styles.container}>
				<View style={[styles.containerChild, styles.containerChildWithMB]}>
					<View style={styles.child}>
						<Text style={styles.textTitle}>Informação</Text>
						<View style={[styles.mainCards]}>
							<TouchableOpacity style={styles.card}></TouchableOpacity>
							<TouchableOpacity style={styles.card}></TouchableOpacity>
							<TouchableOpacity style={styles.card}></TouchableOpacity>
							<TouchableOpacity style={styles.card}></TouchableOpacity>
						</View>
					</View>
					<View
						style={[
							styles.child2,
							{
								flexDirection: 'row',
								gap: 23,
							},
						]}
					>
						<View style={{ flex: 1 }}>
							<Text style={styles.textTitle}>Metereologia</Text>
							<View style={styles.cardMeteorlogia}></View>
						</View>
						<View>
							<Text style={styles.textTitle}>Powered By</Text>
							<View style={styles.mainCardWhiteSmokeContainer}>
								<TouchableOpacity
									style={styles.cardWhitesmoke}
								></TouchableOpacity>
								<TouchableOpacity
									style={styles.cardWhitesmoke}
								></TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<View style={[styles.containerChild, styles.containerChildWithMB]}>
					<View style={styles.child}>
						<Text style={styles.textTitle}>Entretenimento</Text>
						<View
							style={[
								styles.mainCards,
								{
									backgroundColor: Colors.light.smokeWhite,
								},
							]}
						>
							{[1, 2, 3, 4].map((item) => {
								return (
									<TouchableOpacity
										onPress={() => push('/(entertainments)/games')}
										key={item}
										style={[
											styles.card,
											{
												backgroundColor: Colors.light.lavenderBlush,
											},
										]}
									></TouchableOpacity>
								)
							})}
						</View>
					</View>
					<View style={styles.child2}>
						<Text
							style={[
								styles.textTitle,
								{
									color: Colors.light.charcoal,
								},
							]}
						>
							Outros |{' '}
							<Text
								style={{
									fontSize: 14,
									color: Colors.light.charcoal,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 6,
									fontFamily: fonts.fontFamyle.Gilroy_extraBold,
								}}
							>
								Arrasta <HandSwatch />
							</Text>
						</Text>
						<View
							style={{
								padding: 10,
								backgroundColor: Colors.light.smokeWhite,
								borderRadius: 9,
							}}
						>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: 23,
									height: 'auto',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<View style={{ gap: 23 }} bgColor="transparent">
									<TouchableOpacity style={styles.card}></TouchableOpacity>
									<TouchableOpacity style={styles.card}></TouchableOpacity>
								</View>
								<View style={{ gap: 23 }} bgColor="transparent">
									<TouchableOpacity style={styles.card}></TouchableOpacity>
									<TouchableOpacity style={styles.card}></TouchableOpacity>
								</View>
								<View style={{ gap: 23 }} bgColor="transparent">
									<TouchableOpacity style={styles.card}></TouchableOpacity>
									<TouchableOpacity style={styles.card}></TouchableOpacity>
								</View>
							</ScrollView>
						</View>
					</View>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 50,
	},
	containerChild: {
		width: '100%',

		flexDirection: 'row',
		gap: 23,
	},
	containerChildWithMB: {
		marginBottom: 20,
	},
	child: {
		flex: 1,
	},
	child2: {
		flex: 1.4,
	},

	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.lgSm,
		color: Colors.light.sunsetOrange,
		marginBottom: 8,
	},

	mainCards: {
		padding: 10,
		borderRadius: 9,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 25,
	},
	card: {
		width: 217,
		height: 123,
		backgroundColor: Colors.light.sunsetOrange,
		borderRadius: 9,
	},
	cardMeteorlogia: {
		backgroundColor: Colors.light.periwinkleGray,
		height: 280,
		borderRadius: 9,
	},
	mainCardWhiteSmokeContainer: {
		flexDirection: 'row',
		gap: 6,
	},
	cardWhitesmoke: {
		width: 94,
		height: 70,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 12,
	},
})
