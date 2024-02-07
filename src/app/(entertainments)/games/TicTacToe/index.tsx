/* eslint-disable @typescript-eslint/no-var-requires */
import { create } from 'zustand'
import { useEffect } from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import { ToastType } from 'react-native-toast-message/lib/src/types'
import { alphaBetaAi, calculateWinner } from '@/utils/games'
import { fonts } from '@/constants/fonts'
import { Href, useRouter } from 'expo-router'
import { Audio } from 'expo-av'

import Player_X from '@/assets/Icons/Game_X.svg'
import Player_O from '@/assets/Icons/Game_Circle.svg'
import Colors from '@/constants/Colors'
import Toast from 'react-native-toast-message'

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

type ToastTypeProps = { text: string; type: ToastType }

interface IusePlayGameProps {
	active_player: Player
	markers: Marker
	isComputer: boolean
	winner: Winner
	count: Count
	timeout: null | NodeJS.Timeout
	resetPlay(): void
	showToast(obj: ToastTypeProps): void
	play_with_computer(): void
	componentAmount(): void
	markPosition(index: number): void
	setCount(count: Count): void
	handleChangeGameType(): void
	setMarkers(marker: Marker): void
	set_winner(player: Winner): void
	calculeCount(winner: Winner): Count
	set_active_player(player: Player): void
	sound: Audio.Sound | null
	playTapSound: () => Promise<void>
	playWinnerSound: () => Promise<void>
	playTieSound: () => Promise<void>
}
export const usePlayGame = create<IusePlayGameProps>((set, get) => ({
	active_player: 'X',
	sound: null,
	markers: Array(9).fill(null),
	isComputer: false,
	winner: null,
	timeout: null,
	count: {
		x: 0,
		o: 0,
	},
	setCount: (count: Count) => set((state) => ({ ...state, count })),
	calculeCount: (winner: Player) => {
		const count = get().count
		if (winner === 'O') {
			count.o = count.o + 1
		} else if (winner === 'X') {
			count.x = count.x + 1
		}
		return count
	},
	set_winner: (winner: Player | null) => set((state) => ({ ...state, winner })),
	set_active_player: (player: Player) =>
		set((state) => ({ ...state, active_player: player })),
	setMarkers: (markers) => set((state) => ({ ...state, markers })),
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
				}))
			}
		}
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
	showToast: ({ text, type }: ToastTypeProps) => {
		Toast.show({
			type,
			text1: text,
			swipeable: true,
			position: 'bottom',
			visibilityTime: 1000,
			bottomOffset: 350,
			text1Style: {
				fontSize: 18,
				fontFamily: fonts.fontFamyle.Gilroy_extraBold,
			},
		})
	},

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
		sound,
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
			return `Jogador atual: ${active_player}`
		}
	}

	useEffect(() => {
		if (winner) {
			showToast({
				text: winner === 'Empate' ? 'Empate' : `Vencedor: ${winner}`,
				type: winner === 'Empate' ? 'info' : 'success',
			})
			console.log('winner', winner)
			if (winner !== 'Empate') {
				playWinnerSound()
			} else {
				playTieSound()
			}
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
				<View>
					<Text style={styles.mensagem}>
						{displayRealTimeMessage(winner, active_player)}
					</Text>
					<Text style={styles.mensagem}>Jogador X: {count?.x}</Text>
					<Text style={styles.mensagem}>Jogador O: {count?.o}</Text>
					<TouchableOpacity
						onPress={handleChangeGameType}
						style={styles.buttonChangeType}
					>
						<Text>
							{isComputer ? 'Jogar com Amigo' : 'Jogar com Computador'}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={resetPlay} style={styles.buttonChangeType}>
						<Text>Reiniciar jogo</Text>
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
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.light.darkSlateGray,
		paddingVertical: 50,
		paddingHorizontal: 50,
	},
	mainTabContainer: {
		flex: 1,
		width: 500,
	},
	rigthContainer: {
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
		width: 200,
		height: 50,
		marginTop: 10,
		backgroundColor: Colors.light.smokeWhite,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
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
