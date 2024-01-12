import { PdfViewer } from '@/components/PdfViewer/PdfViewer'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

export default function MagazideReader() {
	const { id } = useLocalSearchParams()
	const [isFullScrean, setFullScrean] = useState(false)

	return (
		<>
			{isFullScrean === false && (
				<HeaderModular isDefault={false} title="Xonguila N32" />
			)}
			<PdfViewer
				url="http://samples.leanpub.com/thereactnativebook-sample.pdf"
				isFullScrean={isFullScrean}
				setFullScrean={setFullScrean}
			/>
		</>
	)
}
