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

export const DROP_WEATHER_TABLE = async () => {
	return await database.write(async () => {
		const weatherColletion =
			database.collections.get<WeatherModel>('wheather_info')
		await weatherColletion.query().destroyAllPermanently()
		const tableClened = await weatherColletion.query().fetchCount()
		console.log('Tamanho de dados apos remocao', tableClened)
		return !tableClened
	})
}

export { DELETE_WEATHER }
