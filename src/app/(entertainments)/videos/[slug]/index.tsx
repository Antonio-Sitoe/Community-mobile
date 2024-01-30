import { ScrollView, View } from 'react-native'
import React from 'react'
import { Route, useLocalSearchParams } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'

import videos from '@/utils/faker/genarate_videos.json'

const VideoList = () => {
	const { slug } = useLocalSearchParams()
	const videos_import = [
		require('@/assets/Audio/big_buck_bunny.mp4'),
		require('@/assets/Audio/pexels-marta.mp4'),
		require('@/assets/Audio/1080p.mp4'),
	]

	const teleNovelasList: MediaCardModularProps[] = videos.data
		.filter((item) => item.category_name === slug)
		.map((item) => {
			return {
				...item,
				href: `/(entertainments)/videos/${slug}/0` as Route<string>,
				imageUri: videos_import[Math.floor(Math.random() * 3)],
			}
		})

	return (
		<>
			<HeaderModular isDefault={false} title={`${slug}`} />
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

export default VideoList
