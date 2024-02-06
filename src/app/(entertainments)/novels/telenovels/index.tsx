import { ScrollView, View } from 'react-native'
import React from 'react'
import { Route, useLocalSearchParams } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'

import { videos } from '@/utils/faker/genarate_videos'

const VideoNovelasList = () => {
	const { id, name } = useLocalSearchParams()
	const teleNovelasList: MediaCardModularProps[] = videos.data
		.filter((item) => item?.category_id === Number(id))
		.map((item, index, playList) => {
			return {
				duration: item.duration,
				href: {
					pathname:
						`/(entertainments)/novels/telenovels/${index}` as Route<string>,
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
					{teleNovelasList.map(({ duration, href, imageUri, title }, i) => {
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

export default VideoNovelasList
