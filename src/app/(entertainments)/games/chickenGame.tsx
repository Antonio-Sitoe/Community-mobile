import { StyleSheet, Text, View } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { create } from 'zustand'
import Player_X from '@/assets/Icons/Game_X.svg'
import Player_O from '@/assets/Icons/Game_Circle.svg'
import Colors from '@/constants/Colors'
import React, { useCallback, useEffect, useRef } from 'react'

type Player = 'X' | 'O'
type Winner = Player | null | string
type Marker = Array<number | string | null>
interface IusePlayGameProps {
	active_player: Player
	markers: Marker
	isComputer: boolean
	winner: Winner
	setMarkers(marker: Marker): void
	set_active_player(player: Player): void
	set_winner(player: Player | null | string): void
	resetPlay(): void
	handleChangeGameType(): void
}
export const usePlayGame = create<IusePlayGameProps>((set) => ({
	active_player: 'X',
	markers: Array(9).fill(null),
	isComputer: false,
	winner: null,
	set_winner: (winner: Player | null) => set((state) => ({ ...state, winner })),
	set_active_player: (player: Player) =>
		set((state) => ({ ...state, active_player: player })),
	setMarkers: (markers) => set((state) => ({ ...state, markers })),
	handleChangeGameType: () =>
		set((state) => {
			state.resetPlay()
			return { isComputer: !state.isComputer }
		}),
	resetPlay: () =>
		set(() => ({
			markers: Array(9).fill(null),
			active_player: 'X',
			winner: null,
		})),
}))

export default function ChickenGame() {
	const {
		active_player,
		markers,
		setMarkers,
		set_active_player,
		isComputer,
		winner,
		set_winner,
		handleChangeGameType,
		resetPlay,
	} = usePlayGame()

	function markPosition(position: number) {
		if (!markers[position]) {
			const temp = [...markers]
			temp[position] = active_player
			setMarkers(temp)
			if (active_player === 'X') {
				set_active_player('O')
			} else {
				set_active_player('X')
			}
		}
	}

	const calculateWinner = (squares: Marker) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a]
			}
		}
		if (!squares.includes(null)) {
			return 'tie'
		}
		return null
	}

	const getMinimaxMove = useCallback((tab: Marker, player: Player) => {
		const playeres = { X: -1, O: 1 }
		const vitoria = calculateWinner(tab)
		if (vitoria) {
			return { score: playeres[vitoria], index: -1 }
		}

		const movimentos = []
		for (let i = 0; i < tab.length; i++) {
			if (tab[i] === null) {
				const novoTabuleiro = [...tab]
				novoTabuleiro[i] = player
				const movimento = getMinimaxMove(
					novoTabuleiro,
					player === 'X' ? 'O' : 'X',
				)
				movimento.index = i
				movimentos.push(movimento)
			}
		}

		if (player === 'O') {
			const melhorMovimento = movimentos.reduce(
				(melhor, movimento) =>
					melhor.score > movimento.score ? melhor : movimento,
				{ score: -Infinity },
			)
			return melhorMovimento
		} else {
			const melhorMovimento = movimentos.reduce(
				(melhor, movimento) =>
					melhor.score < movimento.score ? melhor : movimento,
				{ score: Infinity },
			)
			return melhorMovimento
		}
	}, [])

	useEffect(() => {
		const play_with_computer = () => {
			const position = getMinimaxMove(markers, 'O').index
			makeMove(position)
		}

		const makeMove = (index: number) => {
			if (markers[index] === null && !winner) {
				const newMarkers = [...markers]
				newMarkers[index] = active_player
				setMarkers(newMarkers)
				set_active_player(active_player === 'X' ? 'O' : 'X')
			}
		}

		const winner = calculateWinner(markers)

		if (winner === 'X') {
			alert('Player X Won!')
			resetPlay()
		} else if (winner === 'O') {
			alert('Player O Won!')
			resetPlay()
		} else if (winner === 'tie') {
			alert('Empate')
			resetPlay()
		}

		if (isComputer) {
			if (active_player === 'O' && !winner) {
				const timeout = setTimeout(() => {
					play_with_computer()
				}, 500)
				return () => clearTimeout(timeout)
			}
		}
	}, [
		active_player,
		isComputer,
		markers,
		getMinimaxMove,
		setMarkers,
		set_active_player,
		set_winner,
		winner,
	])

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

	console.log('isComputer', isComputer)

	return (
		<>
			<HeaderModular isDefault={false} title="Jogo da Galo" />
			<View style={styles.container}>
				<View>
					<Text style={styles.mensagem}>
						{displayRealTimeMessage(winner, active_player)}
					</Text>
					<TouchableOpacity
						onPress={handleChangeGameType}
						style={styles.buttonChangeType}
					>
						<Text>
							{isComputer ? 'Jogar com Amigo' : 'Jogar com Computador'}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.mainTabContainer}>
					<View style={styles.mainContainer}>
						<TouchableOpacity
							style={styles.cell_top_left}
							onPress={() => markPosition(0)}
						>
							{markers[0] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[0] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_top_mid}
							onPress={() => markPosition(1)}
						>
							{markers[1] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[1] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_top_right}
							onPress={() => markPosition(2)}
						>
							{markers[2] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[2] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_mid_left}
							onPress={() => markPosition(3)}
						>
							{markers[3] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[3] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_mid_mid}
							onPress={() => markPosition(4)}
						>
							{markers[4] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[4] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_mid_right}
							onPress={() => markPosition(5)}
						>
							{markers[5] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[5] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_bottom_left}
							onPress={() => markPosition(6)}
						>
							{markers[6] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[6] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_bottom_mid}
							onPress={() => markPosition(7)}
						>
							{markers[7] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[7] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.cell_bottom_right}
							onPress={() => markPosition(8)}
						>
							{markers[8] === 'X' && (
								<Player_X style={styles.icon} width={133} height={133} />
							)}
							{markers[8] === 'O' && (
								<Player_O style={styles.icon} width={133} height={133} />
							)}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.rigthContainer}>
					<TouchableOpacity style={styles.rigthContainerButton}>
						<Text>Instruções</Text>
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
		width: 100,
		height: 30,
		backgroundColor: '#FFFFFF',
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonChangeType: {
		width: 200,
		height: 50,
		backgroundColor: '#FFFFFF',
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
	cell_top_left: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffe8d2',
		borderTopLeftRadius: 18,
	},
	cell_top_mid: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E35136',
	},
	cell_top_right: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffe8d2',
		borderTopRightRadius: 18,
	},
	cell_mid_left: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e35136',
	},
	cell_mid_mid: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffe8d2',
	},
	cell_mid_right: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e35136',
	},
	cell_bottom_left: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffe8d2',
		borderBottomLeftRadius: 18,
	},
	cell_bottom_mid: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e35136',
	},
	cell_bottom_right: {
		width: 201,
		height: 201,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffe8d2',
		borderBottomRightRadius: 18,
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
