import { appSchema } from '@nozbe/watermelondb'
import { UserSchema } from './User'

export const schemas = appSchema({
	version: 1,
	tables: [UserSchema],
})
