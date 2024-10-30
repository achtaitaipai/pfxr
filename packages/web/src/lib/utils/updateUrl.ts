import { type Sound, getUrlFromSound } from 'pfxr'

export const updateUrl = (fx: Sound) => {
	window.history.replaceState({}, '', getUrlFromSound(fx))
}
