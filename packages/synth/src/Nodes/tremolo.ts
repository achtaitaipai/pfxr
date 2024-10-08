import { SynthNode } from '../types'
import { createLfoNode } from './_lfoNode'

export type TremoloParams = {
	tremoloDepth: number
	tremoloRate: number
}

export const createTremolo = (
	audioContext: BaseAudioContext,
	{ tremoloDepth, tremoloRate }: TremoloParams,
): SynthNode<OscillatorNode, GainNode> =>
	createLfoNode(audioContext, tremoloDepth, tremoloRate)
