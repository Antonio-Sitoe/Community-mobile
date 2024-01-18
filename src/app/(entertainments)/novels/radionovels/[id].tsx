import MediaPlayer, { PlaylistItem } from '@/components/MediaPlayer'

const PLAYLIST = [
	new PlaylistItem(
		'Lion',
		require('@/assets/Audio/Lion.mp3'),
		false,
		require('@/assets/Thumbnails/assets_164.png'),
	),
	new PlaylistItem(
		'Birds',
		require('@/assets/Audio/Birds.mp3'),
		false,
		require('@/assets/Thumbnails/assets_165.png'),
	),
	new PlaylistItem(
		'Podington Bear - “Rubber Robot”',
		'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
		false,
		require('@/assets/Thumbnails/assets_164.png'),
	),
	new PlaylistItem(
		'Dogs”',
		require('@/assets/Audio/Dog.mp3'),
		false,
		require('@/assets/Thumbnails/assets_448.png'),
	),
	new PlaylistItem(
		'Lion',
		require('@/assets/Audio/Lion.mp3'),
		false,
		require('@/assets/Thumbnails/assets_164.png'),
	),
]

export default function Novels() {
	return <MediaPlayer PLAYLIST={PLAYLIST} />
}
