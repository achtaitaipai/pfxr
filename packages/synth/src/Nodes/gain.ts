import { SynthNode } from '../types'

type GainParams = {
	volume: number
}

export const createGain = (
	audioContext: BaseAudioContext,
	{ volume }: GainParams,
): SynthNode<GainNode, GainNode> => {
	const gainNode = audioContext.createGain()
	gainNode.gain.value = volume
	return {
		input: gainNode,
		output: gainNode,
	}
}
