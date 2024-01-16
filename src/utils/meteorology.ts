import NetInfo from '@react-native-community/netinfo'
import { SAVE_WEATHER_DATA } from '@/database/actions/weather/create'
import { openWeatherUrl } from '@/lib'
import { DROP_WEATHER_TABLE } from '@/database/actions/weather/delete'

import Sol from '@/assets/weathers/sol.svg'
import Neve from '@/assets/weathers/Neve.svg'
import Granizo from '@/assets/weathers/Granizo.svg'
import Neblina from '@/assets/weathers/Neblina.svg'
import Chuviscos from '@/assets/weathers/Chuviscos.svg'
import VentoForte from '@/assets/weathers/VentoForte.svg'
import CeuNublado from '@/assets/weathers/ceuNublado.svg'
import DiaCeuSemi from '@/assets/weathers/Dia-CéuSemi-Nublado,Chuva.svg'
import ChuvaIntensa from '@/assets/weathers/ChuvaIntensa.svg'
import ChuvaModerada from '@/assets/weathers/ChuvaModerada.svg'
import NoiteCeuLimpo from '@/assets/weathers/Noite-CéuLimpocomEstrelas.svg'
import ChuvaComTrovoada from '@/assets/weathers/ChuvacomTrovoada.svg'
import NubladoComTrovoada from '@/assets/weathers/NubladocomTrovoada.svg'
import NoiteSemiNublado from '@/assets/weathers/Noite-Semi-Nublado.svg'
import NubladoComVento from '@/assets/weathers/NubladocomVento.svg'

export async function getWhetherIfIsConneted({ latitude, longitude }) {
	const state = await NetInfo.fetch()
	const isConnected = state.isConnected

	if (isConnected) {
		try {
			const url = openWeatherUrl(latitude, longitude)
			console.log(url)
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

export function ChooseWeatherIcon(id: number) {
	if (id === 500) return DiaCeuSemi
	if (id === 531) return NubladoComTrovoada
	if (id === 721) return Neblina
	if (id === 501) return ChuvaModerada
	if (id === 803 || id === 804) return NoiteSemiNublado
	if (id >= 300 || id <= 321) return Chuviscos
	if (id >= 502 && id <= 504) return ChuvaIntensa
	if (id >= 511 && id <= 531) return ChuvaComTrovoada
	if (id === 611 || id === 613) return Granizo
	if (id >= 600 && id <= 622) return Neve
	if (id === 800) return Sol || NoiteCeuLimpo
	if (id >= 701 && id <= 741) return VentoForte
	if (id >= 742 && id <= 781) return NubladoComVento
	if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) return CeuNublado
	return CeuNublado
}
