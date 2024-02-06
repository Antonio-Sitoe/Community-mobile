import '@/lib/location'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import Toast from 'react-native-toast-message'

import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { fontsConfig } from '@/constants/fonts'
import { StatusBar } from 'react-native'
import { WEATHER_TASK_TO_RUN } from '@/utils/background_task'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LocationStorage } from '@/contexts/LocationContext'

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

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		...fontsConfig,
		...FontAwesome.font,
	})

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

	return (
		<QueryClientProvider client={queryClient}>
			<RootLayoutNav />
		</QueryClientProvider>
	)
}

function RootLayoutNav() {
	return (
		<LocationStorage>
			<StatusBar hidden />
			<Stack
				screenOptions={{
					headerShown: false,
					animation: 'flip',
				}}
			/>
			<Toast />
		</LocationStorage>
	)
}
