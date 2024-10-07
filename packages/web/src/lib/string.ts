export const camelToTitle = (str: string) =>
	str.replace(/(^.|[A-Z])/g, (l) => ' ' + l.toUpperCase()).trim()
