import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { field, relation } from '@nozbe/watermelondb/decorators'

export class PdfModel extends Model {
	static table = 'pdfs'
	static associations: Associations = {
		pdf_categories: { type: 'belongs_to', key: 'category_id' },
	}

	@relation('pdf_categories', 'category_id') pdf_categories
	@field('type') type!: string
	@field('icon') icon!: string
	@field('edition') edition!: string
	@field('file') file!: string
}
