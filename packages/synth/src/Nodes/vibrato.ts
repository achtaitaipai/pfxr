import { SynthNode } from '../types'
import { createLfoNode } from './_lfoNode'

export type VibratoParams = {
	vibratoDepth: number
	vibratoRate: number
}

export const createVibrato = (
	audioContext: AudioContext | OfflineAudioContext,
	{ vibratoDepth, vibratoRate }: VibratoParams,
): SynthNode<OscillatorNode, GainNode> =>
	createLfoNode(audioContext, vibratoDepth, vibratoRate)
