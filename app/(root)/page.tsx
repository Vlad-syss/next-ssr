import { UserData } from '@/types'
import UserList from './_components/UserList'

export default async function UserListPage() {
	let initialUsers: UserData[] = []

	try {
		const data = await fetch('http://localhost:3000/api/users')
		initialUsers = await data.json()
	} catch (error) {
		console.error('Error fetching users:', error)
	}

	return <UserList initialUsers={initialUsers} />
}
