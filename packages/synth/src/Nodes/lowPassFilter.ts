import { SynthNode } from '../types'

type LowpassFilterParams = {
	lowPassCutoff: number
	lowPassResonance: number
}
export const createLowPassFilter = (
	audioContext: AudioContext | OfflineAudioContext,
	{ lowPassCutoff, lowPassResonance }: LowpassFilterParams,
): SynthNode<BiquadFilterNode, BiquadFilterNode> => {
	const filter = audioContext.createBiquadFilter()
	filter.type = 'lowpass'
	filter.frequency.value = lowPassCutoff
	filter.Q.value = lowPassResonance
	return {
		input: filter,
		output: filter,
	}
}
