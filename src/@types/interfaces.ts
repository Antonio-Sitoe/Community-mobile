import { ImgProps } from '@/components/ui/CardModular'
import { Route } from 'expo-router'

export interface IsectionsHome {
	href: Route<string>
	cardTitles: string[]
	img: ImgProps
}

export type ArraySectios = IsectionsHome[]
