import { tableSchema } from '@nozbe/watermelondb'

export const PdfSchema = tableSchema({
	name: 'pdfs',
	columns: [
		{ name: 'type', type: 'string' },
		// { name: 'img', type: 'string' },
		// { name: 'edition', type: 'number' },
		{ name: 'file', type: 'string' },
		// { name: 'createdAt', type: 'string' },
	],
})
