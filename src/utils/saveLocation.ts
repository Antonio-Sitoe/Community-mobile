import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveDataToLocalstorage = async (value: any, key: string) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (e) {
		console.log('Erro ao salvar', value)
	}
}

export const getDataFromLocalStorage = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)
		return jsonValue != null ? JSON.parse(jsonValue) : null
	} catch (e) {
		console.log('Erro ao buscar', key)
	}
}
