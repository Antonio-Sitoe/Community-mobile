import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class WeatherModel extends Model {
	static table = 'wheather_info'
	@field('date') date!: string
	@field('min') min!: number
	@field('max') max!: number
	@field('icon_id') icon_id!: number
	@field('description') description!: string
	@field('createdAt') createdAt!: Date | string
}
