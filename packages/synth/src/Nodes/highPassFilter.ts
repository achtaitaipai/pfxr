import { SynthNode } from '../types'

type HighpassFilterParams = {
	highPassCutoff: number
	highPassResonance: number
}
export const createHighPassFilter = (
	audioContext: BaseAudioContext,
	{ highPassCutoff, highPassResonance }: HighpassFilterParams,
): SynthNode<BiquadFilterNode, BiquadFilterNode> => {
	const filter = audioContext.createBiquadFilter()
	filter.type = 'highpass'
	filter.frequency.value = highPassCutoff
	filter.Q.value = highPassResonance
	return {
		input: filter,
		output: filter,
	}
}
