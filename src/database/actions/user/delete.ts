import { database } from '@/database/database'
import { User } from '@/database/model/user'
import { Q } from '@nozbe/watermelondb'

const DELETE_USER_BY_ID = (id: string) => {
	return database.write(async () => {
		const userColletion = database.collections.get<User>('users')
		const users = await userColletion.query(Q.where('id', id)).fetch()

		if (users.length > 0) {
			users[0].destroyPermanently()
			return {
				sucess: true,
				message: 'Usuario apagado com sucesso',
			}
		}
		return {
			sucess: false,
			message: 'Falha',
		}
	})
}

export { DELETE_USER_BY_ID }
