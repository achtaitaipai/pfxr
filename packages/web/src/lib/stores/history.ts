import { getFxFromUrl, getUrlFromFx, playFx, type Fx } from 'pfxr'
import { derived, writable } from 'svelte/store'

type HistoryItem = {
	id: string
	name: string
	data: Fx
}

export const history = writable<HistoryItem[]>([
	{ id: '1', name: 'default 1', data: getFxFromUrl(new URL(location.href)) },
])

export const historyCursor = writable<string>('1')

export const currentFx = derived(
	[historyCursor, history],
	([$historyCursor, $history]) =>
		$history.find((el) => el.id === $historyCursor)!.data,
)

export const addToHistory = (fx: Fx, name: string) => {
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
	key: keyof Fx,
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

export const play = (fx: Fx) => {
	if (!audioContext) {
		audioContext = new AudioContext()
	}
	playFx(fx, audioContext, audioContext.destination)
}

export const updateUrl = (fx: Fx) => {
	window.history.pushState({}, '', getUrlFromFx(fx))
}
