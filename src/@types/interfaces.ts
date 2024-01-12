import { ImgProps } from '@/components/ui/CardModular'
import { Route } from 'expo-router'

export interface IsectionsHome {
	href: Route<string>
	cardTitles: string[]
	img: ImgProps
	color?: string
}

export type ArraySectios = IsectionsHome[]

export interface WeatherProps {
	date: string | Date
	createdAt: string | Date
	min: number
	max: number
	icon_id: number
	description: string
}
