import { database } from '@/database/database'
import { PdfCategoriesModel } from '@/database/model/pdf/pdf_categories'
import { PdfModel } from '@/database/model/pdf/pdfs'
import { Q } from '@nozbe/watermelondb'

const READ_PDF = async () => {
	const collection = database.collections.get<PdfModel>('pdfs')
	const pdf = await collection.query().fetch()
	return pdf
}
const READ_BY_CATEGORY_NAME = async (category: string) => {
	const collection = database.collections.get<PdfModel>('pdfs')
	const pdf = await collection.query(Q.where('type', category)).fetch()
	return pdf
}

const READ_PDF_CATEGORIES = async (type: string) => {
	const collection =
		database.collections.get<PdfCategoriesModel>('pdf_categories')
	const pdf = await collection.query(Q.where('type', type)).fetch()
	return pdf
}
const READ_PDF_CATEGORIES_BY_CATEGORY_NAME = async (name: string) => {
	const collection =
		database.collections.get<PdfCategoriesModel>('pdf_categories')
	const pdf = await collection.query(Q.where('name', name)).fetch()
	return pdf
}
export {
	READ_PDF,
	READ_PDF_CATEGORIES,
	READ_PDF_CATEGORIES_BY_CATEGORY_NAME,
	READ_BY_CATEGORY_NAME,
}
