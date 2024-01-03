import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import migrations from './migrations'

import { Database } from '@nozbe/watermelondb'
import { schemas } from './schemas'
import { model } from './model'

const adapter = new SQLiteAdapter({
	dbName: 'solarDb',
	schema: schemas,
	migrations,
})

export const database = new Database({
	adapter,
	modelClasses: model,
})
