import { type Sound, playSound } from 'pfxr'

let audioContext: AudioContext | undefined

export const play = (fx: Sound) => {
	if (!audioContext) {
		audioContext = new AudioContext()
	}
	playSound(fx, audioContext, audioContext.destination)
}
