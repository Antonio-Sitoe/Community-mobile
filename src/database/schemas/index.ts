import { appSchema } from '@nozbe/watermelondb'
import { UserSchema } from './User'
import { WeatherSchema } from './weather'

export const schemas = appSchema({
	version: 1,
	tables: [UserSchema, WeatherSchema],
})
