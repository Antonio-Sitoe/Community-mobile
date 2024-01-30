import { database } from '@/database/database'
import { PdfModel } from '@/database/model/pdfs'

import RNFetchBlob from 'rn-fetch-blob'

const generatePDFdata = async () => {
	const pdfs = [
		'https://www.portaldogoverno.gov.mz/por/content/download/8036/60580/version/1/file/208+J.Mo%C3%A7ambique.pdf',
		'https://www.portaldogoverno.gov.mz/por/content/download/7985/60133/version/1/file/207+J.Mo%C3%A7ambique.pdf',
		'https://www.portaldogoverno.gov.mz/por/content/download/7807/58553/version/1/file/200+JM.pdf',
	]
	const m = pdfs.map((i) => {
		return create_helper(i)
	})
	return await Promise.all(m)
}

const create_helper = async (url) => {
	try {
		const data = await RNFetchBlob.fetch('GET', url)
		const base = data.base64()
		const dataNew = await CREATE_PDF({
			type: 'jornal',
			file: base,
		})
		console.log('salvoy', dataNew)
	} catch (error) {
		console.log(error) // Exepection error....
	}
}

const CREATE_PDF = (data: any) => {
	return database.write(async () => {
		const pdfColletion = database.collections.get<PdfModel>('pdfs')
		const newPdf = await pdfColletion.create((pdf: any) => {
			pdf.type = data.tyoe
			pdf.file = data.file
		})
		return newPdf
	})
}

export { CREATE_PDF, generatePDFdata }
