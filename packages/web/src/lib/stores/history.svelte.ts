import { createSoundFromUrl, type Sound } from 'pfxr'

type HistoryItem = {
	id: string
	name: string
	data: Sound
}

class History {
	#items: HistoryItem[] = $state([])
	#cursor = $state('1')
	#currentSound = $derived(
		this.#items.find((el) => el.id === this.#cursor)!.data,
	)

	get items() {
		return this.#items
	}

	get cursor() {
		return this.#cursor
	}

	get currentSound() {
		return this.#currentSound
	}

	constructor() {
		this.#items = [
			{
				id: '1',
				name: 'default 1',
				data: createSoundFromUrl(new URL(location.href)),
			},
		]
	}

	add(fx: Sound, name: string) {
		const id = crypto.randomUUID()
		const suffix = this.#getNameSuffix(name)
		this.#items = [{ id, name: `${name} ${suffix}`, data: fx }, ...this.#items]
		this.select(id)
	}

	duplicate(itemId: string) {
		const item = this.#items.find((el) => el.id === itemId)
		if (!item) return
		const name = item.name.replace(/\d+$/, '').trim()
		const id = crypto.randomUUID()
		const suffix = this.#getNameSuffix(name)
		this.#items = [
			{ id, name: `${name} ${suffix}`, data: { ...item.data } },
			...this.#items,
		]
		this.select(id)
	}

	remove(id: string) {
		if (this.#items.length <= 1) return
		if (this.#cursor === id) {
			const index = this.#items.findIndex((el) => el.id === id)
			if (index === this.#items.length - 1)
				this.select(this.#items[index - 1].id)
			else this.select(this.#items[index + 1].id)
		}
		this.#items = this.#items.filter((el) => el.id !== id)
	}

	updateItemParam(id: string, key: keyof Sound, value: number) {
		this.#items = this.#items.map((el) => {
			if (el.id !== id) return el
			el.data[key] = value
			return el
		})
	}

	select(id: string) {
		this.#cursor = id
	}

	#getNameSuffix(name: string) {
		return (
			Math.max(
				0,
				...this.#items
					.filter((el) => {
						const reg = new RegExp(`^${name} \\d+$`)
						return reg.test(el.name)
					})
					.map((el) => Number(el.name.match(/\d+/))),
			) + 1
		)
	}
}

export const history = new History()
