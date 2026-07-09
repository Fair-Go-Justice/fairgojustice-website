// Upgraded DJ Composer: Adds One-Shot FX Synths, Sample Speed Scaling, and Pattern Variations

// 1. Preset Configurations with Pattern Variations (Pattern A, B, and C)
const PRESETS = {
  'doc-industrial': {
    bpm: 178,
    dist: 85,
    sub: 90,
    clang: 75,
    vocals: 'robotic-monotone',
    scratch: 'battle-transform',
    fx: ['fx-alarms', 'fx-hydraulic', 'fx-acid', 'fx-bitcrushed', 'fx-gated'],
    slogan: 'Check the Chain',
    story: `Paper clean but the truth runs rough.
One bad line can be enough.
One wrong label, whole thing bends.
One shut door and the story ends.
No blind trust in a stamped-out claim.
No free pass for a borrowed name.
If it stands, let it stand revealed.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      },
      patternB: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1], // Drum fill ending
        sub:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        sample: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0], // Syncopated hardcore stomp
        sub:   [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        clang: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
      }
    }
  },
  'uptempo-weapon': {
    bpm: 182,
    dist: 95,
    sub: 80,
    clang: 60,
    vocals: 'shouted-gang',
    scratch: 'heavy-quantized',
    fx: ['fx-hydraulic', 'fx-bitcrushed', 'fx-gated', 'fx-floor'],
    slogan: 'Wrong Outcome',
    story: `Wrong classification, wrong outcome.
Call it contract, call it lies.
Same hard hours, same hard load.
Different word on a broken code.
Shift the wording, shift the blame.
Still the worker, different name.
One wrong box and the whole week's done.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Double-time gated wall
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1], // Machine-gun stutter kick
        sub:   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        clang: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0], // Offbeat rawstyle bounce
        sub:   [0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'schranz-techno': {
    bpm: 160,
    dist: 90,
    sub: 70,
    clang: 85,
    vocals: 'female-hardtechno',
    scratch: 'battle-transform',
    fx: ['fx-hydraulic', 'fx-acid', 'fx-gated'],
    slogan: 'Warehouse Override',
    story: `Check the date. Check the code.
Force is rising. Steel is cold.
We don't stop. We don't bend.
Warehouse rhythm to the end.
Run the file. Clear the lane.
Feel the machine. Audit pain.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        clang: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        sub:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        clang: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Full schranz rush
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Hard techno gallop
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        clang: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'acidcore-ebm': {
    bpm: 145,
    dist: 75,
    sub: 85,
    clang: 50,
    vocals: 'robotic-monotone',
    scratch: 'low-impact',
    fx: ['fx-acid', 'fx-gated', 'fx-floor'],
    slogan: 'Analog Surge',
    story: `Null state. Noise wall.
Machine commands. Shadows fall.
Frequency sweep. Bass line cuts.
Locked in cage. Code in ruts.
Analog override. Rise and stand.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0], // EBM Bass sequence
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0], // Driving straight EBM
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // Minimal synth beats
        sub:   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'pub-rock': {
    bpm: 136,
    dist: 35,
    sub: 40,
    clang: 20,
    vocals: 'pub-grit',
    scratch: 'none',
    fx: ['fx-gated'],
    slogan: 'Lucky Country? Not for me',
    story: `Boots on concrete, crack of dawn.
Kettle's hissin', old hi-vis on.
Servo coffee, pie in hand.
Same busted back buildin' this land.
M1, M5, rain or shine.
Lucky country? Not for me.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Driving straight rock bass
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare on 2 and 4
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], // Syncopated pub beat
        sub:   [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1], // Double time fill finish
        sub:   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'aussie-hiphop': {
    bpm: 90,
    dist: 65,
    sub: 80,
    clang: 45,
    vocals: 'aussie-grit',
    scratch: 'battle-transform',
    fx: ['fx-bitcrushed', 'fx-gated'],
    slogan: 'Audit the Power',
    story: `West side. Toll side. Worksite.
Same road, same debt.
Different bloke, same threat.
Run that.
Missus doin' sums at midnight.
Under tollgate lights I fade.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0], // Boom-bap beats
        sub:   [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // snare 2 and 4
        sample: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0]
      },
      patternB: {
        kick:  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        sub:   [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1], // Double snare snap
        sample: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1] // dense chops
      },
      patternC: {
        kick:  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        sub:   [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'breakcore-dnb': {
    bpm: 172,
    dist: 80,
    sub: 95,
    clang: 60,
    vocals: 'shouted-gang',
    scratch: 'heavy-quantized',
    fx: ['fx-bitcrushed', 'fx-gated', 'fx-floor'],
    slogan: 'Break the Sequence',
    story: `No control. Break the beat.
Running fast. Busted feet.
Data glitch. System crack.
Iron core. No way back.
Crash the clock. Cut the thread.
Iron ground. Code is red.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        sub:   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        clang: [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1], // Chopped break
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        sub:   [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        clang: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Solid DnB Amen ride
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        clang: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1], // Glitchy breakcore cuts
        sample: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
      }
    }
  },
  'synthwave': {
    bpm: 115,
    dist: 40,
    sub: 60,
    clang: 30,
    vocals: 'synthwave-vocoder',
    scratch: 'none',
    fx: ['fx-gated'],
    slogan: 'Midnight Grid Run',
    story: `Neon lights in the dark.
Outrun the horizon sweep.
Fading skyline. Chrome arcade.
Lost in waves. Cyber sleep.
Drive forever. Sunset red.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Driving 8th bass
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare on 2 and 4
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        sub:   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0], // Outrun syncopated beats
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        clang: [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  'warehouse-bounce': {
    styleProfile: 'warehouse-bounce',
    promptLabel: 'warehouse bounce / industrial hard dance',
    bpm: 156,
    dist: 76,
    sub: 82,
    clang: 58,
    vocals: 'female-hardtechno',
    scratch: 'battle-transform',
    fx: ['fx-alarms', 'fx-acid', 'fx-gated'],
    slogan: 'Bounce the Siren',
    story: `Strobe burns white. Kick stays mean.
Hands up high in the warehouse steam.
Sirens bend then the low-end hits.
Cold steel sweat and the room commits.
No soft hands. No slow comedown.
Drive that bounce till the lights fall down.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
      },
      patternB: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1],
        clang: [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0],
        sub:   [0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        clang: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
      }
    }
  },
  'hakken-korps': {
    styleProfile: 'makina-korps',
    promptLabel: 'Spanish makina / millennium hardcore / poky rave',
    bpm: 175,
    dist: 82,
    sub: 78,
    clang: 48,
    vocals: 'female-hardtechno',
    scratch: 'heavy-quantized',
    fx: ['fx-alarms', 'fx-acid', 'fx-gated', 'fx-floor'],
    slogan: 'Millennium Pressure',
    story: `Red lights blink and the rave goes sharp.
Makina pulse with a cold dark heart.
Poky kicks snap while the sirens bend.
Euro synth rush till the ceiling sweats.
Fast hands up when the drop cuts through.
Millennium pressure and the whole room moves.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        clang: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
      },
      patternB: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        sub:   [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
        clang: [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
        sample: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
        sub:   [0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        clang: [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1],
        sample: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
      }
    }
  },
  'northern-bounce': {
    styleProfile: 'northern-bounce',
    promptLabel: 'UK bounce / happy hardcore / donk club',
    bpm: 150,
    dist: 60,
    sub: 74,
    clang: 32,
    vocals: 'mc-hype',
    scratch: 'heavy-quantized',
    fx: ['fx-gated'],
    slogan: 'Bounce All Night',
    story: `Hands in the air when the donk comes round.
Old school rush in a bright club sound.
Big rave smile and a cheeky rewind.
Kick goes springy and the hook locks tight.
Sing it back when the lights go white.
Bounce all night till the morning arrives.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]
      },
      patternB: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        sub:   [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
        sample: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
        sub:   [0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        clang: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        sample: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
      }
    }
  },
  'donk-queen-rave': {
    styleProfile: 'donk-queen-rave',
    promptLabel: 'multi-genre donk rave / trance-lift bounce',
    bpm: 153,
    dist: 68,
    sub: 88,
    clang: 44,
    vocals: 'mc-hype',
    scratch: 'heavy-quantized',
    fx: ['fx-gated', 'fx-floor', 'fx-bitcrushed'],
    slogan: 'Donk Queen Lift Off',
    story: `Donk queen pressure on a laser line.
Trance lights bloom when the bass aligns.
Rave kids jump on the switch-up cue.
One more rewind and the room breaks loose.
Hard bounce heart with a jungle tease.
Lift that drop and bring the whole place with me.`,
    patterns: {
      patternA: {
        kick:  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        sub:   [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        clang: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        sample: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]
      },
      patternB: {
        kick:  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        sub:   [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
        clang: [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
        sample: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0]
      },
      patternC: {
        kick:  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
        sub:   [0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        clang: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        sample: [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1]
      }
    }
  }
};

// Classics song dictionary for AI Re-writer Loader
const CLASSIC_SONGS = {
  'elvis': {
    title: 'Hound Dog',
    slogan: 'Hound Dog Collector',
    lyrics: `You ain't nothin' but a hound dog
Cryin' all the time
You ain't nothin' but a hound dog
Cryin' all the time
Well, you ain't never caught a rabbit
And you ain't no friend of mine

They said you was high-class
Well, that was just a lie
Yeah, they said you was high-class
Well, that was just a lie
Well, you ain't never caught a rabbit
And you ain't no friend of mine`
  },
  'beachboys': {
    title: 'Surfin USA',
    slogan: 'Graftin USA',
    lyrics: `If everybody had an ocean
Across the U.S.A.
Then everybody'd be surfin'
Like Californi-a
You'd see 'em wearing their baggies
Huarache sandals too
A bushy bushy blonde hairdo
Surfin' U.S.A.

We'll all be planning out a route
We're gonna take real soon
We're waxing down our surfboards
We can't wait for June`
  },
  'johnnycash': {
    title: 'Ring of Fire',
    slogan: 'Ring of Taxes',
    lyrics: `Love is a burnin' thing
And it makes a fiery ring
Bound by wild desire
I fell into a ring of fire

I fell into a burnin' ring of fire
I went down, down, down
And the flames went higher
And it burns, burns, burns
The ring of fire, the ring of fire`
  },
  'sinatra': {
    title: 'My Way',
    slogan: 'The Workers Way',
    lyrics: `And now, the end is near
And so I face the final curtain
My friend, I'll say it clear
I'll state my case, of which I'm certain
I've lived a life that's full
I traveled each and every highway
And more, much more than this
I did it my way`
  }
};


// ─────────────────────────────────────────────────────────────────────────────
// JUSTICE LYRIC ENGINE — Theme + Audience data
// Core framing: "AI should verify power — not replace justice"
// ─────────────────────────────────────────────────────────────────────────────
const JUSTICE_THEMES = {
  'ai-auditor': {
    name: 'AI as Independent Auditor',
    slogan: 'If the machine decides your fate — audit the code before it's too late.',
    keywords: ['AI verification', 'citation checking', 'document consistency', 'explainable AI', 'audit trail'],
    description: 'AI-assisted evidence verification, citation checking, anomaly detection, and administrative decision auditing.',
    hooks: ['AI should audit — not replace.', 'Check the code before it decides your fate.', 'Verify every link in the chain.', 'Explainable AI. Accountable systems.', '73 fake citations. Nobody caught it.'],
    lyric: `Ch-check the citation. Check the source.
Sy-system can't run its own remorse.
Au-audit the logic. Audit the chain.
Ve-verify before you stamp it — verify again.
AI should audit — not replace.
Ve-verify the evidence in its place.
If the machine decides your fate
ch-check the code before it's too late.
Au-audit the power. Verify the call.
No unverified system stands for us all.`
  },
  'wrong-classification': {
    name: 'Wrong Classification — Wrong Outcome',
    slogan: 'One wrong label. Years of unnecessary litigation.',
    keywords: ['contractor vs employee', 'procedural misclassification', 'tribunal error', 'classification dispute'],
    description: 'When the wrong category is applied, the wrong outcome follows. Systems must classify accurately.',
    hooks: ['One wrong label. Years of lost rights.', 'Wrong box ticked — your case collapses.', 'Classify correctly or correct the outcome.', 'Contractor or employee — the law must know.', 'Misclassification is not a mistake. It is a policy.'],
    lyric: `Wr-wrong classification, wrong outcome.
Same hours, same load — different run.
Call it contract, call it free —
still the worker. Still the fee.
Ch-check the label on the form they filed.
Wr-wrong box ticked — your rights exiled.
One wrong word and the whole case bends.
Wr-wrong classification — justice ends.
Sy-system should verify before it seals.
Wrong outcome — is exactly what it feels.`
  },
  'access-to-justice': {
    name: 'Access to Justice',
    slogan: 'Justice shouldn't depend on who can afford lawyers.',
    keywords: ['self-represented litigants', 'legal aid', 'procedural complexity', 'digital justice', 'AI legal assistance'],
    description: 'SRL surge, legal aid shortages, procedural walls. Access should not depend on ability to pay.',
    hooks: ['Justice should not cost what most people earn.', 'SRLs are not anomalies — they are the system now.', 'Legal aid cut. Access cut. Justice cut.', 'Nobody showed them the procedure.', 'The form was designed for lawyers. Not for you.'],
    lyric: `No-one showed you how to write the brief.
No-one warned you of the legal grief.
Sy-system runs in circles, walls of code.
Self-represented — walking a landmine road.
Every form a trap. Every step a cost.
Ac-access to justice — or just access lost?
Ve-verify the process, verify the right.
Ju-justice shouldn't need a lawyer's light.
Sy-systems built for those who know the floor.
The rest of us just knock on every door.`
  },
  'evidence-integrity': {
    name: 'Evidence Integrity',
    slogan: 'If the evidence bends, the verdict's unsound.',
    keywords: ['chain of custody', 'metadata', 'document authenticity', 'digital evidence', 'duplicate detection'],
    description: 'Chain of custody, metadata, document authenticity. AI can verify what humans miss.',
    hooks: ['Chain of custody. Who held the link?', 'Metadata never lies. People do.', 'Verify the timestamp. Verify the source.', 'Document tampering leaves a trace.', 'AI sees the anomaly a human glosses over.'],
    lyric: `Ch-chain of custody — who held the link?
Me-metadata tells you more than you think.
Document comparison. Duplicate scan.
Au-audit the evidence — catch what they can.
Timestamp your actions. Ve-verify the source.
Truth needs a traceable, verifiable course.
If the evidence bends — the verdict's unsound.
Ch-check the chain. Let the truth be found.
Re-records don't lie — but they can be lost.
Ve-verify the chain — or justice pays the cost.`
  },
  'public-confidence': {
    name: 'Public Confidence',
    slogan: 'Trust grows when decisions can be independently checked.',
    keywords: ['judicial transparency', 'accountability', 'explainable decision making', 'OECD integrity', 'public trust'],
    description: 'Declining trust, transparency reforms, explainable decisions. Better auditing builds stronger institutions.',
    hooks: ['Australia: 26% judicial integrity. OECD average: 66%.', 'Trust is built through transparency — not assurances.', 'Explainable decisions rebuild public confidence.', 'If it cannot be audited, it cannot be trusted.', 'Power unchecked is power abused.'],
    lyric: `Tr-trust in the system is breaking apart.
Tr-transparency starts — or it falls from the heart.
Twenty-six percent on a global scale.
Ju-judicial integrity — how does it fail?
Be-better auditing builds better ground.
Ve-verify the verdict — let it be sound.
If the court can't be checked — the ruling's not clean.
Tr-transparency — say what the system should mean.
De-decisions should be traceable, re-viewable, and tested.
Pu-public confidence only grows when power's contested.`
  }
};

const JUSTICE_AUDIENCES = {
  'workers': {
    name: 'Workers',
    tagline: 'One wrong classification can change a family's future.',
    tone: 'defiant, grounded, physical labour imagery, class-conscious'
  },
  'small-business': {
    name: 'Small Business',
    tagline: 'Fair rules require accurate decisions.',
    tone: 'practical, economic impact, compliance frustration, small operator perspective'
  },
  'srl': {
    name: 'Self-Represented Litigants',
    tagline: 'Justice shouldn't depend on who can afford lawyers.',
    tone: 'procedural anxiety, isolation, paperwork walls, determined survivor energy'
  },
  'tech': {
    name: 'Technology Community',
    tagline: 'AI should verify evidence — not replace human judgment.',
    tone: 'technical precision, systems-thinking, responsible AI, explainability framing'
  },
  'public-integrity': {
    name: 'Public Integrity',
    tagline: 'Better auditing builds stronger institutions.',
    tone: 'institutional reform, accountability, civic responsibility, systemic lens'
  }
};

// 2. Audio Engine (Web Audio API Sequencer, Sampler & Synth FX Pads)
class IndustrialDJComposer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.bpm = 178;
    this.kickDistortion = 85;
    this.subRumble = 90;
    this.clangLevel = 75;
    
    // Step Sequencer Variables
    this.currentStep = 0;
    this.nextStepTime = 0.0;
    this.timerId = null;
    this.lookahead = 20.0; // ms
    this.scheduleAheadTime = 0.08; // sec
    
    // Matrix data (4 tracks, 16 steps each)
    this.grid = {
      kick:  new Array(16).fill(0),
      sub:   new Array(16).fill(0),
      clang: new Array(16).fill(0),
      sample: new Array(16).fill(0)
    };
    
    // Microphone Recording Variables
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.recordedSampleBuffer = null;
    this.isRecording = false;
    this.samplePlaybackRate = 1.0; // Speed control for mic sampler

    // Output visual analyzer
    this.analyser = null;
    this.visualQueue = []; // synchronization queue for UI active steps
  }

  init() {
    if (this.audioCtx) return;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.connect(this.audioCtx.destination);
  }

  start(bpm, dist, sub, clang) {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    this.bpm = bpm;
    this.kickDistortion = dist;
    this.subRumble = sub;
    this.clangLevel = clang;
    
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextStepTime = this.audioCtx.currentTime;
    this.visualQueue = [];
    this.scheduler();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timerId);
  }

  setParams(bpm, dist, sub, clang) {
    this.bpm = bpm;
    this.kickDistortion = dist;
    this.subRumble = sub;
    this.clangLevel = clang;
  }

  scheduler() {
    while (this.nextStepTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      
      // Store visual synchronization data
      this.visualQueue.push({ step: this.currentStep, time: this.nextStepTime });
      
      // Advance to next step (16th notes)
      const secondsPerBeat = 60.0 / this.bpm;
      const stepDuration = secondsPerBeat / 4.0; // 16th note division
      this.nextStepTime += stepDuration;
      
      this.currentStep = (this.currentStep + 1) % 16;
    }
    this.timerId = setTimeout(() => this.scheduler(), this.lookahead);
  }

  scheduleStep(step, time) {
    if (this.grid.kick[step]) {
      this.playKickNode(time);
    }
    if (this.grid.sub[step]) {
      this.playSubBassNode(time);
    }
    if (this.grid.clang[step]) {
      this.playClangNode(time);
    }
    if (this.grid.sample[step]) {
      this.playCustomSampleNode(time);
    }
  }

  // --- KICK SYNTH NODE ---
  playKickNode(time) {
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const waveShaper = this.audioCtx.createWaveShaper();
    
    osc.type = 'sine';
    const pitchStart = this.bpm > 140 ? 190 : 140;
    osc.frequency.setValueAtTime(pitchStart, time);
    osc.frequency.exponentialRampToValueAtTime(41, time + 0.08);
    
    const decay = (60.0 / this.bpm) * 0.45;
    gainNode.gain.setValueAtTime(1.0, time);
    gainNode.gain.linearRampToValueAtTime(0.2, time + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + decay);
    
    const drive = (this.kickDistortion / 100) * 110 + 5;
    waveShaper.curve = this.makeDistortionCurve(drive);
    waveShaper.oversample = '4x';
    
    const masterVol = this.audioCtx.createGain();
    masterVol.gain.value = 0.55;
    
    osc.connect(gainNode);
    gainNode.connect(waveShaper);
    waveShaper.connect(masterVol);
    masterVol.connect(this.analyser);
    
    osc.start(time);
    osc.stop(time + decay * 1.2);
  }

  // --- SUB BASS NODE ---
  playSubBassNode(time) {
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(45, time);
    
    const decay = (60.0 / this.bpm) * 0.6;
    
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime((this.subRumble / 100) * 0.45, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + decay);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(90, time);
    
    osc.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(this.analyser);
    
    osc.start(time);
    osc.stop(time + decay * 1.1);
  }

  // --- METALLIC CLANG NODE ---
  playClangNode(time) {
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(580, time);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.value = 5.0;
    
    const decay = 0.07;
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime((this.clangLevel / 100) * 0.18, time + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + decay);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.analyser);
    
    osc.start(time);
    osc.stop(time + decay * 1.2);
  }

  // --- CUSTOM MICROPHONE PLAYBACK ---
  playCustomSampleNode(time) {
    if (!this.recordedSampleBuffer) return;
    
    const sampleSource = this.audioCtx.createBufferSource();
    const gainNode = this.audioCtx.createGain();
    
    sampleSource.buffer = this.recordedSampleBuffer;
    
    // Scale playback speed & pitch based on sampler slider value
    sampleSource.playbackRate.setValueAtTime(this.samplePlaybackRate, time);
    
    gainNode.gain.value = 0.75;
    
    sampleSource.connect(gainNode);
    gainNode.connect(this.analyser);
    
    sampleSource.start(time);
  }

  // --- ONE SHOT FX SYNTHESIS ---
  triggerOneShotFX(fxType) {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    const time = this.audioCtx.currentTime;
    
    if (fxType === 'siren') {
      // 1. Pitched swept alarm oscillator
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, time);
      // Double pitch sweep rise and fall
      osc.frequency.linearRampToValueAtTime(1200, time + 0.18);
      osc.frequency.linearRampToValueAtTime(380, time + 0.35);
      osc.frequency.linearRampToValueAtTime(1000, time + 0.5);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.65);
      
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, time);
      filter.Q.value = 3;
      
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.35, time + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.65);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.analyser);
      
      osc.start(time);
      osc.stop(time + 0.7);
      
    } else if (fxType === 'acid') {
      // 2. Filtered resonant acid spike
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(70, time); // Low notes
      
      filter.type = 'lowpass';
      // Extremely high resonance for acid squelch
      filter.Q.value = 16.0;
      filter.frequency.setValueAtTime(3200, time);
      filter.frequency.exponentialRampToValueAtTime(150, time + 0.28);
      
      gainNode.gain.setValueAtTime(1.0, time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.analyser);
      
      osc.start(time);
      osc.stop(time + 0.32);
      
    } else if (fxType === 'snare') {
      // 3. White noise gated snare drum
      const bufferSize = this.audioCtx.sampleRate * 0.3; // 300ms buffer
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Populate buffer with random noise values
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, time);
      filter.Q.value = 2.0;
      
      const gainNode = this.audioCtx.createGain();
      // Gated amplitude shape (stays flat and cuts off instantly)
      gainNode.gain.setValueAtTime(0.5, time);
      gainNode.gain.setValueAtTime(0.48, time + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
      
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.analyser);
      
      noiseSource.start(time);
    }
  }

  // Real-time vinyl scratch synthesizer
  triggerScratch() {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    const time = this.audioCtx.currentTime;
    
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.linearRampToValueAtTime(800, time + 0.06);
    osc.frequency.linearRampToValueAtTime(140, time + 0.12);
    osc.frequency.linearRampToValueAtTime(600, time + 0.18);
    osc.frequency.exponentialRampToValueAtTime(70, time + 0.25);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, time);
    filter.frequency.exponentialRampToValueAtTime(1300, time + 0.07);
    filter.frequency.linearRampToValueAtTime(650, time + 0.18);
    filter.Q.value = 6;
    
    gainNode.gain.setValueAtTime(0.001, time);
    gainNode.gain.linearRampToValueAtTime(0.38, time + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.15, time + 0.08);
    gainNode.gain.linearRampToValueAtTime(0.32, time + 0.14);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.analyser);
    
    osc.start(time);
    osc.stop(time + 0.26);
  }

  makeDistortionCurve(amount) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // --- MEDIA RECORDER LOGIC (MIC SAMPLER) ---
  async startRecording(onStart, onStop, onError) {
    try {
      this.init();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        
        this.audioCtx.decodeAudioData(arrayBuffer, (decodedBuffer) => {
          this.recordedSampleBuffer = decodedBuffer;
          onStop(decodedBuffer.duration);
        }, (err) => {
          console.error("Decoding audio data failed", err);
          onError("Audio decoding failed. Try again.");
        });

        stream.getTracks().forEach(track => track.stop());
      };

      this.isRecording = true;
      this.mediaRecorder.start();
      onStart();
    } catch (err) {
      console.error("Mic access denied or unavailable", err);
      onError("Microphone error: Allow permissions or host on local server.");
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  playRecordedSample() {
    this.init();
    if (this.recordedSampleBuffer) {
      this.playCustomSampleNode(this.audioCtx.currentTime);
    }
  }
}

