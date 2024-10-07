export const clamp = (min: number, value: number, max: number) =>
	Math.min(Math.max(min, value), max)

export const round = (value: number, decimals: number) =>
	Math.round(value * 10 ** decimals) / 10 ** decimals
