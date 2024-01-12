import '@/lib/location'
import * as Location from 'expo-location'
import NetInfo from '@react-native-community/netinfo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { fontsConfig } from '@/constants/fonts'
import { StatusBar } from 'react-native'
import { ICoords, useGlobalStore } from '@/contexts'
import { saveDataToLocalstorage } from '@/utils/saveLocation'
import { openWeatherUrl } from '@/lib'
import { SAVE_WEATHER_DATA } from '@/database/actions/weather/create'

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

export default function RootLayout() {
	const { location, setLocation, setErrorMsg } = useGlobalStore()

	const [loaded, error] = useFonts({
		...fontsConfig,
		...FontAwesome.font,
	})
	console.log('localizacao', location)

	useEffect(() => {
		async function getLocation() {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
			const { coords } = await Location.getCurrentPositionAsync({})
			setLocation({
				latitude: coords.latitude,
				longitude: coords.longitude,
			})
			saveDataToLocalstorage(
				{
					latitude: coords.latitude,
					longitude: coords.longitude,
				},
				'@@-Location',
			)
		}

		getLocation()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		async function getWhetherIfIsConneted(location: ICoords) {
			const state = await NetInfo.fetch()
			const isConnected = state.isConnected
			if (isConnected) {
				const url = openWeatherUrl(location.latitude, location.longitude)
				const responseWheatherData = await fetch(url)
				const whetherData = await responseWheatherData.json()
				try {
					// const novo = await SAVE_WEATHER_DATA(whetherData)
					// console.log('novo', novo)
				} catch (error) {
					console.log('error', error)
				}
			}
		}
		if (location) {
			getWhetherIfIsConneted(location)
		}
	}, [location])

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
