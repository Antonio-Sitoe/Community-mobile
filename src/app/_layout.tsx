import '@/lib/location'
import * as Location from 'expo-location'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { fontsConfig } from '@/constants/fonts'
import { StatusBar } from 'react-native'
import { saveDataToLocalstorage } from '@/utils/saveLocation'
import { getWhetherIfIsConneted } from '@/utils/meteorology'
import { WEATHER_TASK_TO_RUN } from '@/utils/background_task'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// background task for weather
WEATHER_TASK_TO_RUN()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		...fontsConfig,
		...FontAwesome.font,
	})

	useEffect(() => {
		async function getLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				console.log('Permission to access location was denied')
				return
			}
			const { coords } = await Location.getCurrentPositionAsync({})
			saveDataToLocalstorage(
				{
					latitude: coords.latitude,
					longitude: coords.longitude,
				},
				'@@-Location',
			)
			await getWhetherIfIsConneted({
				latitude: coords.latitude,
				longitude: coords.longitude,
			})
		}
		getLocation()
	}, [])

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	return (
		<>
			<StatusBar hidden />
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</>
	)
}
