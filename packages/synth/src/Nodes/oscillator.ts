import { clamp } from '../lib/number'
import { SOUND_SETTINGS } from '../SoundConfig'
import { SynthNode } from '../types'

type OscillatorParams = {
	waveForm: number
	frequency: number
	pitchDelta: number
	pitchDuration: number
	pitchDelay: number
}

const OSCILLATORTYPES: OscillatorType[] = [
	'sine',
	'sawtooth',
	'square',
	'triangle',
] as const
const MAXFREQUENCY = SOUND_SETTINGS.pitch[0].max

export const createOscillator = (
	audioContext: BaseAudioContext,
	durationTime: number,
	{
		waveForm,
		frequency,
		pitchDelta,
		pitchDuration: pitchDurationFactor,
		pitchDelay: pitchDelayFactor,
	}: OscillatorParams,
): SynthNode<OscillatorNode, OscillatorNode> => {
	const pitchDelayTime = durationTime * pitchDelayFactor
	const pitchDurationTime =
		(durationTime - pitchDelayTime) * pitchDurationFactor
	const oscillator = audioContext.createOscillator()
	oscillator.type = OSCILLATORTYPES[waveForm] ?? 'sine'
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
	oscillator.frequency.linearRampToValueAtTime(
		frequency,
		audioContext.currentTime + pitchDelayTime,
	)
	oscillator.frequency.linearRampToValueAtTime(
		clamp(0, frequency + pitchDelta, MAXFREQUENCY),
		audioContext.currentTime + pitchDelayTime + pitchDurationTime,
	)
	return {
		input: oscillator,
		output: oscillator,
		start: () => oscillator.start(),
		stop: (when?: number) => oscillator.stop(when),
	}
}
