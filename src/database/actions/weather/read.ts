import { WeatherProps } from '@/@types/interfaces'
import { database } from '@/database/database'
import { WeatherModel } from '@/database/model/weather'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(isSameOrAfter)
dayjs.extend(customParseFormat)

export interface IResultProps {
	today: WeatherProps
	nextDays: WeatherProps[]
}

const READ_WEATHER = async () => {
	const weatherCollection =
		database.collections.get<WeatherModel>('wheather_info')
	const weather = await weatherCollection.query().fetch()
	const currentDate = new Date().toLocaleDateString()
	const nextDay = dayjs().add(1, 'day').format('DD/MM/YYYY')

	const weather_current = weather
		.filter((weather) => {
			const dateFormated = dayjs(weather.date, 'DD/MM/YYYY').add(1, 'day')
			const today = dayjs()
			return dateFormated.isSameOrAfter(today)
		})
		.reduce(
			(accumulate, current) => {
				if (current.date === currentDate) {
					accumulate.today = {
						date: current.date,
						createdAt: current.createdAt,
						min: Math.round(current.min),
						max: Math.round(current.max),
						icon_id: current.icon_id,
						description: current.description,
					}
				} else {
					const day = {
						date: current.date === nextDay ? 'Amanhã' : '',
						createdAt: String(current.createdAt),
						min: Math.round(current.min),
						max: Math.round(current.max),
						icon_id: Number(current.icon_id),
						description: String(current.description),
					} as WeatherProps
					accumulate.nextDays.push(day as never)
				}
				return accumulate
			},
			{
				today: {},
				nextDays: [],
			},
		)
	return weather_current
}
export { READ_WEATHER }
