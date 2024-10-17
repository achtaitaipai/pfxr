import { defaultSound } from './SoundConfig'
import { createNoise } from './Nodes/noise'
import { createEnveloppe } from './Nodes/enveloppe'
import { createHighPassFilter } from './Nodes/highPassFilter'
import { createLowPassFilter } from './Nodes/lowPassFilter'
import { createOscillator } from './Nodes/oscillator'
import { createPhaser } from './Nodes/phaser'
import { createTremolo } from './Nodes/tremolo'
import { createVibrato } from './Nodes/vibrato'
import type { Sound } from './types'
import { createGain } from './Nodes/gain'

export const playSound = (
	partialSound: Partial<Sound>,
	audioContext: BaseAudioContext,
	destination: AudioNode,
) => {
	const fx: Sound = Object.assign({}, defaultSound, partialSound)
	const duration = fx.attackTime + fx.sustainTime + fx.decayTime

	const oscillator = createOscillator(audioContext, duration, fx)
	const noise = createNoise(audioContext, fx)
	const enveloppe = createEnveloppe(audioContext, fx)
	const vibrato = createVibrato(audioContext, fx)
	const tremolo = createTremolo(audioContext, fx)
	const lowPassFilter = createLowPassFilter(audioContext, fx)
	const highPassFilter = createHighPassFilter(audioContext, fx)
	const phaser = createPhaser(audioContext, fx)
	const gainNode = createGain(audioContext, fx)

	vibrato.output.connect(oscillator.input.frequency)
	tremolo.output.connect(enveloppe.input)
	oscillator.output.connect(noise.input)
	noise.output.connect(phaser.input)
	phaser.output.connect(lowPassFilter.input)
	lowPassFilter.output.connect(highPassFilter.input)
	highPassFilter.output.connect(enveloppe.input)
	enveloppe.output.connect(gainNode.input)
	gainNode.output.connect(destination)

	const nodes = [vibrato, tremolo, oscillator, phaser, lowPassFilter, enveloppe]

	return new Promise<void>((res) => {
		nodes.forEach((node) => {
			node.start?.()
			node.stop?.(audioContext.currentTime + duration)
		})
		oscillator.output.onended = () => res()
	})
}
