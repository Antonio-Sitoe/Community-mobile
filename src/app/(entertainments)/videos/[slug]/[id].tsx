import MediaPlayer, { PlaylistItem } from '@/components/MediaPlayer'
import { sliceStringsChars } from '@/utils'
import { useLocalSearchParams } from 'expo-router'

interface Video {
	title: string
	duration: string
	imageUri: number
	video_source: number
	category_name: string
}

export default function NewsPappersEdition() {
	const { playList, id } = useLocalSearchParams()

	const PLAYLIST = JSON.parse(playList as string)?.map((item: Video) => {
		return new PlaylistItem(
			sliceStringsChars(item.title),
			item.video_source,
			true,
		)
	})
	return <MediaPlayer PLAYLIST={PLAYLIST} index={id} />
}
