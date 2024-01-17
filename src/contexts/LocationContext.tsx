/* eslint-disable react-hooks/exhaustive-deps */
import { IResultProps, READ_WEATHER } from '@/database/actions/weather/read'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect } from 'react'
import * as Location from 'expo-location'
import { saveDataToLocalstorage } from '@/utils/saveLocation'
import { getWhetherIfIsConneted } from '@/utils/meteorology'

interface Idata {
	data: IResultProps
	isLoading: boolean
}
export const LocationContext = createContext({} as Idata)

async function getWeatherInfo() {
	const weather = await READ_WEATHER()
	return weather as IResultProps | any
}

export function LocationStorage({ children }: { children: React.ReactNode }) {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['weather'],
		queryFn: getWeatherInfo,
		refetchInterval: 7_200_000, // 2 horas
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
			refetch()
		}
		getLocation()
	}, [])

	const value = { data, isLoading }

	return (
		<LocationContext.Provider value={value}>
			{children}
		</LocationContext.Provider>
	)
}

export const useWeather = () => {
	const { data, isLoading } = useContext<Idata>(LocationContext)
	return { data, isLoading }
}
