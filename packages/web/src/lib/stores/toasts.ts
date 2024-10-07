import { writable } from 'svelte/store'

type Toast = {
	id: string
	text: string
}

export const toasts = writable<Toast[]>([])

export const addToast = (text: string) => {
	const id = crypto.randomUUID()
	toasts.update((toasts) => [...toasts, { id, text }])
	setTimeout(() => destroyToast(id), 5000)
}

const destroyToast = (id: string) =>
	toasts.update((toasts) => toasts.filter((el) => el.id !== id))
