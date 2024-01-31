export function capitalizeString(inputString: string) {
	if (inputString)
		return inputString.charAt(0).toUpperCase() + inputString.slice(1)
	else return ''
}

export function sliceStringsChars(str: string) {
	if (str.length <= 35) {
		return str
	} else {
		return str.substring(0, 32) + '...'
	}
}

export function split_and_concat_string(str: string) {
	if (str.length <= 20) {
		return [str]
	} else {
		// Encontrar o índice do último espaço em branco antes do caractere 20
		const lastIndex = str.lastIndexOf(' ', 20)

		// Cortar a string na metade usando o índice encontrado
		const primeiraParte = str.substring(0, lastIndex)
		const segundaParte = str.substring(lastIndex + 1)

		// Retornar as duas partes separadas por um espaço
		return [primeiraParte, segundaParte]
	}
}
