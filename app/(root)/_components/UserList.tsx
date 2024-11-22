'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/hooks'
import { UserData } from '@/types'
import { Form } from './Form'
import { UsersOutput } from './UsersOutput'

interface UserListProps {
	initialUsers: UserData[]
}

export default function UserList({ initialUsers }: UserListProps) {
	const { users, isLoading, error, addUser, deleteUser } =
		useUsers(initialUsers)

	const handleSubmit = (data: { username: string; email: string }) => {
		addUser(data.username, data.email)
	}

	return (
		<div className='flex items-center justify-center w-full h-screen bg-teal-950 px-2'>
			<div className='p-3 bg-slate-50 rounded-xl shadow-2xl max-w-[600px] w-full shadow-zinc-100/10'>
				<h1 className='font-bold text-[25px]'>User List: </h1>
				{isLoading && <Skeleton className='w-full h-[60px]' />}
				{error && <p style={{ color: 'red' }}>{error}</p>}

				{users?.length === 0 && !isLoading && (
					<p className='text-gray-500 tracking-widest uppercase font-semibold'>
						There are no users.
					</p>
				)}

				{users?.length > 0 && (
					<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-2'>
						{users.map(user => (
							<UsersOutput key={user.id} {...user} deleteUser={deleteUser} />
						))}
					</div>
				)}

				<Form onSubmit={handleSubmit} />
			</div>
		</div>
	)
}
