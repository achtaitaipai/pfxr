import { playSound, type Sound } from 'pfxr'

export const downloadSound = async (fx: Sound) => {
	const duration = fx.attackTime + fx.sustainTime + fx.decayTime
	const audioContext = new OfflineAudioContext(1, 44100 * duration, 44100)
	playSound(fx, audioContext, audioContext.destination)
	const audioBuffer = await audioContext.startRendering()
	const blob = exportWav(audioBuffer)
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = 'output.wav'
	a.click()
	URL.revokeObjectURL(url)
}

const exportWav = (audioBuffer: AudioBuffer) => {
	const numChannels = audioBuffer.numberOfChannels
	const sampleRate = audioBuffer.sampleRate
	const wavHeaderSize = 44 // Taille de l'en-tête WAV
	const numFrames = audioBuffer.length
	const bufferLength = wavHeaderSize + numFrames * numChannels * 2
	const wavBuffer = new ArrayBuffer(bufferLength)
	const view = new DataView(wavBuffer)
	writeString(view, 0, 'RIFF')
	view.setUint32(4, bufferLength - 8, true)
	writeString(view, 8, 'WAVE')
	writeString(view, 12, 'fmt ')
	view.setUint32(16, 16, true)
	view.setUint16(20, 1, true)
	view.setUint16(22, numChannels, true)
	view.setUint32(24, sampleRate, true)
	view.setUint32(28, sampleRate * numChannels * 2, true)
	view.setUint16(32, numChannels * 2, true)
	view.setUint16(34, 16, true)
	writeString(view, 36, 'data')
	view.setUint32(40, numFrames * numChannels * 2, true)

	let offset = wavHeaderSize
	for (let channel = 0; channel < numChannels; channel++) {
		const channelData = audioBuffer.getChannelData(channel)
		for (let i = 0; i < numFrames; i++) {
			const sample = Math.max(-1, Math.min(1, channelData[i]))
			view.setInt16(offset, sample * 0x7fff, true)
			offset += 2
		}
	}
	return new Blob([view], { type: 'audio/wav' })
}
const writeString = (view: DataView, offset: number, str: string) => {
	for (let i = 0; i < str.length; i++) {
		view.setUint8(offset + i, str.charCodeAt(i))
	}
}
