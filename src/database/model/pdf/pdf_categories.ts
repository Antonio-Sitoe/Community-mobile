import { Model } from '@nozbe/watermelondb'
import { Associations } from '@nozbe/watermelondb/Model'
import { field, children } from '@nozbe/watermelondb/decorators'

export class PdfCategoriesModel extends Model {
	static table = 'pdf_categories'

	static associations: Associations = {
		pdfs: { type: 'has_many', foreignKey: 'category_id' },
	}

	@children('pdfs') pdfs: any
	@field('name') name!: string
	@field('icon') icon!: string
	@field('type') type!: string
}
