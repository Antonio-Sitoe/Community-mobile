import * as FileSystem from 'expo-file-system'

async function createAndReadDir(dir: string) {
	let folder: any = await FileSystem.getInfoAsync(dir)
	if (!folder.exists) {
		await FileSystem.makeDirectoryAsync(dir, {
			intermediates: true,
		})
	}
	folder = await FileSystem.readDirectoryAsync(dir)
	return folder
}

export async function createFolderToStoreDocuments(dirName: string) {
	const hasMediaDir = FileSystem.documentDirectory + dirName
	const folder = await createAndReadDir(hasMediaDir)
	console.log('pasta', folder)
}
