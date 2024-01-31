import { ScrollView, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { HeaderModular } from '@/components/ui/HeaderModular'
import {
	MediaCardModular,
	MediaCardModularProps,
} from '@/components/ui/MediaCardModular'

import { videos } from '@/utils/faker/genarate_videos'

const VideoList = () => {
	const { slug } = useLocalSearchParams()
	const teleNovelasList: MediaCardModularProps[] = videos.data
		.filter((item) => item.category_name === slug)
		.map((item, i, obj) => {
			return {
				...item,
				href: {
					pathname: `/(entertainments)/videos/${slug}/${i}`,
					params: {
						playList: JSON.stringify(obj),
					},
				},
				imageUri: item.imageUri,
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
