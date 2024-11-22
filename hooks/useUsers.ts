import { UserData } from '@/types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export function useUsers(initialUsers: UserData[] = []) {
	const [users, setUsers] = useState<UserData[]>(initialUsers)
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const response = await axios.get<UserData[]>('/api/users')
			setUsers(response.data)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to fetch users')
		} finally {
			setLoading(false)
		}
	}, [])

	const addUser = useCallback(async (name: string, email: string) => {
		setLoading(true)
		setError(null)
		try {
			const response = await axios.post<UserData>('/api/users', { name, email })
			setUsers(prevUsers => [...prevUsers, response.data])
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to add user')
		} finally {
			setLoading(false)
		}
	}, [])

	const deleteUser = useCallback(async (id: number) => {
		setLoading(true)
		setError(null)
		try {
			const response = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
			if (response.ok) {
				setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
			}
		} catch (err: any) {
			setError('Failed to delete user')
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (initialUsers.length === 0) {
			fetchUsers()
		}
	}, [fetchUsers, initialUsers])

	return { users, isLoading, error, fetchUsers, addUser, deleteUser }
}
