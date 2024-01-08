import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { SectionsFour } from '@/components/screens/home/SectionsFour'
import { Meteorology } from '@/components/screens/home/Meteorology'

import Colors from '@/constants/Colors'
import React from 'react'
import { Others } from '@/components/screens/home/Others'
import {
	noticias,
	svg1203,
	svg1205,
	svg1204,
	svg1208,
	svg1209,
	svg1210,
	svg1211,
} from '@/assets/Icons/out'
import { ArraySectios } from '@/@types/interfaces'

export default function Home() {
	const sectionsInfo: ArraySectios = [
		{
			href: '/(informations)/news/',
			cardTitles: ['Notícias'],
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
			cardTitles: ['Banda', 'Dezenhada'],
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
	return (
		<>
			<HeaderModular isDefault />
			<View style={styles.container}>
				<View style={styles.containerChild}>
					<SectionsFour
						title="Informação"
						colorTitle={Colors.light.sunsetOrange}
						hasBackground={false}
						sections={sectionsInfo}
					/>

					<Meteorology />
				</View>
				<View style={styles.containerChild}>
					<SectionsFour
						title="Entretenimento"
						colorTitle={Colors.light.lavenderBlush}
						hasBackground={true}
						sections={sectionsEntrete}
					/>
					<Others />
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 40.5,
	},
	containerChild: {
		width: '100%',
		flexDirection: 'row',
		gap: 23,
		marginBottom: 20,
	},
})
