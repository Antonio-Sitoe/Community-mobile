import { CategoriesPdfProps } from '@/@types/interfaces'
import { database } from '@/database/database'
import { PdfCategoriesModel } from '@/database/model/pdf/pdf_categories'
import { PdfModel } from '@/database/model/pdf/pdfs'

const CREATE_PDF = (data: any) => {
	return database.write(async () => {
		const colletion =
			database.collections.get<PdfCategoriesModel>('pdf_categories')
		const category_id = await colletion.find(data.category_id)

		const pdfColletion = database.collections.get<PdfModel>('pdfs')
		const newPdf = await pdfColletion.create((pdf: any) => {
			pdf.icon = data.icon
			pdf.type = data.type
			pdf.file = data.file
			pdf.edition = data.edition
			pdf.pdf_categories.set(category_id)
		})
		return newPdf
	})
}

const CREATE_PDF_CATEGORIES = (data: CategoriesPdfProps) => {
	return database.write(async () => {
		const categories_collection =
			database.collections.get<PdfCategoriesModel>('pdf_categories')
		const news_categories = await categories_collection.create(
			(category: PdfCategoriesModel) => {
				category.name = data.name
				category.icon = data.icon
				category.type = data.type
			},
		)
		return news_categories
	})
}

export { CREATE_PDF, CREATE_PDF_CATEGORIES }
