import { PdfViewer } from '@/components/PdfViewer/PdfViewer'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

export default function ComicsReader() {
	const { id } = useLocalSearchParams()
	const [isFullScrean, setFullScrean] = useState(false)

	return (
		<>
			{isFullScrean === false && (
				<HeaderModular isDefault={false} title="Os Informais capitulo 1" />
			)}
			<PdfViewer
				url="https://euamolivros.com/wp-content/uploads/2023/08/APRENDA-A-FAZER-FALTA-OFICIAL.pdf"
				isFullScrean={isFullScrean}
				setFullScrean={setFullScrean}
			/>
		</>
	)
}
