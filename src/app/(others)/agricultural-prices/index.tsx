import { View, Text, ScrollView } from 'react-native'
import { HeaderModular } from '@/components/ui/HeaderModular'
import React from 'react'
import {
	AgroCardModular,
	AgroCardModularProps,
} from '@/components/ui/AgroCardModular'
import { Route } from 'expo-router'

export default function Agricultural() {
	const AgroPriceList: AgroCardModularProps[] = [
		{
			price: '34.39 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/2uyj2x64.png'),
			title: 'Grão de Milho Branco',
		},
		{
			price: '120.00 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/9v1t92ym.png'),
			title: 'Óleo Nacional',
		},
		{
			price: '51.67 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/md2de8bk.png'),
			title: 'Arroz Corrente',
		},
		{
			price: '75.00 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/flibdfhd.png'),
			title: 'Açucar Castanho',
		},
		{
			price: '50.00 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/r2egontq.png'),
			title: 'Farinha de Milho Branco',
		},
		{
			price: '35.50 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/xnfxrniu.png'),
			title: 'Batata Reno Importada',
		},
		{
			price: '50.30 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/u2iapyuj.png'),
			title: 'Feijão Nhemba',
		},
		{
			price: '35.50 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/lhel4ett.png'),
			title: 'Batata Reno Nacional',
		},
		{
			price: '75.00 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/p9sqmx7n.png'),
			title: 'Amendoim Pequeno Nacional',
		},
		{
			price: '65.00 MZN',
			href: '' as Route<string>,
			imageUri: require('@/assets/Thumbnails/czjupp8r.png'),
			title: 'Batata Doce',
		},
	]

	return (
		<>
			<HeaderModular isDefault={false} title="Preços Agrícolas" />
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 50,
					paddingVertical: 42,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 20,
					}}
				>
					{AgroPriceList.map(({ price, href, imageUri, title }, i) => {
						return (
							<AgroCardModular
								key={i}
								href={href}
								price={price}
								imageUri={imageUri}
								title={title}
							/>
						)
					})}
				</View>
			</ScrollView>
		</>
	)
}
