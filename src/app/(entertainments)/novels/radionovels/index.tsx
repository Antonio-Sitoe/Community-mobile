import { StyleSheet, View } from 'react-native'
import React from 'react'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { ScrollView } from 'react-native-gesture-handler'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'
import { Route, useLocalSearchParams } from 'expo-router'
import { videos } from '@/utils/faker/genarate_videos'

const RadioNovelasList = () => {
	const { id, name } = useLocalSearchParams()
	const radioNovelasList: MediaCardModularProps[] = videos.data
		.filter((item) => item?.category_id === Number(id))
		.map((item, index, playList) => {
			return {
				duration: item.duration,
				href: {
					pathname:
						`/(entertainments)/novels/radionovels/${index}` as Route<string>,
					params: {
						playList: JSON.stringify(playList),
					},
				},
				imageUri: item.imageUri,
				title: item.title,
			}
		})
	return (
		<>
			<HeaderModular isDefault={false} title={`${name}`} />
			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{
						paddingHorizontal: 50,
						gap: 30,
						paddingVertical: 61,
						width: '100%',
						maxWidth: 1000,
					}}
				>
					{radioNovelasList.map(({ duration, href, imageUri, title }, i) => {
						return (
							<MediaCardModular
								key={i}
								href={href}
								duration={duration}
								imageUri={imageUri}
								title={title}
							/>
						)
					})}
				</ScrollView>
			</View>
		</>
	)
}

export default RadioNovelasList
