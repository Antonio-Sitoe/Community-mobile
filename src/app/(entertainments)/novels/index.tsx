import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { Link, Route } from 'expo-router'
import { CardModular } from '@/components/ui/CardModular'
import { fonts } from '@/constants/fonts'
import Colors from '@/constants/Colors'
import Ouro_negro from '@/assets/Thumbnails/assets_461.png'
import Janete from '@/assets/Thumbnails/assets_469.png'

import Aquele_papo from '@/assets/Thumbnails/assets_464.png'
import Maida from '@/assets/Thumbnails/assets_467.png'

import { ArraySectios } from '@/@types/interfaces'
const Novelas = () => {
	const sectionsInfoRadio: ArraySectios = [
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Ouro Negro'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Ouro_negro,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Janete'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Janete,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Ouro Negro'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Ouro_negro,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Janete'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Janete,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Ouro Negro'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Ouro_negro,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Janete'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Janete,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Ouro Negro'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Ouro_negro,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Janete'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Janete,
			},
		},
		{
			href: `/(entertainments)/novels/radionovels/` as Route<string>,
			cardTitles: ['Ouro Negro'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Ouro_negro,
			},
		},
	]

	const sectionsInfoVideo: ArraySectios = [
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Aquele Papo'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Aquele_papo,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Maida'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Maida,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Aquele Papo'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Aquele_papo,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Maida'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Maida,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Aquele Papo'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Aquele_papo,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Maida'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Maida,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Aquele Papo'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Aquele_papo,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Maida'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Maida,
			},
		},
		{
			href: `/(entertainments)/novels/telenovels/` as Route<string>,
			cardTitles: ['Aquele Papo'],
			img: {
				imgType: 'img',
				x: -160,
				y: 50,
				fit: 'contain',
				height: 130,
				width: 400,
				image_url_import: Aquele_papo,
			},
		},
	]

	const width = 220
	const height = 128.5

	return (
		<>
			<HeaderModular isDefault={false} title="Novelas" />
			{/* Audio Novels */}
			<View
				style={{
					paddingHorizontal: 45,
					marginTop: 36,
					marginBottom: 43,
				}}
			>
				<Text style={styles.textTitle}>Radionovelas</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop: 17,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 20,
						}}
					>
						{sectionsInfoRadio.map((item, index) => {
							return (
								<View key={index}>
									<CardModular
										color={Colors.light.lavenderBlush}
										font_size={fonts.size.md}
										height={height}
										width={width}
										href={item.href}
										cardTitles={item.cardTitles}
										img={item.img}
									/>
								</View>
							)
						})}
					</View>
				</ScrollView>
			</View>
			{/* Video Novels */}
			<View
				style={{
					paddingHorizontal: 45,
					marginBottom: 43,
				}}
			>
				<Text style={styles.textTitle}>Telenovelas</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						marginTop: 17,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 20,
						}}
					>
						{sectionsInfoVideo.map((item, index) => {
							return (
								<View key={index}>
									<CardModular
										color={Colors.light.lavenderBlush}
										font_size={fonts.size.md}
										height={height}
										width={width}
										href={item.href}
										cardTitles={item.cardTitles}
										img={item.img}
									/>
								</View>
							)
						})}
					</View>
				</ScrollView>
			</View>
		</>
	)
}

export default Novelas

const styles = StyleSheet.create({
	textTitle: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
		fontSize: fonts.size.xlsm,
		color: Colors.light.sunsetOrange,
		// marginBottom: 8,
		// paddingLeft: 10,
	},
})
