import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class PdfModel extends Model {
	static table = 'pdfs'
	@field('type') type!: string
	// @field('img') img!: string
	// @field('edition') edition!: string
	@field('file') file!: string
	// @field('createdAt') createdAt!: Date | string
}
