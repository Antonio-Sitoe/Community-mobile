import { Marker, Player } from '@/hooks/useTicTacToeGame'

export const calculateWinner = (squares: Marker) => {
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

export function alphaBetaAi(markers: Marker, player: Player) {
	const PLAYER_X = 'X'
	const PLAYER_O = 'O'
	const WINNING_COMBINATIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	function isBoardFull(board: Marker) {
		return !board.includes(null)
	}
	const getEmptyPositions = (currentBoard: Marker): number[] => {
		return currentBoard.reduce((empty, cell, index) => {
			if (!cell) empty.push(index as never)
			return empty
		}, [])
	}
	function checkWinner(board: Marker) {
		for (const [a, b, c] of WINNING_COMBINATIONS) {
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a]
			}
		}
		return null
	}
	const evaluateBoard = (currentBoard: Marker, player: Player) => {
		const winner = checkWinner(currentBoard)

		if (winner === player) {
			return 10
		} else if (winner === (player === PLAYER_X ? PLAYER_O : PLAYER_X)) {
			return -10
		}

		return 0
	}
	const alphaBetaPruning = (
		currentBoard: Marker,
		player: Player,
		depth = 3,
		alpha = -Infinity,
		beta = Infinity,
		maximizingPlayer = true,
	): number => {
		if (depth === 0 || checkWinner(currentBoard) || isBoardFull(currentBoard)) {
			return evaluateBoard(currentBoard, player)
		}

		const emptyPositions = getEmptyPositions(currentBoard)

		if (maximizingPlayer) {
			let maxEval = -Infinity
			let bestMove: null | number = null

			for (const position of emptyPositions) {
				const newBoard = currentBoard.slice()
				newBoard[position] = player

				const evalio = alphaBetaPruning(
					newBoard,
					player,
					depth - 1,
					alpha,
					beta,
					false,
				)

				if (evalio > maxEval) {
					maxEval = evalio
					bestMove = position
				}

				alpha = Math.max(alpha, evalio)
				if (beta <= alpha) {
					break
				}
			}

			if (depth === 3) {
				return bestMove as number
			}

			return maxEval
		} else {
			let minEval = Infinity

			for (const position of emptyPositions) {
				const newBoard = currentBoard.slice()
				newBoard[position] = player === PLAYER_X ? PLAYER_O : PLAYER_X

				const evalio = alphaBetaPruning(
					newBoard,
					player,
					depth - 1,
					alpha,
					beta,
					true,
				)

				minEval = Math.min(minEval, evalio)
				beta = Math.min(beta, evalio)
				if (beta <= alpha) {
					break
				}
			}

			return minEval
		}
	}
	return alphaBetaPruning(markers, player)
}
