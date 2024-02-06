import { appSchema } from '@nozbe/watermelondb'
import { UserSchema } from './User'
import { WeatherSchema } from './weather'
import { PdfCategoriesSchema } from './pdf/pdf_categories'
import { PdfSchema } from './pdf/pdfs'

export const schemas = appSchema({
	version: 1,
	tables: [UserSchema, WeatherSchema, PdfSchema, PdfCategoriesSchema],
})
