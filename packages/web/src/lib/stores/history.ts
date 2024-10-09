import { createSoundFromUrl, getUrlFromSound, playSound, type Sound } from 'pfxr'
import { derived, writable } from 'svelte/store'

type HistoryItem = {
	id: string
	name: string
	data: Sound
}

export const history = writable<HistoryItem[]>([
	{ id: '1', name: 'default 1', data: createSoundFromUrl(new URL(location.href)) },
])

export const historyCursor = writable<string>('1')

export const currentSound = derived(
	[historyCursor, history],
	([$historyCursor, $history]) =>
		$history.find((el) => el.id === $historyCursor)!.data,
)

export const addToHistory = (fx: Sound, name: string) => {
	const id = crypto.randomUUID()
	history.update((current) => {
		const suffix =
			Math.max(
				0,
				...current
					.filter((el) => {
						const reg = new RegExp(`^${name} \\d+$`)
						return reg.test(el.name)
					})
					.map((el) => Number(el.name.match(/\d+/))),
			) + 1
		return [{ id, name: `${name} ${suffix}`, data: fx }, ...current]
	})
	selectHistoryItem(id)
}

export const removeFromHistory = (id: string) => {
	history.update((currentHistory) => {
		if (currentHistory.length <= 1) return currentHistory
		historyCursor.update((currentCursor) => {
			if (currentCursor !== id) return currentCursor
			const index = currentHistory.findIndex((el) => el.id === id)
			if (index === currentHistory.length - 1)
				return currentHistory[index - 1].id
			return currentHistory[index + 1].id
		})
		return currentHistory.filter((el) => el.id !== id)
	})
}

export const selectHistoryItem = (id: string) => {
	historyCursor.set(id)
}

export const updateHistoryItemParam = (
	id: string,
	key: keyof Sound,
	value: number,
) => {
	history.update((current) =>
		current.map((el) => {
			if (el.id !== id) return el
			el.data[key] = value
			return el
		}),
	)
}

let audioContext: AudioContext | undefined

export const play = (fx: Sound) => {
	if (!audioContext) {
		audioContext = new AudioContext()
	}
	playSound(fx, audioContext, audioContext.destination)
}

export const updateUrl = (fx: Sound) => {
	window.history.pushState({}, '', getUrlFromSound(fx))
}
