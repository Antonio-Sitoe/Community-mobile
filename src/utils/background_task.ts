/* eslint-disable no-async-promise-executor */
import BackgroundService from 'react-native-background-actions'
import { getDataFromLocalStorage } from './saveLocation'
import { getWhetherIfIsConneted } from './meteorology'

const sleep = (time: number) =>
	new Promise<void>((resolve) => setTimeout(() => resolve(), time))

interface Icoods {
	longitude: number
	latitude: number
}
async function update_weather() {
	const coords: Icoods | null = await getDataFromLocalStorage('@@-Location')
	if (coords) {
		await getWhetherIfIsConneted({
			latitude: coords.latitude,
			longitude: coords.longitude,
		})
	}
}

const veryIntensiveTask = async (taskDataArguments: any) => {
	// Example of an infinite loop task
	const { delay } = taskDataArguments
	await new Promise<void>(async () => {
		for (let i = 0; BackgroundService.isRunning(); i++) {
			await sleep(delay)
			await update_weather()
		}
	})
}

const options = {
	taskName: 'Example',
	taskTitle: 'ExampleTask title',
	taskDesc: 'ExampleTask description',
	taskIcon: {
		name: 'ic_launcher',
		type: 'mipmap',
	},
	color: '#ff00ff',
	linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
	parameters: {
		// delay: 60_000, // 1 minutos
		// / delay: 1800000, // 30 minutos
		// delay: 3600000, // 1 horas
		// delay: 7200000, // 2 horas
		delay: 14400000, // 4horas
	},
}

export async function WEATHER_TASK_TO_RUN() {
	await BackgroundService.start(veryIntensiveTask, options)
}
export async function WEATHER_TASK_TO_STOP() {
	await BackgroundService.stop()
}
