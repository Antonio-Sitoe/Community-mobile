/* eslint-disable @typescript-eslint/no-var-requires */
import { create } from 'zustand'
import { useEffect } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { alphaBetaAi, calculateWinner } from '@/utils/games'
import { fonts } from '@/constants/fonts'
import { Href, useRouter } from 'expo-router'
import { Audio } from 'expo-av'

import Modal from 'react-native-modal'
import Player_X from '@/assets/Icons/Game_X.svg'
import Player_O from '@/assets/Icons/Game_Circle.svg'
import Colors from '@/constants/Colors'

const win_mp3 = require('@/assets/Audio/win.mp3')
const tap_mp3 = require('@/assets/Audio/tap.mp3')
const tie_mp3 = require('@/assets/Audio/tie.mp3')

type Player = 'X' | 'O' | 'tie'
type Winner = Player | null | string
type Marker = Array<number | string | null>
type Count = {
	x: number
	o: number
}

interface IusePlayGameProps {
	active_player: Player
	markers: Marker
	isComputer: boolean
	winner: Winner
	lastWinner: Winner
	count: Count
	isModalVisible: boolean
	isBlocking: boolean
	timeout: null | NodeJS.Timeout
	resetPlay(): void
	showToast(obj?: boolean): void
	play_with_computer(): void
	componentAmount(): void
	markPosition(index: number): void
	handleChangeGameType(): void
	calculeCount(winner: Winner): Count
	sound: Audio.Sound | null
	playTapSound: () => Promise<void>
	playWinnerSound: () => Promise<void>
	playTieSound: () => Promise<void>
}
export const usePlayGame = create<IusePlayGameProps>((set, get) => ({
	active_player: 'X',
	isBlocking: false,
	isModalVisible: false,
	sound: null,
	markers: Array(9).fill(null),
	isComputer: false,
	winner: null,
	timeout: null,
	lastWinner: '',
	count: {
		x: 0,
		o: 0,
	},
	calculeCount: (winner: Player) => {
		const count = get().count
		if (winner === 'O') {
			count.o = count.o + 1
		} else if (winner === 'X') {
			count.x = count.x + 1
		}
		return count
	},
	showToast: (isModalVisible = true) => set(() => ({ isModalVisible })),
	handleChangeGameType: () =>
		set((state) => {
			state.resetPlay()
			return {
				isComputer: !state.isComputer,
				count: {
					o: 0,
					x: 0,
				},
			}
		}),
	markPosition: (index: number) => {
		set((state) => ({
			...state,
			isBlocking: true,
		}))
		get().playTapSound()
		if (get().timeout) {
			clearTimeout(get().timeout as NodeJS.Timeout)
		}
		const markers = get().markers
		if (markers[index] === null) {
			const newMarkers = [...markers]
			newMarkers[index] = get().active_player
			set((state) => ({
				...state,
				markers: newMarkers,
				active_player: state.active_player === 'X' ? 'O' : 'X',
			}))
			const winner = calculateWinner(newMarkers)
			if (get().isComputer && get().active_player === 'O' && !winner) {
				get().timeout = setTimeout(() => {
					get().play_with_computer()
				}, 500)
			} else if (winner) {
				const count = get().calculeCount(winner as Winner)
				set((state) => ({
					...state,
					count,
					winner: winner === 'tie' ? 'Empate' : `${winner}`,
					lastWinner: winner === 'tie' ? 'Empate' : `${winner}`,
				}))

				if (winner === 'O' && get().isComputer) {
					get().playTieSound()
				} else if (winner === 'tie') {
					get().playTieSound()
				} else {
					get().playWinnerSound()
				}
			}
		}
		set((state) => ({
			...state,
			isBlocking: false,
		}))
	},
	play_with_computer: () => {
		const position = alphaBetaAi(get().markers, 'O')
		get().markPosition(position)
	},
	resetPlay: () =>
		set(() => ({
			markers: Array(9).fill(null),
			active_player: 'X',
			winner: null,
		})),
	componentAmount: () =>
		set((state) => {
			state.resetPlay()
			return {
				count: {
					x: 0,
					o: 0,
				},
			}
		}),

	playTapSound: async () => {
		const { sound } = await Audio.Sound.createAsync(tap_mp3)
		set({ sound })
		await sound.playAsync()
	},
	playWinnerSound: async () => {
		const { sound } = await Audio.Sound.createAsync(win_mp3)
		set({ sound })
		await sound.playAsync()
	},
	playTieSound: async () => {
		const { sound } = await Audio.Sound.createAsync(tie_mp3)
		set({ sound })
		await sound.playAsync()
	},
}))

