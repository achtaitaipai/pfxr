import { FIELDS } from './SoundConfig'

type Input =
	| {
			name: string
			min: number
			max: number
			step: number
			defaultValue: number
			type: 'range'
	  }
	| {
			name: string
			options: { label: string; value: number }[]
			defaultValue: number
			type: 'radio'
	  }

export type Parameters = Record<string, Input[]>

export type Sound = Record<(typeof FIELDS)[number]['name'], number>

export type SynthNode<T extends AudioNode, U extends AudioNode> = {
	input: T
	output: U
	start?: () => void
	stop?: (when?: number) => void
}
