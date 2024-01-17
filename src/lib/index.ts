const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY
export const openWeatherUrl = (lat: number, long: number) => {
	return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=pt_br&units=metric&appid=${WEATHER_API_KEY}`
}
