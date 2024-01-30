import { database } from '@/database/database'
import { PdfModel } from '@/database/model/pdfs'

const READ_PDF = async () => {
	const collection = database.collections.get<PdfModel>('pdfs')
	const pdf = await collection.query().fetch()
	return pdf
}
export { READ_PDF }
