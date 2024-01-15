import NetInfo from '@react-native-community/netinfo'
import { SAVE_WEATHER_DATA } from '@/database/actions/weather/create'
import { openWeatherUrl } from '@/lib'
import { DROP_WEATHER_TABLE } from '@/database/actions/weather/delete'

export async function getWhetherIfIsConneted({ latitude, longitude }) {
	const state = await NetInfo.fetch()
	const isConnected = state.isConnected

	if (isConnected) {
		try {
			const url = openWeatherUrl(latitude, longitude)
			const responseWheatherData = await fetch(url)
			const whetherData = await responseWheatherData.json()
			if (whetherData?.daily && whetherData?.daily.length !== 0) {
				const isDatabaseWasCleaned = await DROP_WEATHER_TABLE()
				if (isDatabaseWasCleaned) {
					const novo = await SAVE_WEATHER_DATA(whetherData)
					console.log('Numero de dados criados', novo.length)
				}
			}
		} catch (error) {
			console.log('error', error)
		}
	}
}
