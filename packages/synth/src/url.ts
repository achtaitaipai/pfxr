import { defaultSound, FIELDS } from './SoundConfig'
import { Sound } from './types'

export const getSoundFromUrl = (url: URL): Sound => {
	const fx = { ...defaultSound }
	const q = url.searchParams.get('fx')
	if (!q) return fx
	const urlState = decodeURI(q).split(',')
	for (let index = 0; index < FIELDS.length; index++) {
		const name = FIELDS[index]?.name
		const rawVal = urlState[index]
		if (name && rawVal && !isNaN(Number(rawVal))) fx[name] = Number(rawVal)
	}
	return fx
}

export const getUrlFromSound = (fx: Sound, currentUrl = new URL(location.href)) => {
	const params = encodeURI(Object.values(fx).join(','))
	const searchParams = currentUrl.searchParams
	searchParams.set('fx', params)
	return currentUrl
}
