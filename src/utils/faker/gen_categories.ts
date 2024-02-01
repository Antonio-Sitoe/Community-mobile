import { CategoriesPdfProps } from '@/@types/interfaces'
import {
	CREATE_PDF,
	CREATE_PDF_CATEGORIES,
} from '@/database/actions/pdfs/create'
import { READ_PDF_CATEGORIES_BY_CATEGORY_NAME } from '@/database/actions/pdfs/read'
import RNFetchBlob from 'rn-fetch-blob'

export const gen_categories = async () => {
	const fake_data: CategoriesPdfProps[] = [
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729791/a6ukp62jkdtkos7gavtc.png',
			name: 'banda desenhada',
			type: 'banda',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729790/vordm2lfavwqjcygdbj8.png',
			name: 'xonguila',
			type: 'revista',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729788/sltberegf3z4wfbqwkwi.png',
			name: 'indico',
			type: 'revista',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729788/b3amrlz9xeomtfo9yf9q.png',
			name: 'Exame',
			type: 'revista',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729788/miopljygqlyq7x4cxnew.png',
			name: 'Noticias',
			type: 'jornal',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/stbzo6f3egrenxgprnpx.png',
			name: 'Savana',
			type: 'jornal',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/rrpsf1s7e3bznuwe0eap.png',
			name: 'O pais',
			type: 'jornal',
		},
	]

	for await (const obj of fake_data) {
		const icon_data = await RNFetchBlob.fetch('GET', obj.icon)
		const icon = icon_data.base64()
		const body = {
			icon,
			name: obj.name,
			type: obj.type,
		}

		const i = await CREATE_PDF_CATEGORIES(body)
		console.log('criado', i.id)
	}
}
export const gen_videos = async () => {
	const fake_pdf_data = [
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/vbg0usaavf1nicllr3gm.png',
			type: 'Noticias',
			file: 'https://www.portaldogoverno.gov.mz/por/content/download/8036/60580/version/1/file/208+J.Mo%C3%A7ambique.pdf',
			edition: '01/04/2023',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/vbg0usaavf1nicllr3gm.png',
			type: 'Noticias',
			file: 'https://www.portaldogoverno.gov.mz/por/content/download/8036/60580/version/1/file/208+J.Mo%C3%A7ambique.pdf',
			edition: '02/04/2023',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/stbzo6f3egrenxgprnpx.png',
			type: 'Savana',
			file: 'https://www.portaldogoverno.gov.mz/por/content/download/7985/60133/version/1/file/207+J.Mo%C3%A7ambique.pdf',
			edition: '12/01/2024',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/rrpsf1s7e3bznuwe0eap.png',
			type: 'O pais',
			file: 'https://www.portaldogoverno.gov.mz/por/content/download/7807/58553/version/1/file/200+JM.pdf',
			edition: '13/01/2024',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729787/rrpsf1s7e3bznuwe0eap.png',
			type: 'O pais',
			file: 'https://www.portaldogoverno.gov.mz/por/content/download/7807/58553/version/1/file/200+JM.pdf',
			edition: '15/01/2024',
			category_id: '',
		},

		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729790/vordm2lfavwqjcygdbj8.png',
			type: 'xonguila',
			file: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
			edition: 'Revista Xonguila Nº63',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729790/t8ilsxmnwvqdfvpxjcah.png',
			type: 'xonguila',
			file: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
			edition: 'Revista Xonguila Nº65',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729788/sltberegf3z4wfbqwkwi.png',
			type: 'indico',
			file: 'https://kabum.digital/wp-content/uploads/2022/04/Kabum_Digital_Brochura.pdf',
			edition: 'Indico Edicao Nº64',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729788/b3amrlz9xeomtfo9yf9q.png',
			type: 'Exame',
			file: 'https://kabum.digital/wp-content/uploads/2022/04/Kabum_Digital_Brochura.pdf',
			edition: 'Exame Nº64',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729791/ajigmfw2umwx2asfftvx.png',
			type: 'banda desenhada',
			file: 'https://domainpublic.files.wordpress.com/2023/01/importancia-animais.pdf',
			edition: 'Os informais',
			category_id: '',
		},
		{
			icon: 'https://res.cloudinary.com/noblestack/image/upload/v1706729791/ooeymw6krgmyfg6yhwyr.png',
			type: 'banda desenhada',
			file: 'https://domainpublic.files.wordpress.com/2023/01/importancia-animais.pdf',
			edition: 'Banga',
			category_id: '',
		},
	]

	for await (const pdf of fake_pdf_data) {
		const [icon_data, file_pdf, obj] = await Promise.all([
			RNFetchBlob.fetch('GET', pdf.icon),
			RNFetchBlob.fetch('GET', pdf.file),
			READ_PDF_CATEGORIES_BY_CATEGORY_NAME(pdf.type),
		])

		const category_id = obj[0]?.id
		if (category_id) {
			const icon = icon_data.base64()
			const file = file_pdf.base64()
			const data_body = {
				icon,
				file,
				type: pdf.type,
				edition: pdf.edition,
				category_id,
			}
			const b = await CREATE_PDF(data_body)
			console.log('criado', b?.id)
		} else {
			console.log('nao funcionou', pdf.type)
		}
	}
}
