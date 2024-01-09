import { HeaderModular } from '@/components/ui/HeaderModular'
import Colors from '@/constants/Colors'
import { createFolderToStoreDocuments } from '@/lib/FileSystem'
import {
	View,
	Text,
	Button,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import PDF from 'react-native-pdf'
import Svg1271 from '@/assets/Icons/svg1271.svg'
import Svg1272 from '@/assets/Icons/svg1272.svg'

const { width, height } = Dimensions.get('window')

const PDF_WIDTH = width
const PDF_HEIGHT = height

export default function Newspapers() {
	const pdfSource = {
		uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
		cache: true,
	}
	return (
		<>
			<HeaderModular isDefault={false} title="Jornais" />
			<View style={styles.container}>
				<View style={styles.btnView}>
					<TouchableOpacity style={styles.btn}>
						<Svg1271 />
					</TouchableOpacity>
				</View>
				<PDF
					horizontal
					trustAllCerts={false}
					source={pdfSource}
					style={styles.pdf}
					onLoadComplete={(pages, file) => {
						console.log('number of pages ' + pages)
					}}
					renderActivityIndicator={() => (
						<ActivityIndicator size={60} color={Colors.light.sunsetOrange} />
					)}
				/>
				<View style={styles.btnView}>
					<TouchableOpacity style={styles.btn}>
						<Svg1272 />
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.footer}>
				<Button
					onPress={() => createFolderToStoreDocuments('2024')}
					title="OK"
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: Colors.light.darkSlateGray,
		paddingHorizontal: 50,
	},
	btnView: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pdf: {
		flex: 1,
		width: PDF_WIDTH,
		height: PDF_HEIGHT,
		backgroundColor: Colors.light.darkSlateGray,
	},
	footer: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.light.sunsetOrange,
		height: 68,
	},
})
