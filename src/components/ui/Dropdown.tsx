import Colors from '@/constants/Colors'
import { fonts } from '@/constants/fonts'
import { LanguageItemType } from '@/hooks/useTranslateHome'
import { usePathname } from 'expo-router'
import React, { FC, ReactElement, useRef, useState } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	View,
} from 'react-native'

interface Props {
	label: string
	data: Array<{ label: string; value: string }>
	onSelect: (item: LanguageItemType) => void
	right?: number
}

const Dropdown: FC<Props> = ({ label, data, onSelect, right = 130 }) => {
	const DropdownButton = useRef()
	const [visible, setVisible] = useState(false)
	const [selected, setSelected] = useState<undefined | LanguageItemType>(
		undefined,
	)
	const [dropdownTop, setDropdownTop] = useState(0)

	const toggleDropdown = (): void => {
		visible ? setVisible(false) : openDropdown()
	}

	const openDropdown = (): void => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + h)
		})
		setVisible(true)
	}

	const onItemPress = (item): void => {
		setSelected(item)
		onSelect(item)
		setVisible(false)
	}

	const renderItem = ({ item }): ReactElement<any, any> => (
		<TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
			<Text style={styles.itemText}>{item.label}</Text>
		</TouchableOpacity>
	)

	const renderDropdown = (): ReactElement<any, any> => {
		return (
			<Modal visible={visible} transparent animationType="fade">
				<TouchableOpacity
					style={styles.overlay}
					onPress={() => setVisible(false)}
				>
					<View style={[styles.dropdown, { top: dropdownTop, right }]}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		)
	}

	return (
		<TouchableOpacity
			ref={DropdownButton as any}
			style={styles.button}
			onPress={toggleDropdown}
		>
			{renderDropdown()}
			<Text style={styles.buttonText}>
				{(selected && selected?.label) || label}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#efefef',
		height: 35,
		width: 130,
		borderRadius: 18,
		zIndex: 1,
	},
	buttonText: {
		flex: 1,
		textAlign: 'center',
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
	icon: {
		marginRight: 10,
	},
	dropdown: {
		position: 'absolute',
		backgroundColor: Colors.light.smokeWhite,
		width: 130,
		shadowColor: '#000000',
		shadowRadius: 4,
		shadowOffset: { height: 4, width: 0 },
		shadowOpacity: 0.5,
		marginTop: -20,
		borderRadius: 18,
	},
	overlay: {
		width: '100%',
		height: '100%',
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		alignItems: 'center',
	},
	itemText: {
		fontFamily: fonts.fontFamyle.Gilroy_extraBold,
	},
})

export default Dropdown
