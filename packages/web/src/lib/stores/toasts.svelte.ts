type Toast = {
	id: string
	text: string
}

class Toaster {
	#toasts: Toast[] = $state([])

	addToast(text: string) {
		const id = crypto.randomUUID()
		this.#toasts = [...this.#toasts, { id, text }]
		setTimeout(() => {
			this.#toasts = this.#toasts.filter((el) => el.id !== id)
		}, 5000)
	}

	get toasts() {
		return this.#toasts
	}
}

export const toaster = new Toaster()
