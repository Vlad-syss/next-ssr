import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { UserData } from '@/types'
import { X } from 'lucide-react'
import { FC } from 'react'
interface UsersOutputProps extends UserData {
	deleteUser: (id: number) => Promise<void>
}
export const UsersOutput: FC<UsersOutputProps> = ({
	email,
	id,
	name,
	deleteUser,
}) => {
	return (
		<Card
			key={id}
			className='hover:shadow-xl transition-shadow duration-300 relative overflow-hidden '
		>
			<CardHeader className='p-4'>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{email}</CardDescription>
			</CardHeader>
			<Button
				variant='outline'
				size='icon'
				className='absolute top-0 right-0 border-none shadow-none p-1'
				onClick={() => deleteUser(id)}
			>
				<X />
			</Button>
		</Card>
	)
}
