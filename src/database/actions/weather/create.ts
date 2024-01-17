import { WeatherProps } from '@/@types/interfaces'
import { database } from '@/database/database'
import { WeatherModel } from '@/database/model/weather'

const SAVE_WEATHER_DATA = (body: any) => {
	return database.write(async () => {
		const weatherCollection =
			database.collections.get<WeatherModel>('wheather_info')
		const data: WeatherProps[] = body.daily.map((item) => {
			const timestamp = item.dt
			const date = new Date(timestamp * 1000)
			const formattedDate = date.toLocaleDateString() // Retorna a data no formato "MM/DD/AAAA"

			return {
				date: formattedDate,
				min: item.temp.min,
				max: item.temp.max,
				icon_id: item.weather[0]?.id,
				description: item.weather[0]?.description,
				createdAt: new Date(),
			}
		})

		const dataSaved: WeatherProps[] = []

		for await (const iterator of data) {
			const NewWeather = await weatherCollection.create(
				(weather: WeatherModel) => {
					weather.date = `${iterator.date}`
					weather.min = iterator.min
					weather.max = iterator.max
					weather.icon_id = iterator.icon_id
					weather.description = iterator.description
					weather.createdAt = `${iterator.createdAt}`
				},
			)
			dataSaved.push(NewWeather)
		}

		return dataSaved
	})
}

export { SAVE_WEATHER_DATA }
