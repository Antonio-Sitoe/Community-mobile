import { Button, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { HeaderModular } from '@/components/ui/HeaderModular'
import { useRouter } from 'expo-router'

export default function Home() {
	const router = useRouter()
	return (
		<>
			<HeaderModular isDefault />
			<View style={styles.container}>
				<View style={[styles.containerChild, styles.containerChildWithMB]}>
					<View style={styles.child}>
						<Text>Informação</Text>
						<Button
							title="gogt"
							onPress={() => {
								router.push('/(entertainments)/games')
							}}
						/>
					</View>
					<View style={styles.child2}>
						<Text>Metereologia</Text>
					</View>
				</View>
				{/* <View style={styles.containerChild}></View> */}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 50,
	},
	containerChild: {
		width: '100%',
		borderWidth: 2,
		borderColor: 'red',
		flexDirection: 'row',
		gap: 23,
	},
	containerChildWithMB: {
		marginBottom: 40,
	},
	child: {
		flex: 1,
		borderWidth: 2,
		borderColor: 'blue',
	},
	child2: {
		flex: 1.4,
		borderWidth: 2,
		borderColor: 'blue',
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
})
