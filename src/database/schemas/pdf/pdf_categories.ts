import { tableSchema } from '@nozbe/watermelondb'

export const PdfCategoriesSchema = tableSchema({
	name: 'pdf_categories',
	columns: [
		{ name: 'name', type: 'string' },
		{ name: 'icon', type: 'string' },
		{ name: 'type', type: 'string' },
	],
})
