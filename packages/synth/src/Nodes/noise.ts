import { SynthNode } from '../types'

type NoiseParams = {
	noiseAmount: number
}

export const createNoise = (
	audioContext: BaseAudioContext,
	{ noiseAmount }: NoiseParams,
): SynthNode<WaveShaperNode, WaveShaperNode> => {
	const noise = audioContext.createWaveShaper()
	const n_samples = 44100
	const curve = new Float32Array(n_samples)
	const deg = Math.PI / 180

	for (let i = 0; i < n_samples; i++) {
		const x = (i * 2) / n_samples - 1
		curve[i] =
			((3 + Math.random() * noiseAmount) * x * 20 * deg) /
			(Math.PI + Math.random() * noiseAmount * Math.abs(x))
	}
	noise.curve = curve
	noise.oversample = '4x'
	return {
		input: noise,
		output: noise,
	}
}
