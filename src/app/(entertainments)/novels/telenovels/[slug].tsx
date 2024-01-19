import MediaPlayer, { PlaylistItem } from '@/components/MediaPlayer'

export default function NewsPappersEdition() {
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
	]
	return <MediaPlayer PLAYLIST={PLAYLIST} />
}
