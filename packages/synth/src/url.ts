import { defaultFx, FIELDS } from './FxConfig'
import { Fx } from './types'

export const getFxFromUrl = (url: URL): Fx => {
	const fx = { ...defaultFx }
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

export const getUrlFromFx = (fx: Fx, currentUrl = new URL(location.href)) => {
	const params = encodeURI(Object.values(fx).join(','))
	const searchParams = currentUrl.searchParams
	searchParams.set('fx', params)
	return currentUrl
}
