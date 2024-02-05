import { StyleSheet, Text, View } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { create } from 'zustand'
import Player_X from '@/assets/Icons/Game_X.svg'
import Player_O from '@/assets/Icons/Game_Circle.svg'
import Colors from '@/constants/Colors'
import { useEffect, useMemo } from 'react'

type Player = 'X' | 'O'
type Marker = Array<number | string | null>
interface IusePlayGameProps {
	active_player: Player
	markers: Marker
	setMarkers(marker: Marker): void
	set_active_player(player: Player): void
}
export const usePlayGame = create<IusePlayGameProps>((set) => ({
	active_player: 'X',
	markers: [null, null, null, null, null, null, null, null, null],
	set_active_player: (player: Player) =>
		set((state) => ({ ...state, active_player: player })),
	setMarkers: (markers) => set((state) => ({ ...state, markers })),
}))

export default function ChickenGame() {
	const { active_player, markers, setMarkers, set_active_player } =
		usePlayGame()

	const markPosition = (position: number) => {
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

	useEffect(() => {
		const calculateWinner = (squares) => {
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
			return null
		}
		const resetMarkers = () => {
			setMarkers([null, null, null, null, null, null, null, null, null])
		}

		const winner = calculateWinner(markers)
		if (winner === 'X') {
			alert('Player X Won!')
			resetMarkers()
		} else if (winner === 'O') {
			alert('Player O Won!')
			setTimeout(() => {
				resetMarkers()
			}, 300)
		}
	}, [markers, setMarkers])
	console.log('Renderizou')

	return (
		<>
			<HeaderModular isDefault={false} title="Jogo da Galo" />

			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					backgroundColor: Colors.light.darkSlateGray,
					paddingBottom: 30,
				}}
			>
				<View style={{ marginBottom: 15 }}>
					<Text style={{ color: 'white' }}>Player {active_player}</Text>
				</View>
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
				<View
					style={{
						position: 'absolute',
						bottom: 50,
						right: 50,
					}}
				>
					<TouchableOpacity
						style={{
							width: 100,
							height: 30,
							backgroundColor: '#FFFFFF',
							borderRadius: 18,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text>Instruções</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		width: 800,
		borderRadius: 18,
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