export default function TicTacToe() {
	const router = useRouter()

	const {
		active_player,
		markers,
		isComputer,
		winner,
		handleChangeGameType,
		resetPlay,
		count,
		componentAmount,
		showToast,
		markPosition,
		playWinnerSound,
		playTieSound,
		isModalVisible,
		sound,
		lastWinner,
		isBlocking,
	} = usePlayGame()

	function handleOpenInstructions() {
		router.push({
			pathname: '/(entertainments)/games/TicTacToe/instructions',
			params: {
				text: 'Continuar a jogar',
			},
		} as Href<{
			pathname: string
			params: {
				text: string
			}
		}>)
	}

	const displayRealTimeMessage = (winner: Winner, active_player: Player) => {
		if (winner) {
			if (winner === 'Empate') {
				return 'Empate!'
			} else {
				return `Vencedor: ${winner}`
			}
		} else {
			return `Agora Joga: ${active_player}`
		}
	}

	useEffect(() => {
		if (winner) {
			showToast(true)
			const timeout = setTimeout(resetPlay, 500)
			return () => clearTimeout(timeout)
		}
	}, [playTieSound, playWinnerSound, resetPlay, showToast, winner])

	useEffect(() => {
		return sound
			? () => {
					console.log('Unloading Sound')
					sound.unloadAsync()
				}
			: undefined
	}, [sound])

	useEffect(() => () => componentAmount(), [componentAmount])

	const SquareButton = ({ index }: { index: number }) => {
		const borderRadius: any = {}
		switch (index) {
			case 0:
				borderRadius.borderTopLeftRadius = 18
				break
			case 2:
				borderRadius.borderTopRightRadius = 18
				break
			case 6:
				borderRadius.borderBottomLeftRadius = 18
				break
			case 8:
				borderRadius.borderBottomRightRadius = 18
				break
		}

		return (
			<TouchableOpacity
				disabled={isBlocking}
				style={[
					styles.ceil,
					{
						backgroundColor: index % 2 === 0 ? '#e35136' : '#ffe8d2',
						...borderRadius,
					},
				]}
				onPress={() => {
					markPosition(index)
				}}
			>
				{markers[index] === 'X' && (
					<Player_X style={styles.icon} width={133} height={133} />
				)}
				{markers[index] === 'O' && (
					<Player_O style={styles.icon} width={133} height={133} />
				)}
			</TouchableOpacity>
		)
	}

	return (
		<>
			<HeaderModular isDefault={false} title="Jogo da Galo" />
			<View style={styles.container}>
				<View style={styles.mainText}>
					<Text style={styles.textTitle}>
						{displayRealTimeMessage(winner, active_player)}
					</Text>
				</View>

				<View style={styles.Main}>
					<View style={styles.MainInfo}>
						<View style={styles.MainCard}>
							<Text style={styles.MainCardTitle}>Resultado</Text>
							<View style={styles.MainView}>
								<Text style={styles.player}>Jogador X</Text>
								<Text style={styles.player}>
									{count?.x} | {count?.o}
								</Text>
								<Text style={styles.player}>Jogador O</Text>
							</View>
						</View>

						<TouchableOpacity
							onPress={handleChangeGameType}
							style={[
								styles.buttonChangeType,
								{
									backgroundColor: Colors.light.sunsetOrange,
								},
							]}
						>
							<Text
								style={{
									fontFamily: fonts.fontFamyle.Gilroy_extraBold,
									color: Colors.light.white,
								}}
							>
								{isComputer
									? 'Jogar com outro Jogador'
									: 'Jogar com Computador'}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={resetPlay}
							style={styles.buttonChangeType}
						>
							<Text
								style={{
									fontFamily: fonts.fontFamyle.Gilroy_extraBold,
									color: Colors.light.sunsetOrange,
								}}
							>
								Reiniciar jogo
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.mainTabContainer}>
						<View style={styles.mainContainer}>
							{markers.map((_, index) => {
								return <SquareButton key={index} index={index} />
							})}
						</View>
					</View>
					<View style={styles.rigthContainer}>
						<TouchableOpacity
							style={styles.rigthContainerButton}
							onPress={handleOpenInstructions}
						>
							<Text style={styles.rigthContainerButtonText}>Instruções</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<Modal
				isVisible={isModalVisible}
				backdropColor={Colors.light.sunsetOrange}
				backdropOpacity={0.9}
				animationIn="zoomInDown"
				animationOut="zoomOutUp"
				animationInTiming={600}
				animationOutTiming={600}
				backdropTransitionInTiming={600}
				backdropTransitionOutTiming={600}
				onBackdropPress={() => showToast(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>
							{lastWinner === 'Empate'
								? 'Empate!'
								: `Jogador ${lastWinner} Venceu!`}
						</Text>
						<TouchableOpacity
							style={[styles.buttonChangeType, styles.modalButton]}
							onPress={() => showToast(false)}
						>
							<Text
								style={{
									fontFamily: fonts.fontFamyle.Gilroy_extraBold,
									color: Colors.light.sunsetOrange,
								}}
							>
								Continuar
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},

	modalContent: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	modalButton: {
		width: 384,
		backgroundColor: Colors.light.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.white,
		fontSize: fonts.size.xl + 30,
		marginBottom: 30,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.light.darkSlateGray,
		paddingHorizontal: 50,
	},
	MainInfo: {
		flexBasis: 260,
	},
	MainView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 25,
	},
	player: {
		fontSize: 13,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.white,
	},
	MainCard: {
		backgroundColor: '#E35136',
		borderRadius: 15,
		paddingHorizontal: 14,
		paddingVertical: 18,
	},
	MainCardTitle: {
		fontSize: fonts.size.sm,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		color: Colors.light.white,
	},
	Main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 60,
	},
	mainTabContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainText: {
		marginTop: 25,
		marginBottom: 15,
		alignItems: 'center',
	},
	textTitle: {
		width: 150,
		marginLeft: 60,
		color: Colors.light.white,
		fontSize: fonts.size.md,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	rigthContainer: {
		width: 'auto',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	rigthContainerButton: {
		width: 120,
		height: 40,
		backgroundColor: Colors.light.white,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rigthContainerButtonText: {
		fontSize: fonts.size.sm,
		color: Colors.light.sunsetOrange,
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	buttonChangeType: {
		height: 50,
		marginTop: 20,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 33,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginRight: 90,
		flexWrap: 'wrap',
		width: 800,
		borderRadius: 18,
	},
	mensagem: {
		fontSize: 20,
		marginBottom: 20,
		color: Colors.light.white,
	},
	ceil: {
		width: 201,
		height: 201,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		height: 62,
		width: 62,
	},
	cancleBTN: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},
	cancelIcon: {
		height: 80,
		width: 80,
	},
})
