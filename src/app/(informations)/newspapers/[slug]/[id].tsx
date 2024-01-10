import { PdfViewer } from '@/components/PdfViewer/PdfViewer'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

export default function Newspapers() {
	const { id } = useLocalSearchParams()
	const [isFullScrean, setFullScrean] = useState(false)
	return (
		<>
			{isFullScrean === false && (
				<HeaderModular isDefault={false} title="Jornais" />
			)}
			<PdfViewer
				url="https://jornalvisaomoz.com/wp-content/uploads/2021/07/Edicao-131-13-de-Julho-de-2021-1.pdf"
				isFullScrean={isFullScrean}
				setFullScrean={setFullScrean}
			/>
		</>
	)
}
