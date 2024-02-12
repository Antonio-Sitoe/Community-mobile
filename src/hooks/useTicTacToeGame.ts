/* eslint-disable @typescript-eslint/no-var-requires */
import { create } from 'zustand'
import { alphaBetaAi, calculateWinner } from '@/utils/games'
import { Audio } from 'expo-av'

const win_mp3 = require('@/assets/Audio/win.mp3')
const tap_mp3 = require('@/assets/Audio/tap.mp3')
const tie_mp3 = require('@/assets/Audio/tie.mp3')

export type Player = 'X' | 'O' | 'tie'
export type Winner = Player | null | string
export type Marker = Array<number | string | null>
export type Count = {
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
export const useTicTacToeGame = create<IusePlayGameProps>((set, get) => ({
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
		if (position) {
			get().markPosition(position)
		}
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
