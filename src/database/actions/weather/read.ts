import { WeatherProps } from '@/@types/interfaces'
import { database } from '@/database/database'
import { WeatherModel } from '@/database/model/weather'
import { days_of_week } from '@/utils/meteorology'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import locale from 'dayjs/locale/pt'
import dayjs from 'dayjs'

dayjs.extend(weekday)
dayjs.extend(customParseFormat)
dayjs.locale(locale)

export interface IResultProps {
	today: WeatherProps
	nextDays: WeatherProps[]
}

const READ_WEATHER = async () => {
	const weatherCollection =
		database.collections.get<WeatherModel>('wheather_info')
	const weather = await weatherCollection.query().fetch()
	const today = dayjs().toDate()
	const currentDate = dayjs(today).format('DD-MM-YYYY')
	const nextDay = dayjs().add(1, 'day').format('DD-MM-YYYY')

	const weather_current = weather
		.filter((weather) => {
			const weather_date = dayjs(weather.date, 'DD-MM-YYYY')
				.add(1, 'day')
				.toDate()
			return weather_date >= today
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
					const theDay = dayjs(current.date, 'DD-MM-YYYY')
						.add(1, 'day')
						.weekday()
					const weekDay =
						current.date === nextDay ? 'Amanhã' : days_of_week[theDay] // transforme date to weekday
					const day = {
						date: weekDay,
						date_time: current.date,
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
