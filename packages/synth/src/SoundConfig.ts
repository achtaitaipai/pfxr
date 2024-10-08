import { Parameters, Sound } from './types'

export const SOUND_SETTINGS = {
	waveForm: [
		{
			name: 'waveForm',
			defaultValue: 0,
			type: 'radio',
			options: [
				{ value: 0, label: 'Sine' },
				{ value: 1, label: 'SawTooth' },
				{ value: 2, label: 'Square' },
				{ value: 3, label: 'Triangle' },
			],
		},
	],
	soundEnveloppe: [
		{
			name: 'attackTime',
			min: 0,
			max: 2,
			step: 0.01,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'sustainTime',
			min: 0,
			max: 2,
			step: 0.01,
			type: 'range',
			defaultValue: 0.07,
		},
		{
			name: 'sustainPunch',
			min: 0,
			max: 1,
			step: 0.01,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'decayTime',
			min: 0,
			max: 2,
			step: 0.01,
			type: 'range',
			defaultValue: 0.3,
		},
	],
	pitch: [
		{
			name: 'frequency',
			min: 0,
			max: 4000,
			step: 1,
			type: 'range',
			defaultValue: 700,
		},
		{
			name: 'pitchDelta',
			min: -4000,
			max: 4000,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'pitchDuration',
			min: 0,
			max: 1,
			step: 0.01,
			type: 'range',
			defaultValue: 1,
		},
		{
			name: 'pitchDelay',
			min: 0,
			max: 1,
			step: 0.01,
			type: 'range',
			defaultValue: 0,
		},
	],
	vibrato: [
		{
			name: 'vibratoRate',
			min: 0,
			max: 70,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'vibratoDepth',
			min: 0,
			max: 100,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
	],
	tremolo: [
		{
			name: 'tremoloRate',
			min: 0,
			max: 70,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'tremoloDepth',
			min: 0,
			max: 1,
			step: 0.01,
			type: 'range',
			defaultValue: 0,
		},
	],
	filters: [
		{
			name: 'highPassCutoff',
			min: 0,
			max: 4000,
			step: 0.1,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'highPassResonance',
			min: 0,
			max: 30,
			step: 0.1,
			type: 'range',
			defaultValue: 0,
		},
		{
			name: 'lowPassCutoff',
			min: 0,
			max: 4000,
			step: 0.1,
			type: 'range',
			defaultValue: 4000,
		},
		{
			name: 'lowPassResonance',
			min: 0,
			max: 30,
			step: 0.1,
			type: 'range',
			defaultValue: 0,
		},
	],
	phaser: [
		{
			name: 'phaserBaseFrequency',
			min: 0,
			max: 1000,
			step: 1,
			type: 'range',
			defaultValue: 100,
		},
		{
			name: 'phaserLfoFrequency',
			min: 0,
			max: 200,
			step: 1,
			type: 'range',
			defaultValue: 50,
		},
		{
			name: 'phaserDepth',
			min: 0,
			max: 1000,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
	],
	noise: [
		{
			name: 'noiseAmount',
			min: 0,
			max: 500,
			step: 1,
			type: 'range',
			defaultValue: 0,
		},
	],
} as const satisfies Parameters

export const FIELDS = Object.values(SOUND_SETTINGS).flatMap((el) => [...el])

export const defaultSound = FIELDS.reduce(
	(acc, el) => ({ ...acc, [el.name]: el.defaultValue }),
	{},
) as Sound
