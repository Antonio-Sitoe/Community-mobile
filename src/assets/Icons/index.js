const fs = require('fs')
const path = require('path')

const diretorioRelativo =
	'/home/antoniositoe/Documentos/BitBucket/tablet-solar/src/assets/Icons' // Substitua pelo caminho do seu diretório

const gerarArquivoJS = async () => {
	try {
		const arquivosSVG = await listarArquivosSVG(diretorioRelativo)
		const conteudoJS = criarVariaveisJS(arquivosSVG)
		const caminhoArquivoSaida = path.join(diretorioRelativo, 'out.js')

		fs.writeFileSync(caminhoArquivoSaida, conteudoJS)
		console.log('Arquivo out.js gerado com sucesso.')
	} catch (erro) {
		console.error('Erro ao gerar o arquivo out.js:', erro)
	}
}

const listarArquivosSVG = async (diretorio) => {
	return new Promise((resolve, reject) => {
		fs.readdir(diretorio, (err, arquivos) => {
			if (err) {
				reject(err)
				return
			}

			const arquivosSVG = arquivos.filter((arquivo) => arquivo.endsWith('.svg'))
			resolve(arquivosSVG)
		})
	})
}

const criarVariaveisJS = (arquivosSVG) => {
	const variaveis = arquivosSVG.map((arquivo) => {
		const nomeVariavel = arquivo.replace('.svg', '')
		const caminhoArquivo = path.join(diretorioRelativo, arquivo)
		const conteudoSVG = fs.readFileSync(caminhoArquivo, 'utf-8')
		return `const ${nomeVariavel} = \`${conteudoSVG}\`;\n`
	})

	return variaveis.join('\n')
}

gerarArquivoJS()
