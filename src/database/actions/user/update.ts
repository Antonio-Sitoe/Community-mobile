import { database } from '@/database/database'
import { User } from '@/database/model/user'

const UPDATE_USER = (data: any) => {
	return database.write(async () => {
		const userGet = database.collections.get<User>('user')
		const userExist = await userGet.query().fetch()
		// PEGAR  O PRIMEIRO USUAARIO E ATUALIZA
		const userUpdated = await userExist[0].update((user: any) => {
			user.name = data.name
			user.email = data.email
			user.createdAt = `${new Date()}`
		})
		return userUpdated
	})
}

export { UPDATE_USER }
