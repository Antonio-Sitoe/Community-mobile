import { HeaderModular } from '@/components/ui/HeaderModular'
import Colors from '@/constants/Colors'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
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
	return (
		<>
			<HeaderModular isDefault={false} title="Jornais" />
			<PdfViewer />
		</>
	)
}

class PdfViewer extends Component {
	constructor(props) {
		super(props)

		// Definindo o estado inicial
		this.state = {
			page: 1,
			police: 2,
			totalPages: 0,
			pdfSource: {
				uri: 'https://jornalvisaomoz.com/wp-content/uploads/2021/07/Edicao-131-13-de-Julho-de-2021-1.pdf',
				cache: true,
			},
		}
		this.timeout = null

		// Bind necessário para acessar o 'this' dentro dos métodos da classe
		this.pdfRef = React.createRef()
		this.onLoadComplete = this.onLoadComplete.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
	}

	onLoadComplete(pages: number) {
		this.setState({ ...this.state, totalPages: pages })
	}

	onPageChanged(page: number) {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
		this.setState({ ...this.state, page })
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
							minScale={0.5}
							maxScale={4}
							spacing={20}
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
						page={this.state.page}
						total={this.state.totalPages}
						setPage={(value) => this.onSateValue(value)}
					/>
				) : (
					<View style={styles.footer}>
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
