# 💨 Pfxr

Pfxr is a lightweight JavaScript library inspired by DrPetter's iconic **sfxr** sound generator. It allows developers to easily create retro-style sound effects for games and applications directly in the browser using the WebAudio API.

You can also try out and experiment with sound effects using the **[Pfxr UI](https://achtaitaipai.github.io/pfxr/)**, which provides an intuitive interface for generating and tweaking sounds, and even sharing them via URL.

## Getting Started

You can install the library in your project by running:

```bash
npm install pfxr
```

Once installed, you can import and use the library in your JavaScript or TypeScript project.

```typescript
import { playSound, createSoundFromTemplate, TEMPLATES } from 'pfxr'

const audioContext = new AudioContext()
const sound = createSoundFromTemplate(TEMPLATES.LASER)

playSound(sound, audioContext, audioContext.destination)
```

### Using Pfxr via CDN

If you prefer to use **Pfxr** directly in the browser without installing via npm, you can include it using a CDN.

```html
<script src="https://unpkg.com/pfxr/dist/index.global.js"></script>

<script>
	const { playSound, createSoundFromTemplate, TEMPLATES } = pfxr

	const audioContext = new AudioContext()
	const sound = createSoundFromTemplate(TEMPLATES.LASER)

	playSound(sound, audioContext, audioContext.destination)
</script>
```

By adding the script tag, you can directly access the `pfxr` object and all its functionality, making it easy to integrate sound effects into any web project.

## `playSound`

The `playSound` function plays a sound using customizable parameters. This function takes a partial set of sound parameters and outputs the resulting audio to the specified audio context.

### Parameters

- **`partialSound: Partial<Sound>`**  
   A partial object representing the sound settings. Each field corresponds to a parameter from the `SOUND_SETTINGS`, allowing you to define properties like waveform, envelope, pitch, filters, etc. If any properties are missing, default values from the settings will be used.
- **`audioContext: BaseAudioContext`**  
   The WebAudio context used to process and play the sound. This is where the sound will be generated and output.

- **`destination: AudioNode`**  
   The destination audio node, which is typically the final node in the WebAudio chain where the sound will be output, like speakers or headphones.

### Returns

- **`Promise<void>`**  
   Returns a promise that resolves once the sound has been played.

### Usage

```javascript
import { playSound } from 'pfxr'
const audioContext = new AudioContext()
const soundSettings = {
	waveForm: 2,
	frequency: 440,
	sustainTime: 0.2,
	decayTime: 0.5,
}

playSound(soundSettings, audioContext, audioContext.destination)
```

## `createSoundFromTemplate`

The `createSoundFromTemplate` function generates a complete [sound](#sound) object based on a predefined sound template and an optional random seed. The function uses a template to structure the sound settings and introduces randomness for variety or uniqueness in the generated sound.

### Parameters

- **`template: SoundTemplate`**  
   A function representing a sound template. The template function defines the structure of the sound by specifying key sound parameters like waveform, pitch, envelope, and effects. You can choose from predefined templates (e.g., "DEFAULT", "PICKUP", "LASER", "JUMP", "FALL", "POWERUP", "EXPLOSION", "BLIP", "HIT", "FART", "RANDOM") or [create your own](#custom-template).

- **`seed?: number`** _(Optional)_  
   A random seed value to control the random generation of the sound properties. This allows for reproducibility, meaning if you pass the same seed and template, the sound will always be generated the same way. If no seed is provided, the random generator will create a new, unpredictable sound.

### Returns

- **`Sound`**  
   Returns a complete sound object that includes all the necessary parameters (e.g., waveform, frequency, attack time, etc.) needed to generate the sound. This object can be passed to functions like `playSound` for playback.

### Usage

```javascript
import { playSound, TEMPLATES, createSoundFromTemplate } from 'pfxr'
const sound = createSoundFromTemplate(TEMPLATES.LASER, 999)

const audioContext = new AudioContext()
playSound(sound, audioContext, audioContext.destination)
```

## `createSoundFromUrl`

The `createSoundFromUrl` function extracts sound parameters from a provided URL and returns a complete sound object. This allows users to share or load sounds via URLs that encapsulate all necessary sound settings.

## Parameters

- **`url: URL`**  
   The URL that contains the sound parameters. The URL is expected to have specific query parameters representing sound properties such as waveform, frequency, envelope, pitch, and effects. This URL can be generated by tools like **[PFXR](https://achtaitaipai.github.io/pfxr/)**, which provides an interface for creating sounds and generates a URL containing the sound's parameters.

#### Returns

- **`Sound`**  
   Returns a fully formed [sound](#sound) object that includes all the necessary parameters (e.g., waveform, frequency, attack time, etc.) derived from the URL. The resulting sound object can be directly used in functions like `playSound` for playback or further customization.

#### Usage

```javascript
import { playSound, createSoundFromUrl } from 'pfxr'
const url = new URL(
	'https://achtaitaipai.github.io/pfxr/?fx=2,0,0.25,0,0.39,443,-443,1,0.12,12,11,10,0.61,0,0,4000,0,100,50,0,0',
)
const sound = createSoundFromUrl(url)

const audioContext = new AudioContext()
playSound(sound, audioContext, audioContext.destination)
```

## `getUrlFromSound`

The `getUrlFromSound` function generates a URL from a given sound object, encoding all its parameters into query string format. This URL can be shared or saved, allowing the sound to be recreated later.

### Parameters

- **`fx: Sound`**  
   The sound object containing all the parameters such as waveform, pitch, envelope, and effects. This object is converted into a set of query parameters for inclusion in the URL.

- **`currentUrl?: URL`** _(Optional)_  
   An optional base URL to which the sound parameters will be appended. If no URL is provided, a default one will be used.

### Returns

- **`URL`**  
   Returns a URL that encapsulates all the sound parameters, which can be shared or used to recreate the same sound configuration.

## Custom Template

In addition to the predefined templates, you can create your own custom sound templates to fit specific needs or generate unique sound effects. A custom template works by specifying the sound parameters you want to randomize or control, such as waveform, pitch, envelope, and effects.

The custom templates use a `rand` object, which provides various methods for generating random values. These methods help add variation and randomness to sound properties, making the sounds more dynamic and unpredictable.

### `rand` Methods:

- **`number(min?: number, max?: number)`**  
   Generates a random floating-point number between `min` and `max`. If no arguments are provided, it returns a number between 0 and 1.  
   Example:

  ```typescript
  rand.number(200, 800) // Returns a number between 200 and 800
  ```

- **`boolean(trueProbability?: number)`**  
   Generates a random boolean (`true` or `false`). You can specify the probability of `true` with `trueProbability` (default is 0.5).  
   Example:

  ```typescript
  rand.boolean(0.7) // 70% chance of returning true
  ```

- **`fromArray<T>(array: T[])`**  
   Selects a random element from an array.  
   Example:
  ```typescript
  rand.fromArray([1, 2, 3, 4]) // Randomly selects one of the array elements
  ```

Here's an example of a custom template that uses these methods to randomize the sound parameters:

### Example: Custom Template

```typescript
import { playSound, createSoundFromTemplate, type SoundTemplate } from 'pfxr'

const customTemplate: SoundTemplate = (rand) => ({
	waveForm: rand.fromArray([0, 1, 2, 3]), // Randomly selects a waveform type
	frequency: rand.number(200, 800), // Random frequency between 200 and 800 Hz
	sustainTime: rand.number(0.2, 0.5), // Random sustain time between 0.2 and 0.5 seconds
	decayTime: rand.number(0.3, 0.6), // Random decay time between 0.3 and 0.6 seconds
	pitchDelta: -rand.number(200, 500), // Falling pitch over time
	pitchDuration: 1, // Static pitch duration
	pitchDelay: 0, // No pitch delay
	vibratoRate: rand.number(0, 10), // Random vibrato rate
	vibratoDepth: rand.number(0, 5), // Random vibrato depth
	lowPassCutoff: rand.number(1000, 3000), // Random low-pass filter cutoff
	lowPassResonance: rand.number(0, 10), // Random low-pass filter resonance
})

const sound = createSoundFromTemplate(customTemplate)

const audioContext = new AudioContext()
playSound(sound, audioContext, audioContext.destination)
```

## `SOUND_SETTINGS`

The `SOUND_SETTINGS` object defines the configuration for the sound parameters used in the library. It serves as a blueprint to build user interfaces (UI) that allow users to control and tweak various aspects of sound synthesis. Each entry in `SOUND_SETTINGS` corresponds to a specific sound property, such as waveform type, pitch, or filters, and contains details such as the parameter's name, default value, type (e.g., range, radio), and other constraints like minimum and maximum values.

For a reference implementation of how to build an interface around this structure, you can view the source code here: [SoundConfig.ts on GitHub](https://github.com/achtaitaipai/pfxr/blob/main/packages/synth/src/SoundConfig.ts).

## Sound

The Sound type represents the full configuration of a sound effect in the library. Each field in the Sound type corresponds to a specific sound property, like waveform, pitch, envelope, and effects such as vibrato or filters.

Here is a list of all the parameters included in the `Sound` type :

### Waveform

1. **waveForm** (`radio`)
   - Type of waveform used in sound synthesis.
   - Options: `Sine (0)`, `SawTooth (1)`, `Square (2)`, `Triangle (3)`
   - Default: `0` (Sine)

### Volume

2. volume(range)
   - Volume of the sound
   - Range: 0 to 1
   - Default: 0

### Envelope

3. **attackTime** (`range`)

   - Time for the sound to reach its peak after being triggered.
   - Range: `0` to `2` (seconds)
   - Default: `0`

4. **sustainTime** (`range`)

   - Duration the sound sustains at peak level after the attack phase.
   - Range: `0` to `2` (seconds)
   - Default: `0.07`

5. **sustainPunch** (`range`)

   - Adds a "punch" to the sustained portion of the sound.
   - Range: `0` to `1`
   - Default: `0`

6. **decayTime** (`range`)
   - Time for the sound to fade after the sustain phase ends.
   - Range: `0` to `2` (seconds)
   - Default: `0.3`

### Pitch

7. **frequency** (`range`)

   - Base frequency of the sound (pitch).
   - Range: `0` to `4000` (Hz)
   - Default: `700`

8. **pitchDelta** (`range`)

   - Change in frequency over time (positive for rising, negative for falling pitch).
   - Range: `-4000` to `4000`
   - Default: `0`

9. **pitchDuration** (`range`)

   - Duration of the pitch modulation.
   - Range: `0` to `1` (seconds)
   - Default: `1`

10. **pitchDelay** (`range`)

- Delay before the pitch change starts.
- Range: `0` to `1` (seconds)
- Default: `0`

### Vibrato

11. **vibratoRate** (`range`)

    - Speed of vibrato modulation (frequency modulation).
    - Range: `0` to `70`
    - Default: `0`

12. **vibratoDepth** (`range`)
    - Intensity of the vibrato (depth of modulation).
    - Range: `0` to `100`
    - Default: `0`

### Tremolo

13. **tremoloRate** (`range`)

    - Speed of tremolo modulation (amplitude modulation).
    - Range: `0` to `70`
    - Default: `0`

14. **tremoloDepth** (`range`)
    - Intensity of the tremolo effect.
    - Range: `0` to `1`
    - Default: `0`

### Filters

15. **highPassCutoff** (`range`)

    - Frequency above which sound will pass (low frequencies are filtered out).
    - Range: `0` to `4000` (Hz)
    - Default: `0`

16. **highPassResonance** (`range`)

    - Resonance of the high-pass filter, affecting the emphasis around the cutoff frequency.
    - Range: `0` to `30`
    - Default: `0`

17. **lowPassCutoff** (`range`)

    - Frequency below which sound will pass (high frequencies are filtered out).
    - Range: `0` to `4000` (Hz)
    - Default: `4000`

18. **lowPassResonance** (`range`)
    - Resonance of the low-pass filter, emphasizing frequencies around the cutoff.
    - Range: `0` to `30`
    - Default: `0`

### Phaser

19. **phaserBaseFrequency** (`range`)

    - Base frequency of the phaser effect, which modulates phase cancellation in the sound.
    - Range: `0` to `1000`
    - Default: `100`

20. **phaserLfoFrequency** (`range`)

    - Frequency of the low-frequency oscillator (LFO) controlling the phaser.
    - Range: `0` to `200`
    - Default: `50`

21. **phaserDepth** (`range`)
    - Depth of the phaser effect.
    - Range: `0` to `1000`
    - Default: `0`

### Noise

22. noiseAmount (`range`)

- Amount of noise mixed into the sound, useful for effects like explosions or wind.
- Range: `0` to `500` - Default: `0`
