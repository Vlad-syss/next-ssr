import { UserData } from '@/types'
import { NextResponse } from 'next/server'

let users: UserData[] = [
	{ id: 1, name: 'Vlad Carasiv', email: 'vladcaras234@gmail.com' },
	{ id: 2, name: 'Olia Frank', email: 'oliafrunk2@gmail.com' },
]

export async function GET() {
	return NextResponse.json(users)
}

export async function POST(request: Request) {
	const body = await request.json()
	const { name, email } = body

	if (!name || !email) {
		return NextResponse.json(
			{ message: "Ім'я та емейл є обов'язкові." },
			{ status: 400 }
		)
	}

	const isExistingUser = users.find(user => user.email === email)
	if (isExistingUser) {
		return NextResponse.json(
			{ message: 'Цей емейл вже використовується.' },
			{ status: 400 }
		)
	}

	const newUser = { id: users.length + 1, name, email }
	users.push(newUser)
	return NextResponse.json(newUser, { status: 201 })
}

export async function DELETE(request: any) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('id')

	if (!id) {
		return NextResponse.json(
			{ error: 'Missing user ID in the request' },
			{ status: 400 }
		)
	}

	const userIndex = users.findIndex(user => user.id === parseInt(id))

	if (userIndex === -1) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 })
	}

	users.splice(userIndex, 1)

	users = users.map((user, i) => ({
		...user,
		id: i + 1,
	}))

	return NextResponse.json({ message: 'User deleted successfully' })
}
