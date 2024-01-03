import { database } from '@/database/database'
import { User } from '@/database/model/user'

const READ_USER = async () => {
	const userColletion = database.collections.get<User>('user')
	const userExist = await userColletion.query().fetch()

	if (userExist?.length) {
		return {
			id: userExist[0].id,
			name: userExist[0].name,
			email: userExist[0].email,
		}
	}
	return {
		id: '',
		name: '',
		email: '',
	}
}
export { READ_USER }
