import { database } from '@/database/database'
import { WeatherModel } from '@/database/model/weather'

const READ_WEATHER = async () => {
	const weatherCollection =
		database.collections.get<WeatherModel>('wheather_info')
	const userExist = await weatherCollection.query().fetch()

	userExist.forEach((u) => {
		console.log('fsfd', u._raw)
	})

	console.log('Tamanho', userExist.length)

	return userExist
}
export { READ_WEATHER }
