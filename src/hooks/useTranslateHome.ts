import {
	noticias,
	svg1203,
	svg1205,
	svg1204,
	svg1208,
	svg1209,
	svg1210,
	svg1211,
	svg1213,
	svg1212,
	svg1214,
	svgdeáscara,
	svg1215,
	svg1216,
} from '@/assets/Icons/out'
import { ArraySectios } from '@/@types/interfaces'
import Colors from '@/constants/Colors'
import { useTranslation } from 'react-i18next'

export const useTranslateHome = () => {
	const { t } = useTranslation()
	const sectionsInfo: ArraySectios = [
		{
			href: '/(informations)/news/',
			cardTitles: [t('screens.home.info.newsTitle')],
			img: {
				imgType: 'svg',
				x: -3,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: noticias,
			},
		},
		{
			href: '/(informations)/newspapers/',
			cardTitles: ['Jornais'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1203,
			},
		},
		{
			href: '/(informations)/magazines/',
			cardTitles: ['Revistas'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1205,
			},
		},
		{
			href: '/(informations)/education/',
			cardTitles: ['Educação'],
			img: {
				imgType: 'svg',
				x: -22,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1204,
			},
		},
	]
	const sectionsEntrete: ArraySectios = [
		{
			href: '/(entertainments)/games/',
			cardTitles: ['Jogos'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1208,
			},
		},
		{
			href: '/(entertainments)/novels/',
			cardTitles: ['Novelas'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1209,
			},
		},
		{
			href: '/(entertainments)/videos/',
			cardTitles: ['Videos'],
			img: {
				imgType: 'svg',
				x: -14,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1211,
			},
		},
		{
			href: '/(entertainments)/comics/',
			cardTitles: ['Banda', 'Desenhada'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 68,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1210,
			},
		},
	]
	const sectionsOthers: ArraySectios = [
		{
			color: Colors.light.mutedGreen,
			href: '/(others)/agricultural-prices/',
			cardTitles: ['Preços', 'Agricolas'],
			img: {
				imgType: 'svg',
				x: -10,
				y: 60,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1213,
			},
		},
		{
			color: Colors.light.sunflowerYellow,
			href: '/(others)/solar-panel/',
			cardTitles: ['Painel', 'Solar'],
			img: {
				imgType: 'svg',
				x: -13,
				y: 60,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1212,
			},
		},
		{
			color: Colors.light.alternativeBlue,
			href: '/(others)/financial-solutions/',
			cardTitles: ['Soluções', 'Financeiras'],
			img: {
				imgType: 'svg',
				x: -14,
				y: 72,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1214,
			},
		},
		{
			color: Colors.light.dustyRose,
			href: '/(others)/licenses/',
			cardTitles: ['Licenças'],
			img: {
				imgType: 'svg',
				x: 0,
				y: 0,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svgdeáscara,
			},
		},
		{
			color: Colors.light.periwinkleGray,
			href: '/(others)/health/',
			cardTitles: ['Saúde'],
			img: {
				imgType: 'svg',
				x: -15,
				y: 50,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1215,
			},
		},
		{
			color: Colors.light.coralPink,
			href: '/(others)/family/',
			cardTitles: ['Família'],
			img: {
				imgType: 'svg',
				x: -15,
				y: 55,
				fit: 'contain',
				height: 200,
				width: 400,
				image_url_import: svg1216,
			},
		},
	]
	return { sectionsOthers, sectionsEntrete, sectionsInfo }
}
