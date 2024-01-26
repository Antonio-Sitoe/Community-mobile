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
import Furacao from '@/assets/weathers/Furacão.svg'
import CeuNublado from '@/assets/weathers/ceuNublado.svg'
import DiaCeuSemi from '@/assets/weathers/Dia-CéuSemi-Nublado,Chuva.svg'
import ChuvaIntensa from '@/assets/weathers/ChuvaIntensa.svg'
import ChuvaModerada from '@/assets/weathers/ChuvaModerada.svg'
import ChuvaComTrovoada from '@/assets/weathers/ChuvacomTrovoada.svg'

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
	const weatherObj = {
		200: ChuvaComTrovoada,
		201: ChuvaComTrovoada,
		202: ChuvaComTrovoada,
		210: ChuvaComTrovoada,
		211: ChuvaComTrovoada,
		212: ChuvaComTrovoada,
		221: ChuvaComTrovoada,
		230: ChuvaComTrovoada,
		231: ChuvaComTrovoada,
		232: ChuvaComTrovoada,
		300: Chuviscos,
		301: Chuviscos,
		302: Chuviscos,
		310: Chuviscos,
		311: Chuviscos,
		312: Chuviscos,
		313: Chuviscos,
		314: Chuviscos,
		321: Chuviscos,
		500: DiaCeuSemi,
		501: ChuvaModerada,
		502: ChuvaIntensa,
		503: ChuvaIntensa,
		504: ChuvaIntensa,
		511: ChuvaIntensa,
		520: ChuvaIntensa,
		521: ChuvaIntensa,
		522: ChuvaIntensa,
		531: ChuvaIntensa,
		600: Neve,
		601: Neve,
		602: Neve,
		611: Granizo,
		612: Granizo,
		613: Granizo,
		615: Neve,
		616: Neve,
		620: Neve,
		621: Neve,
		622: Neve,
		701: Neblina,
		711: Neblina,
		721: Neblina,
		731: VentoForte,
		741: VentoForte,
		751: VentoForte,
		761: VentoForte,
		762: Furacao,
		771: Furacao,
		781: Furacao,
		800: Sol,
		801: Sol,
		802: CeuNublado,
		803: CeuNublado,
		804: CeuNublado,
	}
	return weatherObj[id] ?? CeuNublado
}

export const days_of_week = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
]