// 3. Main Dashboard Engine and LLM Client Connector
class AppController {
  constructor() {
    this.dj = new IndustrialDJComposer();
    this.currentPreset = 'doc-industrial';
    this.currentPatternType = 'patternA'; // Selected pattern index
    this.sampleSpeedLocked = false;
    this.visualizerId = null;
    this.activeFx = new Set();
    this.dom = {};
  }

  init() {
    this.cacheDOM();
    this.buildSequencerGridUI();
    this.bindEvents();
    this.loadSavedSampleSpeedState();
    
    // Set Default UI state based on startup preset
    this.applyPreset('doc-industrial');
    this.compileAll();
    this.loadCustomPresetsMenu();
  }

  cacheDOM() {
    this.dom = {
      bpmSlider: document.getElementById('param-bpm'),
      bpmVal: document.getElementById('bpm-val'),
      bpmHeader: document.getElementById('header-bpm-display'),
      distSlider: document.getElementById('param-dist'),
      distVal: document.getElementById('dist-val'),
      subSlider: document.getElementById('param-sub'),
      subVal: document.getElementById('sub-val'),
      clangSlider: document.getElementById('param-clang'),
      clangVal: document.getElementById('clang-val'),
      
      vocalsSelect: document.getElementById('param-vocals'),
      scratchesSelect: document.getElementById('param-scratches'),
      
      fxAlarms: document.getElementById('fx-alarms'),
      fxHydraulic: document.getElementById('fx-hydraulic'),
      fxAcid: document.getElementById('fx-acid'),
      fxBitcrushed: document.getElementById('fx-bitcrushed'),
      fxGated: document.getElementById('fx-gated'),
      fxFloor: document.getElementById('fx-floor'),
      
      sloganInput: document.getElementById('input-slogan'),
      storyInput: document.getElementById('input-story'),
      
      outputStyle: document.getElementById('output-style'),
      outputLyrics: document.getElementById('output-lyrics'),
      outputSunoTitle: document.getElementById('output-suno-title'),
      outputSunoNegative: document.getElementById('output-suno-negative'),
      outputSunoNotes: document.getElementById('output-suno-notes'),
      outputSunoPack: document.getElementById('output-suno-pack'),
      styleCharCount: document.getElementById('style-char-count'),
      
      presetChips: document.querySelectorAll('.preset-chip'),
      btnSeqToggle: document.getElementById('btn-seq-toggle'),
      btnSeqClear: document.getElementById('btn-seq-clear'),
      btnScratchTrigger: document.getElementById('btn-scratch-trigger'),
      canvas: document.getElementById('canvas-visualizer'),
      visualizerStatus: document.getElementById('visualizer-status'),
      
      // Mic elements
      btnRecordMic: document.getElementById('btn-record-mic'),
      btnStopRec: document.getElementById('btn-stop-rec'),
      btnPlaySample: document.getElementById('btn-play-sample'),
      samplerStatus: document.getElementById('sampler-status'),
      micPulsar: document.getElementById('mic-pulsar'),
      sampleSpeedSlider: document.getElementById('param-sample-speed'),
      sampleSpeedVal: document.getElementById('speed-val'),
      btnLockSpeed: document.getElementById('btn-lock-speed'),
      
      // API elements
      apiType: document.getElementById('api-type'),
      geminiKey: document.getElementById('gemini-key'),
      ollamaModel: document.getElementById('ollama-model'),
      llmStatus: document.getElementById('llm-status'),
      geminiWrapper: document.getElementById('gemini-key-wrapper'),
      ollamaWrapper: document.getElementById('ollama-model-wrapper'),
      btnAiRevamp: document.getElementById('btn-ai-revamp'),
      songBtns: document.querySelectorAll('.mini-chip-btn'),
      
      // Presets & Patterns
      customPresetName: document.getElementById('custom-preset-name'),
      btnSavePreset: document.getElementById('btn-save-preset'),
      savedPresetsList: document.getElementById('saved-presets-list'),
      patternSelect: document.getElementById('param-pattern'),
      appViewport: document.getElementById('app-viewport'),
      // SoundCloud Matcher elements
      scUrlInput: document.getElementById('sc-url-input'),
      scMatchBtn: document.getElementById('btn-sc-match'),
      scStatusTag: document.getElementById('sc-status-tag'),
      scResultArea: document.getElementById('sc-result-area'),
      scResultTrack: document.getElementById('sc-result-track'),
      scResultMeta: document.getElementById('sc-result-meta'),
      scApplyBtn: document.getElementById('btn-sc-apply'),
      // Justice Lyric Engine
      justiceTheme: document.getElementById('justice-theme'),
      justiceAudience: document.getElementById('justice-audience'),
      justiceGenre: document.getElementById('justice-genre'),
      btnJusticeGenerate: document.getElementById('btn-justice-generate'),
      justiceThemeSlogan: document.getElementById('justice-theme-slogan'),
      justiceStatusTag: document.getElementById('justice-status-tag'),
      justiceOutput: document.getElementById('justice-lyric-output'),
      justiceCopy: document.getElementById('btn-justice-copy'),
      justiceHookBank: document.getElementById('justice-hook-bank'),
    };
  }

