import { tableSchema } from '@nozbe/watermelondb'

export const WeatherSchema = tableSchema({
	name: 'wheather_info',
	columns: [
		{ name: 'date', type: 'string' },
		{ name: 'min', type: 'number' },
		{ name: 'max', type: 'number' },
		{ name: 'icon_id', type: 'number' },
		{ name: 'description', type: 'string' },
		{ name: 'createdAt', type: 'string' },
	],
})
