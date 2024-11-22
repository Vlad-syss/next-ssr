'use client'

import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface FormProps {
	onSubmit: SubmitHandler<{ username: string; email: string }>
}

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
})

type FormData = z.infer<typeof formSchema>

export const Form: FC<FormProps> = ({ onSubmit }) => {
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
	})

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = methods

	return (
		<FormProvider {...methods}>
			<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
				<FormField
					control={control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter username'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormMessage>{errors.username?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
									value={field.value || ''}
								/>
							</FormControl>
							<FormMessage>{errors.email?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full'>
					Submit
				</Button>
			</form>
		</FormProvider>
	)
}
