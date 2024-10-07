import { SynthNode } from '../types'

export const createLfoNode = (
	audioContext: BaseAudioContext,
	depth: number,
	rate: number,
): SynthNode<OscillatorNode, GainNode> => {
	const oscillator = audioContext.createOscillator()
	const gain = audioContext.createGain()

	oscillator.frequency.value = rate
	gain.gain.value = depth
	oscillator.connect(gain)
	return {
		input: oscillator,
		output: gain,
		start: () => oscillator.start(),
		stop: (when?: number) => oscillator.stop(when),
	}
}
