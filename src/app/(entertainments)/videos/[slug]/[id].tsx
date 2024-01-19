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
			require('@/assets/Audio/pexels-marta.mp4'),
			true,
		),

		new PlaylistItem(
			"Demo - I don't scare",
			require('@/assets/Audio/1080p.mp4'),
			true,
		),
	]
	return <MediaPlayer PLAYLIST={PLAYLIST} index={id} />
}
