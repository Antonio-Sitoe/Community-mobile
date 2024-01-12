import { database } from '@/database/database'
import { User } from '@/database/model/user'
import { WeatherModel } from '@/database/model/weather'
import { Q } from '@nozbe/watermelondb'
import { DELETE_USER_BY_ID } from '../user/delete'

const DELETE_WEATHER = (id: string) => {
	return database.write(async () => {
		const userColletion =
			database.collections.get<WeatherModel>('wheather_info')
		const users = await userColletion.query().fetch()

		users.forEach((u) => {
			u.destroyPermanently()
		})
		console.log('fsfd', users.length)

		return {
			sucess: true,
		}
	})
}

export { DELETE_WEATHER }