  // Generates step buttons inside track rows
  buildSequencerGridUI() {
    const tracks = ['kick', 'sub', 'clang', 'sample'];
    tracks.forEach(track => {
      const row = document.querySelector(`.seq-track-row[data-track="${track}"] .step-buttons`);
      row.innerHTML = "";
      for (let i = 0; i < 16; i++) {
        const btn = document.createElement('button');
        btn.className = 'step-btn';
        if (i % 4 === 0) {
          btn.classList.add('beat-subdivision');
        }
        btn.setAttribute('data-step', i);
        
        btn.addEventListener('click', () => {
          const isActive = btn.classList.contains('active');
          if (isActive) {
            btn.classList.remove('active');
            this.dj.grid[track][i] = 0;
          } else {
            btn.classList.add('active');
            this.dj.grid[track][i] = 1;
          }
        });
        
        row.appendChild(btn);
      }
    });
  }

  bindEvents() {
    // Sliders
    this.dom.bpmSlider.addEventListener('input', (e) => {
      this.dom.bpmVal.textContent = e.target.value;
      this.dom.bpmHeader.textContent = e.target.value;
      this.syncDJParams();
      this.compileAll();
    });
    this.dom.distSlider.addEventListener('input', (e) => {
      this.dom.distVal.textContent = e.target.value + '%';
      this.syncDJParams();
      this.compileAll();
    });
    this.dom.subSlider.addEventListener('input', (e) => {
      this.dom.subVal.textContent = e.target.value + '%';
      this.syncDJParams();
      this.compileAll();
    });
    this.dom.clangSlider.addEventListener('input', (e) => {
      this.dom.clangVal.textContent = e.target.value + '%';
      this.syncDJParams();
      this.compileAll();
    });

    // Mic Sampler Playback Speed Control
    this.dom.sampleSpeedSlider.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      this.applySampleSpeed(speed);
    });
    this.dom.btnLockSpeed.addEventListener('click', () => this.toggleSampleSpeedLock());

    // Option selectors & inputs
    this.dom.vocalsSelect.addEventListener('change', () => this.compileAll());
    this.dom.scratchesSelect.addEventListener('change', () => this.compileAll());
    this.dom.sloganInput.addEventListener('input', () => this.compileAll());
    this.dom.storyInput.addEventListener('input', () => this.compileAll());
    // Justice Lyric Engine
    if (this.dom.justiceTheme) {
      this.dom.justiceTheme.addEventListener('change', () => this.updateJusticeThemePreview());
    }
    if (this.dom.justiceAudience) {
      this.dom.justiceAudience.addEventListener('change', () => this.updateJusticeThemePreview());
    }
    if (this.dom.btnJusticeGenerate) {
      this.dom.btnJusticeGenerate.addEventListener('click', () => this.generateJusticeLyric());
    }
    if (this.dom.justiceCopy) {
      this.dom.justiceCopy.addEventListener('click', () => {
        const text = this.dom.justiceOutput?.value || '';
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            this.dom.justiceCopy.textContent = '✅ COPIED';
            setTimeout(() => { this.dom.justiceCopy.innerHTML = '📋 COPY'; }, 2000);
          });
        }
      });
    }
    // Pre-populate slogan and hooks on load
    setTimeout(() => {
      this.updateJusticeThemePreview();
      this.populateHookBank();
    }, 100);
    
    // FX checkboxes
    const fxCheckboxes = [
      this.dom.fxAlarms, this.dom.fxHydraulic, this.dom.fxAcid,
      this.dom.fxBitcrushed, this.dom.fxGated, this.dom.fxFloor
    ];
    fxCheckboxes
      .filter(Boolean)
      .forEach(chk => chk.addEventListener('change', () => {
        this.syncFxStateFromDOM();
        this.compileAll();
      }));

    // Pattern dropdown switcher
    this.dom.patternSelect.addEventListener('change', (e) => {
      this.currentPatternType = e.target.value;
      this.applySequencerPatternOnly(this.currentPreset, this.currentPatternType);
    });

    // Preset Chips
    this.dom.presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.dom.presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const presetKey = chip.getAttribute('data-preset');
        this.applyPreset(presetKey);
        this.compileAll();
      });
    });

    // Sequencer Controls
    this.dom.btnSeqToggle.addEventListener('click', () => this.toggleSequencer());
    this.dom.btnSeqClear.addEventListener('click', () => this.clearSequencerGrid());
    
    // Scratch Pad
    this.dom.btnScratchTrigger.addEventListener('click', () => {
      this.dj.triggerScratch();
      this.flashCanvasGlow();
    });

    // Live One-Shot Sound FX Pads
    document.querySelectorAll('.btn-fx-pad[data-fx]').forEach(pad => {
      pad.addEventListener('click', () => {
        const fxType = pad.getAttribute('data-fx');
        this.dj.triggerOneShotFX(fxType);
        this.flashCanvasGlow();
      });
    });

    // Mic Sampler Recording Buttons
    this.dom.btnRecordMic.addEventListener('click', () => this.startMicRecording());
    this.dom.btnStopRec.addEventListener('click', () => this.stopMicRecording());
    this.dom.btnPlaySample.addEventListener('click', () => this.dj.playRecordedSample());

    // AI API Type Toggle Panels
    this.dom.apiType.addEventListener('change', (e) => {
      const type = e.target.value;
      if (type === 'gemini') {
        this.dom.geminiWrapper.style.display = 'block';
        this.dom.ollamaWrapper.style.display = 'none';
        this.dom.llmStatus.textContent = 'GEMINI SELECTED';
        this.dom.llmStatus.className = 'panel-tag status-online';
      } else if (type === 'ollama') {
        this.dom.geminiWrapper.style.display = 'none';
        this.dom.ollamaWrapper.style.display = 'block';
        this.dom.llmStatus.textContent = 'OLLAMA SELECTED';
        this.dom.llmStatus.className = 'panel-tag status-online';
      } else {
        this.dom.geminiWrapper.style.display = 'none';
        this.dom.ollamaWrapper.style.display = 'none';
        this.dom.llmStatus.textContent = 'LOCAL FALLBACK';
        this.dom.llmStatus.className = 'panel-tag status-offline';
      }
    });

    // Load Classic Songs Buttons
    this.dom.songBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const songKey = btn.getAttribute('data-song');
        this.loadClassicSongData(songKey);
      });
    });

    // Trigger AI Remaster
    this.dom.btnAiRevamp.addEventListener('click', () => this.triggerAIRewriteContent());

    // Copy to clipboard
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        targetEl.select();
        navigator.clipboard.writeText(targetEl.value).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '✅ COPIED!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 1500);
        });
      });
    });

    // SoundCloud Style Matcher
    if (this.dom.scMatchBtn) {
      this.dom.scMatchBtn.addEventListener('click', () => this.triggerSoundcloudMatch());
    }

    // Custom State Storage
    this.dom.btnSavePreset.addEventListener('click', () => this.saveCustomPresetState());
  }

  syncDJParams() {
    if (this.dj.isPlaying) {
      this.dj.setParams(
        parseInt(this.dom.bpmSlider.value),
        parseInt(this.dom.distSlider.value),
        parseInt(this.dom.subSlider.value),
        parseInt(this.dom.clangSlider.value)
      );
    }
  }

  getFxControlMap() {
    return {
      'fx-alarms': this.dom.fxAlarms,
      'fx-hydraulic': this.dom.fxHydraulic,
      'fx-acid': this.dom.fxAcid,
      'fx-bitcrushed': this.dom.fxBitcrushed,
      'fx-gated': this.dom.fxGated,
      'fx-floor': this.dom.fxFloor
    };
  }

  setFxStateFromList(fxList = []) {
    const next = new Set(Array.isArray(fxList) ? fxList : []);
    const controls = this.getFxControlMap();

    Object.entries(controls).forEach(([key, control]) => {
      if (control) {
        control.checked = next.has(key);
      }
    });

    this.activeFx = next;
  }

  syncFxStateFromDOM() {
    const controls = this.getFxControlMap();
    const next = new Set(this.activeFx);

    Object.entries(controls).forEach(([key, control]) => {
      if (!control) return;
      if (control.checked) next.add(key);
      else next.delete(key);
    });

    this.activeFx = next;
    return [...this.activeFx];
  }

  isFxEnabled(fxKey) {
    const control = this.getFxControlMap()[fxKey];
    if (control) return Boolean(control.checked);
    return this.activeFx.has(fxKey);
  }

  applySampleSpeed(speed, saveState = false) {
    const normalizedSpeed = Math.max(0.5, Math.min(2.0, parseFloat(speed) || 1.0));
    this.dj.samplePlaybackRate = normalizedSpeed;
    this.dom.sampleSpeedSlider.value = normalizedSpeed.toFixed(1);
    this.dom.sampleSpeedVal.textContent = normalizedSpeed.toFixed(1) + 'x';

    if (saveState) {
      this.persistSampleSpeedState();
    }
  }

  setSampleSpeedLockState(isLocked, saveState = false) {
    this.sampleSpeedLocked = Boolean(isLocked);
    this.dom.sampleSpeedSlider.disabled = this.sampleSpeedLocked;
    this.dom.sampleSpeedSlider.classList.toggle('locked', this.sampleSpeedLocked);
    this.dom.btnLockSpeed.classList.toggle('locked', this.sampleSpeedLocked);
    this.dom.btnLockSpeed.textContent = this.sampleSpeedLocked ? 'UNLOCK SPEED' : 'LOCK SPEED';
    this.dom.btnLockSpeed.title = this.sampleSpeedLocked
      ? 'Unlock sample speed for editing'
      : 'Lock current sample speed';

    if (saveState) {
      this.persistSampleSpeedState();
    }
  }

  toggleSampleSpeedLock() {
    this.setSampleSpeedLockState(!this.sampleSpeedLocked, true);
  }

  persistSampleSpeedState() {
    const speedState = {
      rate: parseFloat(this.dom.sampleSpeedSlider.value) || 1.0,
      locked: this.sampleSpeedLocked
    };
    localStorage.setItem('dj_sample_speed_state', JSON.stringify(speedState));
  }

  loadSavedSampleSpeedState() {
    const raw = localStorage.getItem('dj_sample_speed_state');
    if (!raw) {
      this.applySampleSpeed(1.0, false);
      this.setSampleSpeedLockState(false, false);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.applySampleSpeed(parsed.rate ?? 1.0, false);
      this.setSampleSpeedLockState(Boolean(parsed.locked), false);
    } catch (err) {
      console.warn('Failed to parse saved sample speed state', err);
      this.applySampleSpeed(1.0, false);
      this.setSampleSpeedLockState(false, false);
    }
  }


  // ─── SOUNDCLOUD STYLE MATCHER ───────────────────────────────────────────────

  // Preset BPM table for matching (key → centrepoint BPM)
  get _presetBpmMap() {
    return {
      'doc-industrial':  178,
      'uptempo-weapon':  182,
      'schranz-techno':  160,
      'warehouse-bounce':156,
      'hakken-korps':    175,
      'northern-bounce': 150,
      'donk-queen-rave': 153,
      'acidcore-ebm':    145,
      'pub-rock':        136,
      'aussie-hiphop':    90,
      'breakcore-dnb':   172,
      'synthwave':       115,
    };
  }

  /**
   * Fetch track metadata from SoundCloud oEmbed (no auth required).
   * Falls back to title-only heuristics when audio stream is unavailable.
   * To enable full BPM detection via audio: set SOUNDCLOUD_CLIENT_ID below.
   */
  async fetchSoundcloudOembed(url) {
    const oembed = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const resp = await fetch(oembed);
    if (!resp.ok) throw new Error(`SoundCloud returned ${resp.status}. Check the URL is a public track.`);
    const data = await resp.json();
    return {
      title: data.title || '',
      author: data.author_name || '',
      thumbnailUrl: data.thumbnail_url || ''
    };
  }

  /**
   * Score a preset key against a track title + tags (lower = better match).
   */
  scorePreset(presetKey, titleLower) {
    const keywordMap = {
      'doc-industrial':   ['industrial', 'hardcore', 'hard core', 'techno', 'gabber'],
      'uptempo-weapon':   ['uptempo', 'rawstyle', 'frenchcore', 'terror', 'speedcore'],
      'schranz-techno':   ['schranz', 'warehouse', 'dark techno', 'hard techno'],
      'warehouse-bounce': ['bounce', 'dark club', 'warehouse'],
      'hakken-korps':     ['hakken', 'makina', 'millennium', 'poky'],
      'northern-bounce':  ['donk', 'happy hardcore', 'uk bounce', 'northern'],
      'donk-queen-rave':  ['rave', 'trance', 'jungle', 'rewind', 'reload'],
      'acidcore-ebm':     ['acid', 'ebm', 'electro', 'industrial techno'],
      'pub-rock':         ['rock', 'pub', 'guitar', 'anthem', 'punk'],
      'aussie-hiphop':    ['hip hop', 'hiphop', 'rap', 'boom bap', 'grime'],
      'breakcore-dnb':    ['breakcore', 'drum and bass', 'dnb', 'amen', 'liquid'],
      'synthwave':        ['synthwave', 'outrun', 'retro', 'neon', 'cyberpunk'],
    };
    const keywords = keywordMap[presetKey] || [];
    let hits = 0;
    keywords.forEach(kw => { if (titleLower.includes(kw)) hits++; });
    return hits;
  }

  /**
   * Find the nearest preset by BPM proximity (±30 BPM tolerance).
   */
  matchPresetFromBPM(bpm) {
    const bpmMap = this._presetBpmMap;
    let best = null, bestDelta = Infinity;
    Object.entries(bpmMap).forEach(([key, centre]) => {
      const delta = Math.abs(bpm - centre);
      if (delta < bestDelta) { bestDelta = delta; best = key; }
    });
    return bestDelta <= 30 ? best : null;
  }

  /**
   * Find the best preset from keyword scoring against track title.
   */
  matchPresetFromTitle(title) {
    const lower = title.toLowerCase();
    let best = null, bestScore = 0;
    Object.keys(this._presetBpmMap).forEach(key => {
      const score = this.scorePreset(key, lower);
      if (score > bestScore) { bestScore = score; best = key; }
    });
    return best; // null if no keywords matched
  }

  /**
   * Main SoundCloud matcher flow.
   */
  async triggerSoundcloudMatch() {
    const url = (this.dom.scUrlInput?.value || '').trim();
    if (!url || !url.includes('soundcloud.com')) {
      this._scSetStatus('ERROR', 'error');
      this._scShowResult('Please paste a valid SoundCloud track URL.', '', null);
      return;
    }

    this._scSetStatus('FETCHING…', 'busy');
    this.dom.scResultArea.style.display = 'none';
    if (this.dom.scMatchBtn) this.dom.scMatchBtn.disabled = true;

    try {
      const meta = await this.fetchSoundcloudOembed(url);
      const titleLower = meta.title.toLowerCase();

      // ── Phase 1: keyword genre match ──────────────────────────────────────
      let matchedPreset = this.matchPresetFromTitle(meta.title);
      let method = 'Genre keywords';

      // ── Phase 2: BPM heuristic from title (e.g. "145bpm", "175 BPM") ─────
      if (!matchedPreset) {
        const bpmInTitle = titleLower.match(/\b(\d{2,3})\s*bpm\b/);
        if (bpmInTitle) {
          const parsedBpm = parseInt(bpmInTitle[1]);
          matchedPreset = this.matchPresetFromBPM(parsedBpm);
          if (matchedPreset) method = `BPM in title (${parsedBpm})`;
        }
      }

      // ── Phase 3: fallback — pick by BPM centrepoint closest to 150 ────────
      if (!matchedPreset) {
        matchedPreset = 'doc-industrial';
        method = 'Default fallback';
      }

      // ── OPTIONAL: if you have a SoundCloud client_id, set it here ─────────
      // const SOUNDCLOUD_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
      // If set, the full API can return accurate BPM & genre tags.
      // ──────────────────────────────────────────────────────────────────────

      const presetData = PRESETS[matchedPreset];
      const chipTitle = document.querySelector(`.preset-chip[data-preset="${matchedPreset}"] .chip-title`);
      const presetLabel = chipTitle?.textContent || matchedPreset;

      this._scSetStatus('MATCHED', 'match');
      this._scCurrentMatch = matchedPreset;

      const trackLine = `"${meta.title}"${meta.author ? ' · ' + meta.author : ''}`;
      const metaLine = `→ ${presetLabel} (${presetData?.bpm ?? '?'} BPM) · matched via ${method}`;
      this._scShowResult(trackLine, metaLine, matchedPreset);

    } catch (err) {
      this._scSetStatus('ERROR', 'error');
      this._scShowResult(`Could not fetch track: ${err.message}`, 'Try a different URL or check your connection.', null);
    } finally {
      if (this.dom.scMatchBtn) this.dom.scMatchBtn.disabled = false;
    }
  }

  _scSetStatus(label, state) {
    if (!this.dom.scStatusTag) return;
    this.dom.scStatusTag.textContent = label;
    this.dom.scStatusTag.className = 'panel-tag';
    if (state === 'match') this.dom.scStatusTag.classList.add('sc-tag-match');
    else if (state === 'error') this.dom.scStatusTag.classList.add('sc-tag-error');
    else if (state === 'busy') this.dom.scStatusTag.classList.add('sc-tag-busy');
    else this.dom.scStatusTag.classList.add('sc-tag-ready');
  }

  _scShowResult(trackLine, metaLine, matchedPreset) {
    if (!this.dom.scResultArea) return;
    this.dom.scResultTrack.textContent = trackLine;
    this.dom.scResultMeta.textContent = metaLine;
    this.dom.scApplyBtn.style.display = matchedPreset ? 'inline-block' : 'none';
    this._scCurrentMatch = matchedPreset;

    // Wire Apply button fresh each time
    const applyBtn = this.dom.scApplyBtn;
    const newBtn = applyBtn.cloneNode(true);
    applyBtn.parentNode.replaceChild(newBtn, applyBtn);
    this.dom.scApplyBtn = newBtn;

    if (matchedPreset) {
      newBtn.addEventListener('click', () => {
        // Activate the matching preset chip
        this.dom.presetChips.forEach(c => c.classList.remove('active'));
        const chip = document.querySelector(`.preset-chip[data-preset="${matchedPreset}"]`);
        if (chip) chip.classList.add('active');

        this.applyPreset(matchedPreset);
        this.compileAll();
        this._scSetStatus('APPLIED ✔', 'match');
        newBtn.textContent = '✔ APPLIED';
        newBtn.disabled = true;
        setTimeout(() => {
          newBtn.textContent = '✔ APPLY PRESET';
          newBtn.disabled = false;
        }, 2000);
      });
    }

    this.dom.scResultArea.style.display = 'block';
  }

  // ────────────────────────────────────────────────────────────────────────────


  applyPreset(presetKey) {
    this.currentPreset = presetKey;
    const data = PRESETS[presetKey];
    if (!data) return;

    this.dom.bpmSlider.value = data.bpm;
    this.dom.bpmVal.textContent = data.bpm;
    this.dom.bpmHeader.textContent = data.bpm;

    this.dom.distSlider.value = data.dist;
    this.dom.distVal.textContent = data.dist + '%';

    this.dom.subSlider.value = data.sub;
    this.dom.subVal.textContent = data.sub + '%';

    this.dom.clangSlider.value = data.clang;
    this.dom.clangVal.textContent = data.clang + '%';

    this.dom.vocalsSelect.value = data.vocals;
    this.dom.scratchesSelect.value = data.scratch;

    this.setFxStateFromList(data.fx);

    this.dom.sloganInput.value = data.slogan;
    this.dom.storyInput.value = data.story;

    // Apply grid pattern based on current pattern dropdown choice
    this.applySequencerPatternOnly(presetKey, this.currentPatternType);
    this.syncDJParams();
  }

  // Load beat pattern grid without changing slider parameters
  applySequencerPatternOnly(presetKey, patternKey) {
    const data = PRESETS[presetKey];
    if (!data || !data.patterns) return;
    
    const pattern = data.patterns[patternKey] || data.patterns.patternA;
    const tracks = ['kick', 'sub', 'clang', 'sample'];
    
    tracks.forEach(track => {
      const activeArray = pattern[track];
      for (let i = 0; i < 16; i++) {
        this.dj.grid[track][i] = activeArray[i];
        const btn = document.querySelector(`.seq-track-row[data-track="${track}"] .step-btn[data-step="${i}"]`);
        if (btn) {
          if (activeArray[i]) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      }
    });
  }

  // --- STEP SEQUENCER PLAYBACK CONTROL ---
  toggleSequencer() {
    if (this.dj.isPlaying) {
      this.dj.stop();
      this.dom.btnSeqToggle.innerHTML = '<span class="play-icon">▶</span> START SEQUENCER';
      this.dom.btnSeqToggle.classList.remove('playing');
      this.dom.visualizerStatus.textContent = 'MONITOR OFFLINE';
      
      // Clear step highlights
      document.querySelectorAll('.step-btn').forEach(btn => btn.classList.remove('playhead-active'));
      cancelAnimationFrame(this.visualizerId);
      this.visualizerId = null;
      this.clearCanvas();
    } else {
      const bpm = parseInt(this.dom.bpmSlider.value);
      const dist = parseInt(this.dom.distSlider.value);
      const sub = parseInt(this.dom.subSlider.value);
      const clang = parseInt(this.dom.clangSlider.value);
      
      this.dj.start(bpm, dist, sub, clang);
      this.dom.btnSeqToggle.innerHTML = '<span class="play-icon">⏹</span> STOP SEQUENCER';
      this.dom.btnSeqToggle.classList.add('playing');
      this.dom.visualizerStatus.textContent = 'MONITOR ACTIVE';
      this.drawVisualizer();
    }
  }

  clearSequencerGrid() {
    const tracks = ['kick', 'sub', 'clang', 'sample'];
    tracks.forEach(track => {
      this.dj.grid[track].fill(0);
      document.querySelectorAll(`.seq-track-row[data-track="${track}"] .step-btn`).forEach(btn => {
        btn.classList.remove('active');
      });
    });
  }

  // --- MIC SAMPLER INTERACTIONS ---
  startMicRecording() {
    this.dom.btnRecordMic.disabled = true;
    this.dom.btnRecordMic.classList.add('recording-active');
    this.dom.btnRecordMic.innerHTML = '🔴 REC...';
    this.dom.btnStopRec.disabled = false;
    this.dom.micPulsar.className = 'recording-indicator recording';
    this.dom.samplerStatus.textContent = 'MIC INCOMING';
    
    this.dj.startRecording(
      () => {},
      (duration) => {
        this.dom.btnRecordMic.disabled = false;
        this.dom.btnRecordMic.classList.remove('recording-active');
        this.dom.btnRecordMic.innerHTML = '🔴 REC';
        this.dom.btnStopRec.disabled = true;
        this.dom.btnPlaySample.disabled = false;
        
        this.dom.micPulsar.className = 'recording-indicator loaded';
        this.dom.samplerStatus.textContent = `LOADED (${duration.toFixed(1)}s)`;
      },
      (errMessage) => {
        this.dom.btnRecordMic.disabled = false;
        this.dom.btnRecordMic.classList.remove('recording-active');
        this.dom.btnRecordMic.innerHTML = '🔴 REC';
        this.dom.btnStopRec.disabled = true;
        
        this.dom.micPulsar.className = 'recording-indicator';
        this.dom.samplerStatus.textContent = 'REC ERROR';
        alert(errMessage);
      }
    );
  }

  stopMicRecording() {
    this.dj.stopRecording();
  }

  // --- CLASSIC SONG LOADER ---
  loadClassicSongData(songKey) {
    const song = CLASSIC_SONGS[songKey];
    if (!song) return;
    this.dom.sloganInput.value = song.slogan;
    this.dom.storyInput.value = song.lyrics;
    this.compileAll();
  }

  // ── JUSTICE LYRIC ENGINE METHODS ─────────────────────────────────────────

  updateJusticeThemePreview() {
    const themeKey = this.dom.justiceTheme?.value || 'ai-auditor';
    const audienceKey = this.dom.justiceAudience?.value || 'workers';
    const theme = JUSTICE_THEMES[themeKey];
    const audience = JUSTICE_AUDIENCES[audienceKey];
    if (this.dom.justiceThemeSlogan && theme) {
      this.dom.justiceThemeSlogan.textContent = theme.slogan;
    }
    if (this.dom.justiceStatusTag && audience) {
      this.dom.justiceStatusTag.textContent = audience.tagline;
    }
  }

  buildJusticeLyricPrompt(themeKey, audienceKey, genre) {
    const theme = JUSTICE_THEMES[themeKey] || JUSTICE_THEMES['ai-auditor'];
    const audience = JUSTICE_AUDIENCES[audienceKey] || JUSTICE_AUDIENCES['workers'];
    const preset = PRESETS[genre] || {};
    const bpm = preset.bpm || this.dj?.bpm || 175;
    const promptLabel = preset.promptLabel || genre || 'industrial hardcore';

    return `Generate original song lyrics for a ${promptLabel} electronic music track at ${bpm} BPM.

THEME: ${theme.name}
THEME DESCRIPTION: ${theme.description}
KEY CONCEPTS: ${theme.keywords.join(', ')}
CORE MESSAGE: "AI should verify power — not replace justice."

AUDIENCE: ${audience.name}
AUDIENCE FRAMING: ${audience.tagline}
TONE: ${audience.tone}

SONG STRUCTURE:
- Verse 1 (4 lines)
- Chorus (4 lines — punchy, repeatable hook)
- Verse 2 (4 lines — new angle on same theme)
- Outro hook (2 lines — campaign slogan energy)

LYRIC RULES:
1. Short lines, 4–8 syllables each — designed to hit on the beat
2. Vocal turntable stutter cues on key words: Au-audit, Ch-check, Ve-verify, Sy-system, Wr-wrong, Ju-justice, Tr-trust
3. Frame issues as systemic — no real names, no specific case numbers, no court identifiers
4. At least one line that works as a standalone campaign slogan
5. Defiant, emotionally resonant, public-interest tone
6. Australian context but internationally relatable

Output ONLY the raw lyric lines. No markdown headers, no section labels, no explanations.`;
  }

  async generateJusticeLyric() {
    const themeKey = this.dom.justiceTheme?.value || 'ai-auditor';
    const audienceKey = this.dom.justiceAudience?.value || 'workers';
    const genre = this.currentPreset;
    const api = this.dom.apiType?.value || 'fallback';

    const btn = this.dom.btnJusticeGenerate;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⚖️ GENERATING...';
    }

    if (this.dom.justiceStatusTag) {
      this.dom.justiceStatusTag.textContent = 'GENERATING...';
    }

    try {
      let result = '';

      if (api === 'gemini' && this.dom.geminiKey) {
        const apiKey = this.dom.geminiKey.value.trim();
        if (!apiKey) throw new Error('Gemini API key required. Paste your key above.');
        const prompt = this.buildJusticeLyricPrompt(themeKey, audienceKey, genre);
        result = await this.callGeminiAPI(apiKey, prompt);
      } else if (api === 'ollama') {
        const model = this.dom.ollamaModel?.value.trim() || 'gemma';
        const prompt = this.buildJusticeLyricPrompt(themeKey, audienceKey, genre);
        result = await this.callOllamaAPI(model, prompt);
      } else {
        result = this.localJusticeFallback(themeKey, audienceKey);
      }

      if (this.dom.justiceOutput) {
        this.dom.justiceOutput.value = result;
      }
      // Also populate the main story field for Suno pack generation
      if (this.dom.storyInput) {
        this.dom.storyInput.value = result;
      }
      if (this.dom.sloganInput) {
        const theme = JUSTICE_THEMES[themeKey];
        this.dom.sloganInput.value = theme?.keywords?.[0] || 'Audit the System';
      }
      this.populateHookBank(themeKey);
      this.compileAll();
    } catch (err) {
      alert(`Justice Lyric Generation Failed: ${err.message}`);
      if (this.dom.justiceStatusTag) this.dom.justiceStatusTag.textContent = 'ERROR';
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '⚖️ GENERATE JUSTICE LYRIC';
      }
    }
  }

  localJusticeFallback(themeKey, audienceKey) {
    const theme = JUSTICE_THEMES[themeKey] || JUSTICE_THEMES['ai-auditor'];
    const audience = JUSTICE_AUDIENCES[audienceKey] || JUSTICE_AUDIENCES['workers'];

    // Tone adapter: add audience-specific opener
    const openers = {
      'workers': '// For every worker misclassified — this one's for you.',
      'small-business': '// For every operator buried under the wrong rules.',
      'srl': '// For every person who had to face the court alone.',
      'tech': '// For the engineers who know AI can do better than this.',
      'public-integrity': '// For every institution that forgot who it serves.'
    };

    const opener = openers[audienceKey] || '';
    const baseLyric = theme.lyric;

    return (opener ? opener + '\n\n' : '') + baseLyric;
  }


  populateHookBank(themeKey = null) {
    const container = this.dom.justiceHookBank;
    if (!container) return;
    const key = themeKey || this.dom.justiceTheme?.value || 'ai-auditor';
    const theme = JUSTICE_THEMES[key];
    if (!theme?.hooks) return;
    container.innerHTML = '';
    theme.hooks.forEach(hook => {
      const chip = document.createElement('span');
      chip.className = 'justice-hook-chip';
      chip.textContent = hook;
      chip.addEventListener('click', () => {
        if (this.dom.justiceOutput) {
          const current = this.dom.justiceOutput.value;
          this.dom.justiceOutput.value = current
            ? current + '\n\n' + hook
            : hook;
        }
        if (this.dom.storyInput) {
          const current = this.dom.storyInput.value;
          this.dom.storyInput.value = current
            ? current + '\n\n' + hook
            : hook;
        }
      });
      container.appendChild(chip);
    });
  }

  // ── END JUSTICE LYRIC ENGINE ────────────────────────────────────────────────

    buildAIRewritePrompt(genre, story) {
    const preset = PRESETS[genre] || {};
    const styleProfile = preset.styleProfile || '';
    const promptLabel = preset.promptLabel || genre;

    if (styleProfile === 'warehouse-bounce') {
      return `
Rewrite the following song lyrics for a ${promptLabel} track.
Guidelines:
1. Keep the original song's central theme recognizable, but move the imagery into a dark warehouse with strobes, sirens, pressure, sweat, and late-night club energy.
2. Write in short, punchy lines with repeated hooks, DJ cut points, and forceful phrases that hit on the beat.
3. Add selective vocal stutters on key phrases and brief call-and-response fragments.
4. Keep it physical, tense, and dancefloor-focused without copying any living artist's exact phrasing.

Output ONLY the rewritten raw lyric lines. Do not add markdown headers.

Original Lyrics:
${story}
`;
    }

    if (styleProfile === 'makina-korps') {
      return `
Rewrite the following song lyrics for a ${promptLabel} track.
Guidelines:
1. Keep the original song's core theme recognizable, but reshape it into a dark Euro rave lyric with Spanish makina and millennium hardcore energy.
2. Favor short, fast lines, pressure phrases, session-style hook repetition, and phrases that feel strong over bright rave leads and hard kicks.
3. Add selective vocal stutters, cut-up phrases, and a few dramatic late-rave tension cues.
4. Keep it aggressive, melodic, and club-focused without copying any living artist's exact phrasing.

Output ONLY the rewritten raw lyric lines. Do not add markdown headers.

Original Lyrics:
${story}
`;
    }

    if (styleProfile === 'northern-bounce') {
      return `
Rewrite the following song lyrics for a ${promptLabel} track.
Guidelines:
1. Keep the original song's theme recognizable, but turn it into a cheeky hands-in-the-air rave lyric with UK bounce, donk energy, and crowd-lift momentum.
2. Favor bright, chantable lines, repeated hook phrases, sing-back moments, and playful MC cues.
3. Add selective vocal stutters and quick reload-style hype phrases where they help the groove.
4. Keep it uplifting, clubby, and fast-moving without copying any living artist's exact phrasing.

Output ONLY the rewritten raw lyric lines. Do not add markdown headers.

Original Lyrics:
${story}
`;
    }

    if (styleProfile === 'donk-queen-rave') {
      return `
Rewrite the following song lyrics for a ${promptLabel} track.
Guidelines:
1. Keep the original song's theme recognizable, but reshape it into a donk-driven rave lyric with bounce, trance lift, and quick switch-up energy.
2. Use short chant lines, rave hook repetition, MC-style crowd cues, and phrases that feel strong over a big donk bassline.
3. Add selective vocal stutters and a few hype moments that could set up rewinds or genre switch sections.
4. Keep it playful, hectic, and euphoric without copying any living artist's exact phrasing.

Output ONLY the rewritten raw lyric lines. Do not add markdown headers.

Original Lyrics:
${story}
`;
    }

    return `
Rewrite the following song lyrics to match the musical subgenre: "${promptLabel}".
Guidelines:
1. Maintain the broad structure and recognizable theme of the original song, but reshape the vocabulary around Australian public-interest justice themes: worker misclassification, evidence integrity, access to justice, AI verification, administrative accountability.
2. Infuse percussive language and short command lines suitable for an electronic track with strong beats.
3. Automatically insert vocal turntable stutters on key justice terms (e.g. "Au-audit", "Wr-wrong", "Ch-check", "Ve-verify", "Sy-system", "Tr-trust", "Ju-justice").
4. Maintain a gritty, defiant, public-interest tone — frame issues as systemic, not personal. No real names, no specific case numbers.
5. Frame around the core message: "AI should verify power — not replace justice."
6. Include at least one line that could serve as a campaign hook or slogan.

Output ONLY the rewritten raw lyric lines. Do not add markdown headers.

Original Lyrics:
${story}
`;
  }

  // --- AI RE-WRITER CALL CLIENT ---
  async triggerAIRewriteContent() {
    const api = this.dom.apiType.value;
    const slogan = this.dom.sloganInput.value.trim();
    const story = this.dom.storyInput.value.trim();
    const genre = this.currentPreset;

    if (!story) {
      alert("Please load a classic song or enter text in the lyrics box first.");
      return;
    }

    this.dom.btnAiRevamp.disabled = true;
    this.dom.btnAiRevamp.classList.add('loading');
    this.dom.btnAiRevamp.innerHTML = '🪄 REMASTERING WITH LLM...';

    const promptText = this.buildAIRewritePrompt(genre, story);

    try {
      if (api === 'gemini') {
        const apiKey = this.dom.geminiKey.value.trim();
        if (!apiKey) {
          throw new Error("Gemini API key is required. Paste your key in the field.");
        }
        const response = await this.callGeminiAPI(apiKey, promptText);
        this.dom.storyInput.value = response;
      } else if (api === 'ollama') {
        const model = this.dom.ollamaModel.value.trim() || 'gemma';
        const response = await this.callOllamaAPI(model, promptText);
        this.dom.storyInput.value = response;
      } else {
        const response = this.localFallbackRewrite(genre, story);
        this.dom.storyInput.value = response;
      }
      
      this.compileAll();
    } catch (err) {
      alert(`AI Remaster Failed: ${err.message}`);
    } finally {
      this.dom.btnAiRevamp.disabled = false;
      this.dom.btnAiRevamp.classList.remove('loading');
      this.dom.btnAiRevamp.innerHTML = '🪄 REVAMP LYRICAL REMASTER';
    }
  }

  async callGeminiAPI(key, prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "HTTP Error connecting to Gemini API.");
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  }

  async callOllamaAPI(model, prompt) {
    const url = 'http://localhost:11434/api/chat';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error("HTTP Error connecting to local Ollama server. Make sure Ollama is running and CORS is enabled via: OLLAMA_ORIGINS=\"*\" ollama serve");
    }

    const data = await response.json();
    return data.message.content.trim();
  }

  getScratchDescriptor(scratch) {
    if (scratch === 'battle-transform') {
      return 'aggressive turntable cuts, transform scratches, and chopped DJ edit bursts';
    }
    if (scratch === 'heavy-quantized') {
      return 'quantized hype scratches, reload cuts, and rave DJ stutters';
    }
    if (scratch === 'low-impact') {
      return 'short transition scratches and quick cut-in FX';
    }
    return '';
  }

  getVocalDescriptor(vocals) {
    if (vocals === 'robotic-monotone') {
      return 'robotic monotone chant vocals';
    }
    if (vocals === 'shouted-gang') {
      return 'shouted gang vocals and crowd-response chants';
    }
    if (vocals === 'aussie-grit') {
      return 'Aussie accent gritty spoken-barked vocals';
    }
    if (vocals === 'pub-grit') {
      return 'gritty working-bloke pub rock vocals';
    }
    if (vocals === 'female-hardtechno') {
      return 'chopped female hard-dance vocal stabs';
    }
    if (vocals === 'synthwave-vocoder') {
      return 'retro vocoder robot vocals';
    }
    if (vocals === 'mc-hype') {
      return 'UK MC hype calls, chopped rave crowd shouts, and call-and-response ad-libs';
    }
    return '';
  }

  getPresetDisplayName(presetKey = this.currentPreset) {
    const chipTitle = document.querySelector(`.preset-chip[data-preset="${presetKey}"] .chip-title`);
    if (chipTitle?.textContent) return chipTitle.textContent.trim();
    return PRESETS[presetKey]?.promptLabel || presetKey;
  }

  formatTrackTitle(text) {
    const cleaned = (text || '')
      .replace(/[_-]+/g, ' ')
      .replace(/[^\w\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned) return 'Untitled Rave Tool';

    return cleaned
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  getSunoProfile(styleProfile, bpm) {
    if (styleProfile === 'warehouse-bounce') {
      return {
        negative: 'No soft pop chorus, no indie guitars, no lo-fi haze, no cheerful EDM plucks, no gentle breakdown.',
        notes: `Use Custom mode. Target ${bpm} BPM with a dark warehouse bounce groove, clipped hard-dance kick, siren tension, and a pressure-building drop structure. Keep the topline short, repetitive, and physical.`,
        suffix: 'Warehouse Bounce Tool'
      };
    }
    if (styleProfile === 'makina-korps') {
      return {
        negative: 'No trap hats, no chilled pads, no acoustic drums, no radio-pop chorus, no minimal techno dryness.',
        notes: `Use Custom mode. Target ${bpm} BPM with Spanish makina and millennium hardcore energy, bright Euro rave leads, sharp poky motion, and dark late-rave tension. Favor fast lift sections, big session transitions, and a hard final reload.`,
        suffix: 'Makina Korps Session'
      };
    }
    if (styleProfile === 'northern-bounce') {
      return {
        negative: 'No industrial gloom, no slow halftime, no moody ambient intro, no acoustic rock band feel, no minimal techno.',
        notes: `Use Custom mode. Target ${bpm} BPM with UK bounce and donk lift, bright rave stabs, cheeky hook repetition, and big sing-back crowd energy. Keep the arrangement fast, playful, and DJ-friendly.`,
        suffix: 'Northern Bounce Anthem'
      };
    }
    if (styleProfile === 'donk-queen-rave') {
      return {
        negative: 'No flat minimal groove, no sleepy lo-fi, no acoustic guitars, no soft piano ballad mood, no restrained drop.',
        notes: `Use Custom mode. Target ${bpm} BPM with donk-driven rave pressure, trance-lift sections, rewinds, and optional jungle-flavored switch-up energy. Keep it hectic, bright, and club-first.`,
        suffix: 'Donk Queen Rave Mix'
      };
    }
    if (this.currentPreset === 'synthwave') {
      return {
        negative: 'No acoustic drums, no metal guitars, no trap percussion, no hardcore kick wall.',
        notes: `Use Custom mode. Target ${bpm} BPM with neon retro synths, a clean analog bassline, and a cinematic outrun structure.`,
        suffix: 'Night Drive Edit'
      };
    }
    if (this.currentPreset === 'pub-rock') {
      return {
        negative: 'No EDM synths, no rave donk bass, no trance supersaws, no chopped club vocals.',
        notes: `Use Custom mode. Keep it as a raw guitar-led anthem with gritty vocals, driving live drums, and a pub-singalong hook at ${bpm} BPM.`,
        suffix: 'Pub Anthem'
      };
    }
    if (this.currentPreset === 'aussie-hiphop') {
      return {
        negative: 'No eurodance supersaws, no hardcore kick distortion, no acoustic indie drums, no glossy pop hook.',
        notes: `Use Custom mode. Keep it sparse and punchy at ${bpm} BPM with deep sub, scratch phrases, and a spoken-barked lead vocal pocket.`,
        suffix: 'Street Mix'
      };
    }
    return {
      negative: 'No acoustic guitars, no relaxed lo-fi mood, no generic radio-pop chorus, no soft ambient outro.',
      notes: `Use Custom mode. Keep the arrangement focused, energetic, and genre-accurate at ${bpm} BPM. Push the core groove, make the hook obvious, and avoid overlong intros.`,
      suffix: 'Club Tool'
    };
  }

  buildSunoPack(style, lyrics, bpm, slogan, story, styleProfile) {
    const profile = this.getSunoProfile(styleProfile, bpm);
    const baseTitle = this.formatTrackTitle(slogan || PRESETS[this.currentPreset]?.slogan || this.getPresetDisplayName());
    const title = `${baseTitle} (${profile.suffix})`;
    const storyLead = story
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 2)
      .join(' / ');
    const notes = `${profile.notes}${storyLead ? ` Source theme: ${storyLead}.` : ''}`;

    const pack = [
      `TITLE: ${title}`,
      '',
      'STYLE PROMPT:',
      style,
      '',
      'NEGATIVE CUES:',
      profile.negative,
      '',
      'GENERATION NOTES:',
      notes,
      '',
      'LYRICS:',
      lyrics
    ].join('\n');

    return {
      title,
      negative: profile.negative,
      notes,
      pack
    };
  }

  buildArtistInspiredStylePrompt(styleProfile, bpm, dist, sub, clang, vocals, scratch) {
    const scratchDescriptor = this.getScratchDescriptor(scratch);
    const vocalDescriptor = this.getVocalDescriptor(vocals);
    let style = '';

    if (styleProfile === 'warehouse-bounce') {
      style += `Industrial warehouse bounce / hard techno bounce / dark club pressure, ${bpm} BPM`;
      style += dist >= 75
        ? `, clipped hard-dance kick with a brutal warehouse slam`
        : `, punchy hard techno kick with bounce-led drive`;
      style += sub >= 75
        ? `, rolling rumble sub and elastic low-end pressure`
        : `, tight sub rumble with club-body weight`;
      style += clang >= 50
        ? `, steel percussion, siren sweeps, and strobe-lit impact hits`
        : `, tight warehouse percussion and dark hats`;

      const fxList = [];
      if (this.isFxEnabled('fx-alarms')) fxList.push('alarm rises and emergency sirens');
      if (this.isFxEnabled('fx-acid')) fxList.push('acid squelch movement');
      if (this.isFxEnabled('fx-gated')) fxList.push('cavernous warehouse reverb');
      if (this.isFxEnabled('fx-floor')) fxList.push('sub-drop floor collapse FX');
      if (fxList.length > 0) style += `, ${fxList.join(', ')}`;
      if (scratchDescriptor) style += `, ${scratchDescriptor}`;
      if (vocalDescriptor) style += `, ${vocalDescriptor}`;
      style += `. No cheesy radio toplines. Keep it dark, physical, and built for strobes and pressure.`;
      return style;
    }

    if (styleProfile === 'makina-korps') {
      style += `Spanish makina / millennium hardcore / poky rave pressure, ${bpm} BPM`;
      style += dist >= 75
        ? `, hard clipped kick with sharp makina snap`
        : `, fast euro-rave kick with hardcore edge`;
      style += sub >= 70
        ? `, fast rolling subline and tense low-end drive`
        : `, tight rave bass pulse`;
      style += clang >= 45
        ? `, bright euro stabs, metallic rushes, and sharp session percussion`
        : `, crisp rave hats and trance-lift claps`;

      const fxList = [];
      if (this.isFxEnabled('fx-alarms')) fxList.push('alarm sirens and tension rises');
      if (this.isFxEnabled('fx-acid')) fxList.push('acid-tinged rave synth movement');
      if (this.isFxEnabled('fx-gated')) fxList.push('dark hall lift reverb');
      if (this.isFxEnabled('fx-floor')) fxList.push('hard stop drop voids');
      if (fxList.length > 0) style += `, ${fxList.join(', ')}`;
      if (scratchDescriptor) style += `, ${scratchDescriptor}`;
      if (vocalDescriptor) style += `, ${vocalDescriptor}`;
      style += `. No soft pop framing. Keep it fast, dark, melodic, and built like a late-session makina weapon.`;
      return style;
    }

    if (styleProfile === 'northern-bounce') {
      style += `UK bounce / happy hardcore club energy / donk-lift rave, ${bpm} BPM`;
      style += dist >= 60
        ? `, springy punch kick with gritty donk edge`
        : `, bright club kick with bounce-led snap`;
      style += sub >= 70
        ? `, elastic donk bassline and rubber-band low-end movement`
        : `, buoyant rave bass groove`;
      style += clang >= 35
        ? `, bright claps, rave stabs, and snare-roll lift sections`
        : `, crisp clap snaps and sing-back hook space`;
      style += `, trancey lead flashes, cheeky hook phrasing, and hands-in-the-air breakdown lift`;
      if (scratchDescriptor) style += `, ${scratchDescriptor}`;
      if (vocalDescriptor) style += `, ${vocalDescriptor}`;
      style += `. No industrial gloom and no stripped minimalism. Keep it cheeky, euphoric, and built for crowd response.`;
      return style;
    }

    style += `Multi-genre donk rave / trance-lift bounce / club switch-up energy, ${bpm} BPM`;
    style += dist >= 65
      ? `, chunky donk kick and hard-rave punch`
      : `, driving rave kick with spring-loaded bounce`;
    style += sub >= 80
      ? `, huge donk bass pressure with elastic pitch movement`
      : `, rolling bounce bass undercurrent`;
    style += clang >= 40
      ? `, rave stabs, snare roll lifts, and busy switch-up percussion`
      : `, clean club claps and uplift transitions`;
    style += `, trance-flavored lift sections and quick jungle or DnB-style contrast moments`;
    if (this.isFxEnabled('fx-bitcrushed')) style += `, clipped rave fills and crunchy transition edits`;
    if (this.isFxEnabled('fx-floor')) style += `, rewind-style drop voids and bass collapse moments`;
    if (scratchDescriptor) style += `, ${scratchDescriptor}`;
    if (vocalDescriptor) style += `, ${vocalDescriptor}`;
    style += `. No flat minimal groove. Keep it busy, playful, and designed for rewinds, switch-ups, and big room lift.`;
    return style;
  }

  localFallbackClubRewrite(styleProfile, text) {
    const profiles = {
      'warehouse-bounce': {
        replacements: [
          { rx: /love/gi, rep: 'pressure' },
          { rx: /fire/gi, rep: 'strobe light' },
          { rx: /ocean/gi, rep: 'warehouse floor' },
          { rx: /surfin'/gi, rep: 'bouncin\'' },
          { rx: /surfing/gi, rep: 'bouncing' },
          { rx: /highway/gi, rep: 'night lane' }
        ],
        hype: ['Bounce that siren', 'Dark room pressure', 'Hold that line', 'Warehouse lift'],
        tails: ['under red strobes', 'when the low-end lands', 'inside the late shift rave', 'till the kick comes back']
      },
      'makina-korps': {
        replacements: [
          { rx: /love/gi, rep: 'pressure rush' },
          { rx: /fire/gi, rep: 'laser burn' },
          { rx: /ocean/gi, rep: 'rave floor' },
          { rx: /surfin'/gi, rep: 'rushin\'' },
          { rx: /surfing/gi, rep: 'rushing' },
          { rx: /highway/gi, rep: 'session lane' }
        ],
        hype: ['Millennium pressure', 'Poky attack', 'Makina reload', 'Late rave signal'],
        tails: ['through the euro rush', 'under red strobes', 'when the synth lift hits', 'into the final reload']
      },
      'northern-bounce': {
        replacements: [
          { rx: /love/gi, rep: 'rave rush' },
          { rx: /fire/gi, rep: 'laser light' },
          { rx: /ocean/gi, rep: 'dancefloor' },
          { rx: /surfin'/gi, rep: 'bouncin\'' },
          { rx: /surfing/gi, rep: 'bouncing' },
          { rx: /highway/gi, rep: 'motorway' }
        ],
        hype: ['Bounce all night', 'Hands in the air', 'Reload that tune', 'Sing it back'],
        tails: ['on the club floor', 'till the lights come up', 'with the donk bass live', 'for the crew tonight']
      },
      'donk-queen-rave': {
        replacements: [
          { rx: /love/gi, rep: 'bass rush' },
          { rx: /fire/gi, rep: 'trance lift' },
          { rx: /ocean/gi, rep: 'rave wave' },
          { rx: /hound dog/gi, rep: 'donk queen' },
          { rx: /highway/gi, rep: 'dance lane' },
          { rx: /burning/gi, rep: 'lifting' }
        ],
        hype: ['Donk queen reload', 'Rave kid lift off', 'One more rewind', 'Hands on the lasers'],
        tails: ['with the donkline up', 'through the trancey lift', 'into the jungle switch', 'when the bass drops in']
      }
    };

    const profile = profiles[styleProfile];
    if (!profile) return text;

    let output = text;
    profile.replacements.forEach((mapping) => {
      output = output.replace(mapping.rx, mapping.rep);
    });

    const lines = output
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const rewritten = lines.map((line, index) => {
      const compact = line.replace(/[.,!?;:]+/g, '').trim();
      const shortLine = compact.split(/\s+/).slice(0, 10).join(' ');
      const hypePhrase = profile.hype[index % profile.hype.length];
      const tail = profile.tails[index % profile.tails.length];

      if (index % 4 === 0) {
        return this.makeStutter(hypePhrase);
      }
      if (index % 4 === 3) {
        return `${shortLine} ${tail}`.trim();
      }
      return shortLine;
    });

    return rewritten.join('\n');
  }

  // Fallback Local Re-writer
  localFallbackRewrite(genre, text) {
    const styleProfile = PRESETS[genre]?.styleProfile || '';
    if (styleProfile === 'warehouse-bounce' || styleProfile === 'makina-korps' || styleProfile === 'northern-bounce' || styleProfile === 'donk-queen-rave') {
      return this.localFallbackClubRewrite(styleProfile, text);
    }

    let output = text;
    const mappings = [
      { rx: /hound dog/gi, rep: 'tax collector' },
      { rx: /cryin'/gi, rep: 'taxin\'' },
      { rx: /rabbit/gi, rep: 'rego rebate' },
      { rx: /high-class/gi, rep: 'corporate' },
      { rx: /friend of mine/gi, rep: 'worker\'s mate' },
      { rx: /ocean/gi, rep: 'M5 tollroad' },
      { rx: /surfin'/gi, rep: 'graftin\'' },
      { rx: /surfing/gi, rep: 'working' },
      { rx: /surfboard/gi, rep: 'tradie ute' },
      { rx: /California/gi, rep: 'Sydney metro' },
      { rx: /Californi-a/gi, rep: 'Syd-ney metro' },
      { rx: /blonde hairdo/gi, rep: 'hi-vis jacket' },
      { rx: /June/gi, rep: 'knock-off time' },
      { rx: /love is/gi, rep: 'debt is' },
      { rx: /burning/gi, rep: 'crushing' },
      { rx: /fiery ring/gi, rep: 'ring of tolls' },
      { rx: /ring of fire/gi, rep: 'ring of debt' },
      { rx: /wild desire/gi, rep: 'corporate lies' },
      { rx: /flames went higher/gi, rep: 'bills went higher' },
      { rx: /end is near/gi, rep: 'rego is due' },
      { rx: /final curtain/gi, rep: 'bank foreclosure' },
      { rx: /my friend/gi, rep: 'union mate' },
      { rx: /my way|my-way/gi, rep: 'worker\'s way' },
      { rx: /highway/gi, rep: 'tollway' },
      { rx: /highway/gi, rep: 'freeway' }
    ];

    mappings.forEach(m => {
      output = output.replace(m.rx, m.rep);
    });

    const lines = output.split("\n");
    const formatted = lines.map(line => {
      const cleanLine = line.trim();
      if (cleanLine.length < 5) return cleanLine;
      if (Math.random() < 0.35) {
        const words = cleanLine.split(" ");
        const firstWord = words[0];
        if (firstWord.length > 2) {
          const stutter = firstWord.substring(0, 2) + '-' + firstWord.toLowerCase();
          words[0] = stutter;
          return words.join(" ");
        }
      }
      return cleanLine;
    });

    return formatted.join("\n");
  }

  // --- STUTTER SYNTHESIZER ENGINE ---
  makeStutter(phrase) {
    if (!phrase) return "";
    const words = phrase.trim().split(/\s+/);
    const firstWord = words[0];
    const rest = words.slice(1).join(" ");
    
    let stutteredWord = firstWord;
    if (firstWord.length > 2) {
      const prefix2 = firstWord.substring(0, 2).toLowerCase();
      const prefix3 = firstWord.substring(0, 3).toLowerCase();
      
      if (['ch', 'wr', 'th', 'sh', 'st', 'fl', 'sc', 'te', 'sy', 'nu', 'au', 'ba'].includes(prefix2)) {
        stutteredWord = firstWord.substring(0, 2) + '-' + firstWord.toLowerCase();
      } else if (['scr', 'str'].includes(prefix3)) {
        stutteredWord = firstWord.substring(0, 3) + '-' + firstWord.toLowerCase();
      } else {
        stutteredWord = firstWord.substring(0, 2) + '-' + firstWord.toLowerCase();
      }
    }
    
    return rest ? `${stutteredWord} ${rest}` : stutteredWord;
  }

  // --- STYLE COMPILER ---
  compileAll() {
    const bpm = parseInt(this.dom.bpmSlider.value);
    const dist = parseInt(this.dom.distSlider.value);
    const sub = parseInt(this.dom.subSlider.value);
    const clang = parseInt(this.dom.clangSlider.value);
    const vocals = this.dom.vocalsSelect.value;
    const scratch = this.dom.scratchesSelect.value;
    const slogan = this.dom.sloganInput.value.trim();
    const story = this.dom.storyInput.value.trim();
    const styleProfile = PRESETS[this.currentPreset]?.styleProfile || '';
    const scratchDescriptor = this.getScratchDescriptor(scratch);
    const vocalDescriptor = this.getVocalDescriptor(vocals);

    let style = "";

    if (styleProfile === 'warehouse-bounce' || styleProfile === 'makina-korps' || styleProfile === 'northern-bounce' || styleProfile === 'donk-queen-rave') {
      style = this.buildArtistInspiredStylePrompt(styleProfile, bpm, dist, sub, clang, vocals, scratch);
    } else if (bpm >= 145) {
      let genres = [];
      if (this.currentPreset === 'breakcore-dnb') {
        genres = ["Breakcore", "glitchy drum and bass", "chopped amen breaks"];
      } else if (bpm >= 180) {
        genres = ["Industrial uptempo hardcore", "gabber-adjacent ultra hard techno"];
      } else if (bpm >= 165) {
        genres = ["Industrial hardcore", "acidcore", "EBM"];
      } else {
        genres = ["Industrial schranz", "ultra hard techno", "dark warehouse rave"];
      }
      
      style += `${genres.join(" / ")}, ${bpm} BPM`;
      
      if (dist >= 80) {
        style += `, devastating clipped overdriven 909 gabber kick with long saturated tail`;
      } else if (dist >= 50) {
        style += `, overdriven distorted 909 kick`;
      } else {
        style += `, heavy punchy kick`;
      }
      
      if (sub >= 70) {
        style += `, maximum mono sub bass distortion, chest-caving low-end pressure`;
      } else if (sub >= 40) {
        style += `, rolling sub-rumble bass`;
      }
      
      if (clang >= 70) {
        style += `, dense metallic factory percussion, hydraulic clangs, steel impact hits`;
      } else if (clang >= 40) {
        style += `, heavy industrial percussion, metallic hi-hats`;
      }

      const fxList = [];
      if (this.isFxEnabled('fx-alarms')) fxList.push("sirens and alarms");
      if (this.isFxEnabled('fx-acid')) fxList.push("acidcore synth screams, dark acid movement");
      if (this.isFxEnabled('fx-bitcrushed')) fxList.push("bitcrushed snares");
      if (this.isFxEnabled('fx-gated')) fxList.push("hostile cavernous warehouse reverb");
      if (this.isFxEnabled('fx-floor')) fxList.push("bass floor collapse FX");
      
      if (fxList.length > 0) {
        style += `, ${fxList.join(", ")}`;
      }

      if (scratchDescriptor) style += `, ${scratchDescriptor}`;
      if (vocalDescriptor) style += `, ${vocalDescriptor}`;

      style += `. No melody, no uplifting hooks, no trance, no soft breakdown, no pop chorus.`;
      
    } else {
      if (this.currentPreset === 'synthwave') {
        style += `1980s synthwave, outrun retro electro, analog bassline, retro drum machine, gates snares, vocoder vocals, ${bpm} BPM`;
        if (dist >= 60) style += `, overdriven chorus synth lead`;
        style += `. No acoustic guitars, no live drums.`;
      } else if (vocals === 'pub-grit' || this.currentPreset === 'pub-rock') {
        style += `Aussie pub rock, alternative rock, raw gritty vocals, distorted electric guitars, driving drums, gang vocals, anthemic chant hook, ${bpm} BPM`;
        if (dist >= 60) style += `, heavy overdriven fuzz bass`;
        if (this.isFxEnabled('fx-gated')) style += `, large hall reverb`;
        style += `. No electronics, no synth, no dance elements.`;
      } else {
        style += `Aussie hip hop, boom-bap beat, ${bpm} BPM, heavy deep sub bass, gritty vocals, aggressive turntable scratching, vinyl scratch sound FX, minimal piano stab`;
        if (dist >= 60) style += `, saturated low-end`;
        if (this.isFxEnabled('fx-bitcrushed')) style += `, bitcrushed drums`;
        if (scratchDescriptor) style += `, ${scratchDescriptor}`;
        if (vocalDescriptor) style += `, ${vocalDescriptor}`;
        style += `. No EDM, no high-pitch pop hooks, no melody loops.`;
      }
    }

    this.dom.outputStyle.value = style;
    this.dom.styleCharCount.textContent = style.length;

    const storyLines = story.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const stutterSlogan = this.makeStutter(slogan);
    
    const introSD = this.isFxEnabled('fx-alarms') ? "Signal cut. Kick only. No signal." : "Kick only.";
    const breakSD = (this.isFxEnabled('fx-alarms') ? "Factory alarm. " : "") + (this.isFxEnabled('fx-gated') ? "Noise wall. " : "") + "Kick returns harder.";
    
    let lText = "";
    
    // [Intro]
    lText += `[Intro]\n${introSD}\n`;
    if (storyLines.length > 0) lText += `${storyLines[0]}\n`;
    if (storyLines.length > 1) lText += `${storyLines[1]}\n`;
    lText += `\n`;
    
    // [Build]
    lText += `[Build]\n`;
    if (stutterSlogan) lText += `${stutterSlogan}.\n`;
    if (storyLines.length > 2) lText += `${storyLines[2]}\n`;
    if (storyLines.length > 3) lText += `${storyLines[3]}\n`;
    lText += `Pressure rising.\n`;
    if (this.isFxEnabled('fx-floor')) lText += `Null. And. Void.\n`;
    lText += `\n`;
    
    // [Drop]
    lText += `[Drop]\n`;
    if (stutterSlogan) lText += `${stutterSlogan}.\n`;
    if (slogan) lText += `${slogan}.\n`;
    lText += `Bass pound. Wall crack.\n`;
    if (stutterSlogan) lText += `${stutterSlogan}.\n`;
    lText += `Kick slam. Roof break.\n`;
    lText += `\n`;
    
    // [Break]
    lText += `[Break]\n`;
    lText += `${breakSD}\n`;
    if (storyLines.length > 4) lText += `${storyLines[4]}\n`;
    if (storyLines.length > 5) lText += `${storyLines[5]}\n`;
    if (storyLines.length > 6) lText += `${storyLines[6]}\n`;
    lText += `\n`;
    
    // [Build 2]
    lText += `[Build 2]\n`;
    lText += `Double force. No warning.\n`;
    if (stutterSlogan) lText += `${stutterSlogan}.\n`;
    lText += `Sub surge. Floor buckle.\n`;
    lText += `\n`;
    
    // [Final Drop]
    lText += `[Final Drop]\n`;
    if (slogan) lText += `${slogan}.\n`;
    lText += `Maximum impact.\n`;
    if (stutterSlogan) lText += `${stutterSlogan}.\n`;
    lText += `Bass floor collapse.\n`;
    lText += `Nothing survives.\n`;
    lText += `\n`;
    
    // [Outro]
    lText += `[Outro]\n`;
    if (slogan) lText += `${slogan}.\n`;
    lText += `System offline.\n`;
    lText += `Signal cut.\n`;
    
    this.dom.outputLyrics.value = lText;

    const sunoPack = this.buildSunoPack(style, lText, bpm, slogan, story, styleProfile);
    this.dom.outputSunoTitle.value = sunoPack.title;
    this.dom.outputSunoNegative.value = sunoPack.negative;
    this.dom.outputSunoNotes.value = sunoPack.notes;
    this.dom.outputSunoPack.value = sunoPack.pack;
  }

  // --- OSCILLOSCOPE VISUALIZER LOOP ---
  drawVisualizer() {
    if (!this.dj.isPlaying || !this.dj.analyser) return;

    this.visualizerId = requestAnimationFrame(() => this.drawVisualizer());
    
    const canvas = this.dom.canvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const currentTime = this.dj.audioCtx.currentTime;
    while (this.dj.visualQueue.length && this.dj.visualQueue[0].time <= currentTime) {
      const visualStep = this.dj.visualQueue.shift().step;
      this.highlightSequencerStepUI(visualStep);
      
      // OPTION 1: STROBE PULSE ON BEATS (Steps 0, 4, 8, 12)
      if (visualStep % 4 === 0) {
        this.triggerUIStrobePulse();
      }
    }

    const bufferLength = this.dj.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.dj.analyser.getByteTimeDomainData(dataArray);
    
    ctx.fillStyle = '#040507';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#00e1ff';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00e1ff';
    ctx.beginPath();
    
    const sliceWidth = width * 1.0 / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }
    
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  highlightSequencerStepUI(stepIndex) {
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.classList.remove('playhead-active');
    });
    
    const tracks = ['kick', 'sub', 'clang', 'sample'];
    tracks.forEach(track => {
      const btn = document.querySelector(`.seq-track-row[data-track="${track}"] .step-btn[data-step="${stepIndex}"]`);
      if (btn) btn.classList.add('playhead-active');
    });
  }

  triggerUIStrobePulse() {
    const vp = this.dom.appViewport;
    if (vp) {
      vp.classList.remove('ui-strobe');
      // Trigger browser reflow to reset keyframe animation
      void vp.offsetWidth;
      vp.classList.add('ui-strobe');
    }
  }

  clearCanvas() {
    const canvas = this.dom.canvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#040507';
    ctx.fillRect(0, 0, width, height);
  }

  flashCanvasGlow() {
    const canvas = this.dom.canvas;
    canvas.style.boxShadow = '0 0 20px #ff0055';
    setTimeout(() => {
      canvas.style.boxShadow = 'none';
    }, 150);
  }

  // --- LOCAL PRESETS STATE STORAGE ---
  saveCustomPresetState() {
    const name = this.dom.customPresetName.value.trim();
    if (!name) {
      alert("Please enter a name for the custom state.");
      return;
    }
    
    const activeFX = this.syncFxStateFromDOM();

    const presetData = {
      bpm: parseInt(this.dom.bpmSlider.value),
      dist: parseInt(this.dom.distSlider.value),
      sub: parseInt(this.dom.subSlider.value),
      clang: parseInt(this.dom.clangSlider.value),
      sampleSpeed: parseFloat(this.dom.sampleSpeedSlider.value) || 1.0,
      sampleSpeedLocked: this.sampleSpeedLocked,
      vocals: this.dom.vocalsSelect.value,
      scratch: this.dom.scratchesSelect.value,
      fx: activeFX,
      slogan: this.dom.sloganInput.value.trim(),
      story: this.dom.storyInput.value.trim(),
      grid: JSON.parse(JSON.stringify(this.dj.grid))
    };
    
    let stored = JSON.parse(localStorage.getItem('dj_presets')) || {};
    stored[name] = presetData;
    localStorage.setItem('dj_presets', JSON.stringify(stored));
    
    this.dom.customPresetName.value = "";
    this.loadCustomPresetsMenu();
  }

  loadCustomPresetsMenu() {
    this.dom.savedPresetsList.innerHTML = "";
    const stored = JSON.parse(localStorage.getItem('dj_presets')) || {};
    
    Object.keys(stored).forEach(name => {
      const chip = document.createElement('div');
      chip.className = 'mini-chip';
      chip.innerHTML = `<span>${name}</span> <span class="delete-chip" data-name="${name}">×</span>`;
      
      chip.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-chip')) {
          e.stopPropagation();
          const targetName = e.target.getAttribute('data-name');
          this.deleteCustomPreset(targetName);
        } else {
          this.applyCustomPresetState(stored[name]);
        }
      });
      
      this.dom.savedPresetsList.appendChild(chip);
    });
  }

  deleteCustomPreset(name) {
    let stored = JSON.parse(localStorage.getItem('dj_presets')) || {};
    delete stored[name];
    localStorage.setItem('dj_presets', JSON.stringify(stored));
    this.loadCustomPresetsMenu();
  }

  applyCustomPresetState(data) {
    this.dom.presetChips.forEach(c => c.classList.remove('active'));
    
    this.dom.bpmSlider.value = data.bpm;
    this.dom.bpmVal.textContent = data.bpm;
    this.dom.bpmHeader.textContent = data.bpm;

    this.dom.distSlider.value = data.dist;
    this.dom.distVal.textContent = data.dist + '%';

    this.dom.subSlider.value = data.sub;
    this.dom.subVal.textContent = data.sub + '%';

    this.dom.clangSlider.value = data.clang;
    this.dom.clangVal.textContent = data.clang + '%';
    
    this.applySampleSpeed(data.sampleSpeed ?? 1.0, true);
    this.setSampleSpeedLockState(Boolean(data.sampleSpeedLocked), true);

    this.dom.vocalsSelect.value = data.vocals;
    this.dom.scratchesSelect.value = data.scratch;

    this.setFxStateFromList(data.fx);

    this.dom.sloganInput.value = data.slogan;
    this.dom.storyInput.value = data.story;

    if (data.grid) {
      this.dj.grid = JSON.parse(JSON.stringify(data.grid));
      const tracks = ['kick', 'sub', 'clang', 'sample'];
      tracks.forEach(track => {
        for (let i = 0; i < 16; i++) {
          const val = this.dj.grid[track][i];
          const btn = document.querySelector(`.seq-track-row[data-track="${track}"] .step-btn[data-step="${i}"]`);
          if (btn) {
            if (val) btn.classList.add('active');
            else btn.classList.remove('active');
          }
        }
      });
    }

    this.syncDJParams();
    this.compileAll();
  }
}

// Start Controller
window.addEventListener('DOMContentLoaded', () => {
  const controller = new AppController();
  controller.init();
});
