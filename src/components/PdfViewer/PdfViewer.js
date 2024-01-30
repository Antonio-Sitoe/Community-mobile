import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FooterModular } from '@/components/ui/FooterModular'

import React from 'react'
import PDF from 'react-native-pdf'
import Colors from '@/constants/Colors'
import Svg1271 from '@/assets/Icons/svg1271.svg'
import Svg1272 from '@/assets/Icons/svg1272.svg'

const { width, height } = Dimensions.get('window')

const BTN_WIDTH_AND_HEIGT = 50
const PDF_WIDTH = width * 0.8
const PDF_HEIGHT = height - 200

const PDF_FULL_WIDTH = width * 0.2
const PDF_FULL_HEIGHT = height - 100

export class PdfViewer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 1,
			scale: 1,
			police: 1,
			minScale: 0.5,
			maxScale: 4,
			totalPages: 0,
			slide: 0,
			pdfSource: {
				uri: this.props.url,
				cache: true,
			},
		}
		this.timeout = null
		this.pdfRef = React.createRef()
		this.onLoadComplete = this.onLoadComplete.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
	}

	onLoadComplete(pages) {
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

	onPageChanged(page) {
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
					<View
						style={[
							this.props.isFullScrean
								? styles.pdfFullWidth
								: styles.pdContainer,
						]}
					>
						{this.props.show ? (
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
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<ActivityIndicator
									size={60}
									color={Colors.light.sunsetOrange}
								/>
							</View>
						)}
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
				{this.state.totalPages !== 0 ? (
					<FooterModular
						isFullScrean={this.props.isFullScrean}
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
					<View style={styles.footerLoader}>
						<ActivityIndicator color={Colors.light.darkSlateGray} />
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
	pdfFullWidth: {
		flex: 1,
		width: PDF_FULL_WIDTH,
		height: PDF_FULL_HEIGHT,
	},
	footerLoader: {
		paddingHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 30,
		backgroundColor: Colors.light.sunsetOrange,
		height: 68,
	},
	pdf: {
		flex: 1,
		backgroundColor: Colors.light.darkSlateGray,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
