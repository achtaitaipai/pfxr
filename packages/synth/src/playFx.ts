import { defaultFx } from './FxConfig'
import { createEnveloppe } from './Nodes/enveloppe'
import { createHighPassFilter } from './Nodes/highPassFilter'
import { createLowPassFilter } from './Nodes/lowPassFilter'
import { createOscillator } from './Nodes/oscillator'
import { createPhaser } from './Nodes/phaser'
import { createTremolo } from './Nodes/tremolo'
import { createVibrato } from './Nodes/vibrato'
import type { Fx } from './types'

export const playFx = (
	partialFx: Partial<Fx>,
	audioContext: AudioContext | OfflineAudioContext,
	destination: AudioNode,
) => {
	const fx: Fx = Object.assign({}, defaultFx, partialFx)
	const duration = fx.attackTime + fx.sustainTime + fx.decayTime

	const oscillator = createOscillator(audioContext, duration, fx)
	const enveloppe = createEnveloppe(audioContext, fx)
	const vibrato = createVibrato(audioContext, fx)
	const tremolo = createTremolo(audioContext, fx)
	const lowPassFilter = createLowPassFilter(audioContext, fx)
	const highPassFilter = createHighPassFilter(audioContext, fx)
	const phaser = createPhaser(audioContext, fx)

	vibrato.output.connect(oscillator.input.frequency)
	tremolo.output.connect(enveloppe.input)
	oscillator.output.connect(phaser.input)
	phaser.output.connect(lowPassFilter.input)
	lowPassFilter.output.connect(highPassFilter.input)
	highPassFilter.output.connect(enveloppe.input)

	const nodes = [vibrato, tremolo, oscillator, phaser, lowPassFilter, enveloppe]

	return new Promise<void>((res) => {
		enveloppe.output.connect(destination)
		nodes.forEach((node) => {
			node.start?.()
			node.stop?.(audioContext.currentTime + duration)
		})
		oscillator.output.onended = () => res()
	})
}
