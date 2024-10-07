import { SynthNode } from '../types'

export type PhaserParams = {
	phaserBaseFrequency: number
	phaserLfoFrequency: number
	phaserDepth: number
}

export const createPhaser = (
	audioContext: BaseAudioContext,
	{ phaserBaseFrequency, phaserLfoFrequency, phaserDepth }: PhaserParams,
): SynthNode<BiquadFilterNode, BiquadFilterNode> => {
	const filter = audioContext.createBiquadFilter()
	filter.type = 'allpass'
	filter.frequency.value = phaserBaseFrequency

	const lfo = audioContext.createOscillator()
	lfo.type = 'sine'
	lfo.frequency.value = phaserLfoFrequency

	const lfoGain = audioContext.createGain()
	lfoGain.gain.value = phaserDepth

	lfo.connect(lfoGain)
	lfoGain.connect(filter.frequency)

	return {
		input: filter,
		output: filter,
		start: () => lfo.start(),
		stop: (when?: number) => lfo?.stop(when),
	}
}
