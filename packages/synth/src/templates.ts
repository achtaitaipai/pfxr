import { defaultSound, FIELDS } from './SoundConfig'
import { round } from './lib/number'
import { Random } from './lib/random'
import type { Sound } from './types'

const roundSoundValues = (fx: Partial<Sound>): Sound => {
	FIELDS.forEach((el) => {
		const value = fx[el.name]
		if (el.type === 'range' && value) {
			const decimals = el.step.toString().split('.')[1]?.length ?? 0
			fx[el.name] = round(value, decimals)
		}
	})
	return Object.assign({}, defaultSound, fx)
}

export type SoundTemplate = (random: Random) => Partial<Sound>

export const createSoundFromTemplate = (
	template: SoundTemplate,
	seed?: number,
) => roundSoundValues(template(new Random(seed)))

export const TEMPLATES = {
	DEFAULT: () => ({}),
	PICKUP: (rand) => ({
		...(rand.boolean()
			? {
					pitchDelta: rand.number(100, 500),
					pitchDuration: 0,
					pitchDelay: rand.number(0, 0.7),
				}
			: {}),
		waveForm: rand.fromArray([0, 1, 2, 3]),
		sustainPunch: rand.number(0, 0.8),
		sustainTime: rand.number(0.05, 0.2),
		decayTime: rand.number(0.1, 0.3),
		frequency: rand.number(900, 1700),
	}),
	LASER: (rand) => {
		const frequency = rand.number(100, 1300)
		return {
			waveForm: rand.fromArray([0, 1, 2, 3]),
			sustainPunch: rand.number(0, 0.8),
			sustainTime: rand.number(0.05, 0.1),
			decayTime: rand.number(0, 0.2),
			frequency,
			pitchDelta: rand.number(-frequency, -100),
			pitchDuration: 1,
			pitchDelay: rand.fromArray([0, rand.number(0, 0.3)]),
		}
	},
	JUMP: (rand) => ({
		waveForm: rand.fromArray([1, 2]),
		sustainPunch: rand.number(0, 0.8),
		sustainTime: rand.number(0.2, 0.5),
		decayTime: rand.number(0.1, 0.2),
		frequency: rand.number(100, 500),
		pitchDelta: rand.number(200, 500),
		pitchDuration: 1,
		pitchDelay: rand.fromArray([0, rand.number(0, 0.3)]),
	}),
	FALL: (rand) => {
		const frequency = rand.number(80, 500)
		return {
			waveForm: rand.fromArray([1, 2, 3]),
			sustainPunch: 0,
			sustainTime: rand.number(0.2, 0.5),
			decayTime: rand.number(0.2, 0.5),
			frequency,
			pitchDelta: -frequency,
			pitchDuration: 1,
			pitchDelay: rand.number(0, 0.2),
			vibratoRate: rand.number(8, 18),
			vibratoDepth: rand.number(10, 30),
			tremoloRate: rand.number(5, 18),
			tremoloDepth: rand.number(0, 1),
		}
	},
	POWERUP: (rand) => ({
		waveForm: rand.fromArray([0, 1, 2, 3]),
		sustainPunch: rand.number(0, 1),
		sustainTime: rand.number(0.2, 0.5),
		decayTime: rand.number(0.1, 0.5),
		frequency: rand.number(200, 1000),
		pitchDelta: rand.number(100, 300),
		pitchDuration: 1,
		pitchDelay: rand.fromArray([0, rand.number(0, 0.3)]),
		vibratoRate: rand.number(10, 18),
		vibratoDepth: rand.number(50, 100),
	}),
	EXPLOSION: (rand) => {
		const frequency = rand.number(200)
		return {
			waveForm: rand.fromArray([0, 1, 2, 3]),
			volume: 0.3,
			sustainPunch: rand.number(0, 0.3),
			sustainTime: rand.number(0.4, 1.3),
			decayTime: rand.number(0.1, 0.5),
			frequency,
			pitchDelta: -frequency,
			pitchDuration: 1,
			pitchDelay: rand.number(0.3),
			vibratoRate: rand.number(0, 70),
			vibratoDepth: rand.number(0, 100),
			tremoloRate: rand.number(0, 70),
			tremoloDepth: rand.number(0, 1),
			phaserDepth: rand.number(300, 1000),
			noiseAmount: rand.number(300, 500),
		}
	},
	BLIP: (rand) => ({
		waveForm: rand.fromArray([0, 1, 2, 3]),
		sustainTime: rand.number(0.02, 0.1),
		decayTime: rand.number(0, 0.04),
		frequency: rand.number(600, 3000),
	}),
	HIT: (rand) => {
		const frequency = rand.number(20, 500)
		return {
			waveForm: rand.fromArray([0, 1, 2, 3]),
			sustainTime: rand.number(0.01, 0.03),
			sustainPunch: rand.number(0.5),
			decayTime: rand.number(0, 0.2),
			frequency,
			pitchDelta: rand.number(-frequency, -frequency * 0.2),
			noiseAmount: rand.number(100),
		}
	},
	FART: (rand) => {
		const frequency = rand.number(30, 150)
		return {
			waveForm: 1,
			volume: 0.7,
			sustainPunch: rand.number(0, 0.2),
			sustainTime: rand.number(0.1, 0.5),
			decayTime: rand.number(0.3, 0.5),
			frequency,
			pitchDelta: -frequency / 2,
			pitchDuration: 1,
			pitchDelay: 0.1,
			vibratoRate: rand.number(8, 18),
			vibratoDepth: rand.number(10, 30),
			tremoloRate: rand.number(35, 70),
			tremoloDepth: rand.number(0.6, 1),
			lowPassCutoff: frequency * 10,
			lowPassResonance: 10,
			noiseAmount: rand.number(0, 30),
		}
	},
	RANDOM: (rand) => {
		const params = { ...defaultSound } satisfies Sound
		for (let index = 0; index < FIELDS.length; index++) {
			const element = FIELDS[index]
			if (element) {
				if (element.type === 'range') {
					params[element.name] = rand.number(element.min, element.max)
				} else if (element.type === 'radio') {
					params[element.name] = rand.fromArray(
						element.options.map((e) => e.value),
					)
				}
			}
		}
		return params satisfies Partial<Sound>
	},
} as const satisfies Record<string, SoundTemplate>
