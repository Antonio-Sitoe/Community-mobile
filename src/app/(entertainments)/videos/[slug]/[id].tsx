import MediaPlayer, { PlaylistItem } from '@/components/MediaPlayer'
import { useLocalSearchParams } from 'expo-router'

export default function NewsPappersEdition() {
	const { id } = useLocalSearchParams()
	console.log(id)
	const PLAYLIST = [
		new PlaylistItem(
			'Big Buck Bunny',
			require('@/assets/Audio/big_buck_bunny.mp4'),
			true,
		),
		new PlaylistItem(
			"Popeye - I don't scare",
			'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
			true,
		),

		new PlaylistItem(
			"Demo - I don't scare",
			'https://cdn.coverr.co/videos/coverr-stream-next-to-the-road-4482/1080p.mp4',
			true,
		),
	]
	return <MediaPlayer PLAYLIST={PLAYLIST} index={id} />
}
