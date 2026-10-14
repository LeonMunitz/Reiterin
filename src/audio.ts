// Web Audio API Synthesizer for Roblox Brookhaven Open-World arcade sounds

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  public init() {
    if (!this.ctx) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn('Audio not available', e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playTone(freq: number, type: OscillatorType, duration: number, delay = 0, vol = 0.12) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime + delay;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + duration);
    } catch {
      // Ignore audio interruptions
    }
  }

  public jump() {
    this.playTone(340, 'sine', 0.1);
    this.playTone(560, 'sine', 0.14, 0.03);
  }

  public doubleJump() {
    this.playTone(520, 'sine', 0.09);
    this.playTone(820, 'sine', 0.14, 0.04);
  }

  public trampoline() {
    this.playTone(300, 'sine', 0.1);
    this.playTone(600, 'sine', 0.15, 0.05);
    this.playTone(950, 'triangle', 0.2, 0.12);
  }

  public skateboard() {
    this.playTone(180, 'triangle', 0.08, 0, 0.04);
    this.playTone(220, 'triangle', 0.08, 0.04, 0.04);
  }

  public pick() {
    this.playTone(520, 'triangle', 0.08);
    this.playTone(784, 'triangle', 0.12, 0.06);
    this.playTone(1046, 'sine', 0.18, 0.12, 0.15);
  }

  public deliverySuccess() {
    this.playTone(523, 'sine', 0.1);
    this.playTone(659, 'sine', 0.12, 0.08);
    this.playTone(783, 'triangle', 0.16, 0.16);
    this.playTone(1046, 'sine', 0.3, 0.24, 0.2);
  }

  public questComplete() {
    this.playTone(440, 'sine', 0.12);
    this.playTone(554, 'sine', 0.12, 0.1);
    this.playTone(659, 'sine', 0.14, 0.2);
    this.playTone(880, 'triangle', 0.35, 0.3, 0.25);
  }

  public dialogueBlip() {
    this.playTone(480, 'sine', 0.05, 0, 0.08);
  }

  public error() {
    this.playTone(220, 'sawtooth', 0.12, 0, 0.08);
    this.playTone(160, 'sawtooth', 0.15, 0.08, 0.08);
  }
}

export const soundEngine = new SoundEngine();
