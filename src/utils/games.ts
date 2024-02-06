type MarkerTicTacToe = Array<number | string | null>
type PlayerTicTacToe = 'X' | 'O' | 'tie'

export const calculateWinner = (squares: MarkerTicTacToe) => {
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
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	if (!squares.includes(null)) {
		return 'tie'
	}
	return null
}

export const getMinimaxMove = (
	tab: MarkerTicTacToe,
	player: PlayerTicTacToe,
): any => {
	const playeres = { X: -1, O: 1 }
	const vitoria = calculateWinner(tab)
	if (vitoria) {
		return { score: playeres[vitoria], index: -1 }
	}

	const movimentos: any = []
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
}
