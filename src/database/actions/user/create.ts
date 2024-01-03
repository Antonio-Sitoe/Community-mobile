import { database } from '@/database/database'
import { User } from '@/database/model/user'

const CREATE_USER = (data: any) => {
	return database.write(async () => {
		const userGet = database.collections.get<User>('user')
		const newUser = await userGet.create((user: any) => {
			user.name = data.name
			user.email = data.email
			user.createdAt = `${new Date()}`
		})
		return newUser
	})
}

export { CREATE_USER }
