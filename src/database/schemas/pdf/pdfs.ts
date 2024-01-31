import { tableSchema } from '@nozbe/watermelondb'

export const PdfSchema = tableSchema({
	name: 'pdfs',
	columns: [
		{ name: 'type', type: 'string' },
		{ name: 'icon', type: 'string' },
		{ name: 'edition', type: 'string' },
		{ name: 'file', type: 'string' },
		{ name: 'category_id', type: 'string', isIndexed: true },
	],
})
