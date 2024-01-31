import { PdfViewer } from '@/components/PdfViewer/PdfViewer'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function ComicsReader() {
	const { title, file } = useLocalSearchParams()
	const [isFullScrean, setFullScrean] = useState(false)
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<>
			{isFullScrean === false && (
				<HeaderModular isDefault={false} title={title as string} />
			)}
			<PdfViewer
				url={`data:application/pdf;base64,${file}`}
				isFullScrean={isFullScrean}
				setFullScrean={setFullScrean}
				show={show}
			/>
		</>
	)
}
