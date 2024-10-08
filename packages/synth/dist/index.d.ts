declare const SOUND_SETTINGS: {
    readonly waveForm: [{
        readonly name: "waveForm";
        readonly defaultValue: 0;
        readonly type: "radio";
        readonly options: [{
            readonly value: 0;
            readonly label: "Sine";
        }, {
            readonly value: 1;
            readonly label: "SawTooth";
        }, {
            readonly value: 2;
            readonly label: "Square";
        }, {
            readonly value: 3;
            readonly label: "Triangle";
        }];
    }];
    readonly soundEnveloppe: [{
        readonly name: "attackTime";
        readonly min: 0;
        readonly max: 2;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "sustainTime";
        readonly min: 0;
        readonly max: 2;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0.07;
    }, {
        readonly name: "sustainPunch";
        readonly min: 0;
        readonly max: 1;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "decayTime";
        readonly min: 0;
        readonly max: 2;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0.3;
    }];
    readonly pitch: [{
        readonly name: "frequency";
        readonly min: 0;
        readonly max: 4000;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 700;
    }, {
        readonly name: "pitchDelta";
        readonly min: -4000;
        readonly max: 4000;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "pitchDuration";
        readonly min: 0;
        readonly max: 1;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 1;
    }, {
        readonly name: "pitchDelay";
        readonly min: 0;
        readonly max: 1;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
    readonly vibrato: [{
        readonly name: "vibratoRate";
        readonly min: 0;
        readonly max: 70;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "vibratoDepth";
        readonly min: 0;
        readonly max: 100;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
    readonly tremolo: [{
        readonly name: "tremoloRate";
        readonly min: 0;
        readonly max: 70;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "tremoloDepth";
        readonly min: 0;
        readonly max: 1;
        readonly step: 0.01;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
    readonly filters: [{
        readonly name: "highPassCutoff";
        readonly min: 0;
        readonly max: 4000;
        readonly step: 0.1;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "highPassResonance";
        readonly min: 0;
        readonly max: 30;
        readonly step: 0.1;
        readonly type: "range";
        readonly defaultValue: 0;
    }, {
        readonly name: "lowPassCutoff";
        readonly min: 0;
        readonly max: 4000;
        readonly step: 0.1;
        readonly type: "range";
        readonly defaultValue: 4000;
    }, {
        readonly name: "lowPassResonance";
        readonly min: 0;
        readonly max: 30;
        readonly step: 0.1;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
    readonly phaser: [{
        readonly name: "phaserBaseFrequency";
        readonly min: 0;
        readonly max: 1000;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 100;
    }, {
        readonly name: "phaserLfoFrequency";
        readonly min: 0;
        readonly max: 200;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 50;
    }, {
        readonly name: "phaserDepth";
        readonly min: 0;
        readonly max: 1000;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
    readonly noise: [{
        readonly name: "noiseAmount";
        readonly min: 0;
        readonly max: 500;
        readonly step: 1;
        readonly type: "range";
        readonly defaultValue: 0;
    }];
};
declare const FIELDS: ({
    readonly name: "waveForm";
    readonly defaultValue: 0;
    readonly type: "radio";
    readonly options: [{
        readonly value: 0;
        readonly label: "Sine";
    }, {
        readonly value: 1;
        readonly label: "SawTooth";
    }, {
        readonly value: 2;
        readonly label: "Square";
    }, {
        readonly value: 3;
        readonly label: "Triangle";
    }];
} | {
    readonly name: "attackTime";
    readonly min: 0;
    readonly max: 2;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "sustainTime";
    readonly min: 0;
    readonly max: 2;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0.07;
} | {
    readonly name: "sustainPunch";
    readonly min: 0;
    readonly max: 1;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "decayTime";
    readonly min: 0;
    readonly max: 2;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0.3;
} | {
    readonly name: "frequency";
    readonly min: 0;
    readonly max: 4000;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 700;
} | {
    readonly name: "pitchDelta";
    readonly min: -4000;
    readonly max: 4000;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "pitchDuration";
    readonly min: 0;
    readonly max: 1;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 1;
} | {
    readonly name: "pitchDelay";
    readonly min: 0;
    readonly max: 1;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "vibratoRate";
    readonly min: 0;
    readonly max: 70;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "vibratoDepth";
    readonly min: 0;
    readonly max: 100;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "tremoloRate";
    readonly min: 0;
    readonly max: 70;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "tremoloDepth";
    readonly min: 0;
    readonly max: 1;
    readonly step: 0.01;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "highPassCutoff";
    readonly min: 0;
    readonly max: 4000;
    readonly step: 0.1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "highPassResonance";
    readonly min: 0;
    readonly max: 30;
    readonly step: 0.1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "lowPassCutoff";
    readonly min: 0;
    readonly max: 4000;
    readonly step: 0.1;
    readonly type: "range";
    readonly defaultValue: 4000;
} | {
    readonly name: "lowPassResonance";
    readonly min: 0;
    readonly max: 30;
    readonly step: 0.1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "phaserBaseFrequency";
    readonly min: 0;
    readonly max: 1000;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 100;
} | {
    readonly name: "phaserLfoFrequency";
    readonly min: 0;
    readonly max: 200;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 50;
} | {
    readonly name: "phaserDepth";
    readonly min: 0;
    readonly max: 1000;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
} | {
    readonly name: "noiseAmount";
    readonly min: 0;
    readonly max: 500;
    readonly step: 1;
    readonly type: "range";
    readonly defaultValue: 0;
})[];

type Sound = Record<(typeof FIELDS)[number]['name'], number>;

declare const playSound: (partialSound: Partial<Sound>, audioContext: BaseAudioContext, destination: AudioNode) => Promise<void>;

declare const getSoundFromUrl: (url: URL) => Sound;
declare const getUrlFromSound: (fx: Sound, currentUrl?: URL) => URL;

declare class Random {
    #private;
    seed: number;
    constructor(seed?: number);
    number(min?: number, max?: number): number;
    boolean(trueProbability?: number): boolean;
    fromArray<T>(array: T[]): T;
}

type SoundTemplate = (random: Random) => Partial<Sound>;
declare const getSoundFromTemplate: (template: SoundTemplate, seed?: number) => Sound;
declare const TEMPLATES: {
    readonly default: () => {};
    readonly pickup: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta?: number | undefined;
        pitchDuration?: number | undefined;
        pitchDelay?: number | undefined;
    };
    readonly laser: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
    };
    readonly jump: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
    };
    readonly fall: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
        vibratoRate: number;
        vibratoDepth: number;
        tremoloRate: number;
        tremoloDepth: number;
    };
    readonly powerup: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
        vibratoRate: number;
        vibratoDepth: number;
    };
    readonly fart: (rand: Random) => {
        waveForm: number;
        sustainPunch: number;
        sustainTime: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
        vibratoRate: number;
        vibratoDepth: number;
        tremoloRate: number;
        tremoloDepth: number;
        lowPassCutoff: number;
        lowPassResonance: number;
    };
    readonly random: (rand: Random) => {
        waveForm: number;
        attackTime: number;
        sustainTime: number;
        sustainPunch: number;
        decayTime: number;
        frequency: number;
        pitchDelta: number;
        pitchDuration: number;
        pitchDelay: number;
        vibratoRate: number;
        vibratoDepth: number;
        tremoloRate: number;
        tremoloDepth: number;
        highPassCutoff: number;
        highPassResonance: number;
        lowPassCutoff: number;
        lowPassResonance: number;
        phaserBaseFrequency: number;
        phaserLfoFrequency: number;
        phaserDepth: number;
        noiseAmount: number;
    };
};

export { FIELDS, SOUND_SETTINGS, type Sound, type SoundTemplate, TEMPLATES, getSoundFromTemplate, getSoundFromUrl, getUrlFromSound, playSound };
