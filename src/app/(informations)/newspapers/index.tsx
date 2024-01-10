import { HeaderModular } from '@/components/ui/HeaderModular'
import Colors from '@/constants/Colors'
import {
	View,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	Button,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import PDF from 'react-native-pdf'
import Svg1271 from '@/assets/Icons/svg1271.svg'
import Svg1272 from '@/assets/Icons/svg1272.svg'
import React, { Component, useState } from 'react'
import { FooterModular } from '@/components/ui/FooterModular'

const { width, height } = Dimensions.get('window')

const BTN_WIDTH_AND_HEIGT = 50
const PDF_WIDTH = width * 0.8
const PDF_HEIGHT = height - 200

export default function Newspapers() {
	const [isFullScrean, setFullScrean] = useState(false)

	return (
		<>
			{isFullScrean === false && (
				<HeaderModular isDefault={false} title="Jornais" />
			)}
			<PdfViewer isFullScrean={isFullScrean} setFullScrean={setFullScrean} />
		</>
	)
}

class PdfViewer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 1,
			scale: 1,
			police: 0,
			minScale: 0.5,
			maxScale: 4,
			totalPages: 0,
			slide: 0,
			pdfSource: {
				uri: 'https://jornalvisaomoz.com/wp-content/uploads/2021/07/Edicao-131-13-de-Julho-de-2021-1.pdf',
				cache: true,
			},
		}
		this.timeout = null
		this.pdfRef = React.createRef()
		this.onLoadComplete = this.onLoadComplete.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
	}

	onLoadComplete(pages: number) {
		this.setState({
			...this.state,
			totalPages: pages,
		})
	}

	onZoomPlus() {
		if (this.state.scale < this.state.maxScale) {
			this.setState({ ...this.state, scale: this.state.scale + 0.5 })
		} else {
			this.setState({ ...this.state, scale: 1.5 })
		}
	}

	onPageChanged(page: number) {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		this.setState({
			...this.state,
			page,
		})
	}

	goToNextPage() {
		if (this.state.page < this.state.totalPages) {
			this.pdfRef.current && this.pdfRef.current.setPage(this.state.page + 1)
		}
	}

	goToPrevPage() {
		if (this.state.page > 1) {
			this.pdfRef.current && this.pdfRef.current.setPage(this.state.page - 1)
		}
	}

	onSateValue(value) {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			this.pdfRef.current && this.pdfRef.current.setPage(Math.ceil(value))
		}, 200)
	}

	render() {
		return (
			<>
				<View style={styles.container}>
					<View
						style={[
							styles.btnView,
							{
								paddingRight: 50,
							},
						]}
					>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.goToPrevPage()}
						>
							{this.state.page <= 1 ? null : <Svg1271 />}
						</TouchableOpacity>
					</View>
					<View style={styles.pdContainer}>
						<PDF
							ref={this.pdfRef}
							horizontal={true}
							scale={this.state.scale}
							minScale={this.state.minScale}
							maxScale={this.state.maxScale}
							spacing={20}
							fitPolicy={this.state.police}
							showsHorizontalScrollIndicator={true}
							enablePaging={true}
							trustAllCerts={false}
							onScaleChanged={(sacel) => {
								console.log('sacel', sacel)
							}}
							source={this.state.pdfSource}
							style={styles.pdf}
							onLoadComplete={(page) => this.onLoadComplete(page)}
							onPageChanged={(page) => this.onPageChanged(page)}
							renderActivityIndicator={() => (
								<ActivityIndicator
									size={60}
									color={Colors.light.sunsetOrange}
								/>
							)}
						/>
					</View>
					<View
						style={[
							styles.btnView,
							{
								paddingLeft: 50,
							},
						]}
					>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => this.goToNextPage()}
						>
							{!(this.state.page >= this.state.totalPages) ? <Svg1272 /> : null}
						</TouchableOpacity>
					</View>
				</View>
				{this.state.totalPages !== 0 || this.props.isFullScrean === true ? (
					<FooterModular
						setFullScrean={this.props.setFullScrean}
						pages={{
							page: this.state.page,
							total: this.state.totalPages,
							setPage: (value) => this.onSateValue(value),
						}}
						onAddZoom={() => this.onZoomPlus()}
						slider={{
							scale: this.state.scale,
							setScale: (value) => {
								this.setState({ ...this.state, scale: value })
							},
						}}
					/>
				) : (
					<View style={styles.footer}>
						<ActivityIndicator color={Colors.light.darkSlateGray} />
						<Button
							onPress={() => this.props.setFullScrean(false)}
							title="mudar"
						/>
					</View>
				)}
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: Colors.light.darkSlateGray,
		paddingHorizontal: 50,
		alignItems: 'center',
	},
	btnView: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		width: BTN_WIDTH_AND_HEIGT,
		height: BTN_WIDTH_AND_HEIGT,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pdContainer: {
		flex: 1,
		width: PDF_WIDTH,
		height: PDF_HEIGHT,
	},
	pdf: {
		flex: 1,
		backgroundColor: Colors.light.darkSlateGray,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 30,
		backgroundColor: Colors.light.sunsetOrange,
		height: 68,
	},
})
