import React, { useEffect, useRef, useState } from 'react';
import { 
  Crosshair, 
  RotateCcw, 
  X, 
  Flame, 
  Zap, 
  Rocket, 
  Bomb, 
  ShieldAlert, 
  ArrowUp,
  Volume2,
  VolumeX,
  Smartphone
} from 'lucide-react';
import { requestLandscape, exitLandscape } from '../utils/orientation';

// ==========================================
// PURE WEB AUDIO API SYNTHESIZER (No Audio Assets Needed)
// ==========================================
class SoundFX {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private jetpackGain: GainNode | null = null;
  private jetpackOsc: AudioNode | null = null;
  private isJetpackPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Realistic Gunshot / Laser / Rocket Audio Synthesizer
  public playShoot(type: WeaponType) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    if (type === 'RIFLE') {
      // Crisp rifle snap + low mechanical punch + noise burst
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      // Gunshot noise punch
      const bufferSize = this.ctx.sampleRate * 0.06;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, t);
      noiseFilter.Q.setValueAtTime(2, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
      noise.start(t);
      noise.stop(t + 0.06);

    } else if (type === 'SHOTGUN') {
      // Heavy booming double blast + low end thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.22);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(1200, t);
      noiseFilter.frequency.exponentialRampToValueAtTime(180, t + 0.18);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.65, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.22);
      noise.start(t);
      noise.stop(t + 0.18);

    } else if (type === 'ROCKET') {
      // Rocket hiss ignition & thrust whoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.linearRampToValueAtTime(320, t + 0.25);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(600, t);
      noiseFilter.frequency.exponentialRampToValueAtTime(2400, t + 0.25);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.28);
      noise.start(t);
      noise.stop(t + 0.28);

    } else if (type === 'LASER') {
      // Futuristic flamethrower laser sizzle chirp
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.05);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);

    } else if (type === 'NUKE') {
      // Deep ominous launch rumble + sirens
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, t);
      osc.frequency.linearRampToValueAtTime(45, t + 0.7);
      gain.gain.setValueAtTime(0.65, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(800, t);
      osc2.frequency.linearRampToValueAtTime(400, t + 0.5);
      gain2.gain.setValueAtTime(0.25, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.7);
      osc2.start(t);
      osc2.stop(t + 0.5);
    }
  }

  // Brass bullet casing metallic ping / clink
  public playCasing() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime + 0.04 + Math.random() * 0.06;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const freq = 2200 + Math.random() * 800;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Bullet impact & fire crackle sizzle on button/element
  public playBurnHit() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // High sizzle / scorch crackle
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.4 ? 1 : 0);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2600 + Math.random() * 800, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + 0.08);
  }

  // Heavy destructive explosion & burning collapse sound
  public playExplosion(isNuke: boolean = false) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const duration = isNuke ? 1.6 : 0.65;

    // Sub-bass thump
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isNuke ? 130 : 180, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + duration);
    oscGain.gain.setValueAtTime(isNuke ? 0.8 : 0.55, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    // Filtered noise rumble
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(60, t + duration);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(isNuke ? 0.9 : 0.6, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
    noise.start(t);
    noise.stop(t + duration);
  }

  // Jetpack thruster sound (throttled)
  public playJetpackThrust() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || this.isJetpackPlaying) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, t);
    filter.Q.setValueAtTime(1.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    this.isJetpackPlaying = true;
    noise.start(t);
    noise.stop(t + 0.12);
    noise.onended = () => {
      this.isJetpackPlaying = false;
    };
  }

  // Restore Website Elements Power-Up Chime
  public playRestore() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [330, 440, 550, 660, 880];
    freqs.forEach((f, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const st = t + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, st);
      gain.gain.setValueAtTime(0.18, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(st);
      osc.stop(st + 0.22);
    });
  }
}

const soundEngine = new SoundFX();

interface ShooterGameProps {
  isActive: boolean;
  onClose: () => void;
}

type WeaponType = 'RIFLE' | 'SHOTGUN' | 'ROCKET' | 'LASER' | 'NUKE';

interface WeaponConfig {
  name: string;
  key: string;
  icon: string;
  fireRate: number; // ms
  damage: number;
  speed: number;
  spread: number;
  count: number;
  color: string;
  trailColor: string;
  size: number;
  isExplosive?: boolean;
  blastRadius?: number;
}

const WEAPONS: Record<WeaponType, WeaponConfig> = {
  RIFLE: {
    name: 'Assault Rifle',
    key: '1',
    icon: '🔥',
    fireRate: 95,
    damage: 25,
    speed: 30,
    spread: 0.04,
    count: 1,
    color: '#FFA500', // Incendiary tracer orange
    trailColor: '#FF4500',
    size: 4
  },
  SHOTGUN: {
    name: 'Combat Shotgun',
    key: '2',
    icon: '💥',
    fireRate: 420,
    damage: 22,
    speed: 25,
    spread: 0.32,
    count: 8,
    color: '#FFCC00',
    trailColor: '#FF8800',
    size: 4
  },
  ROCKET: {
    name: 'Incendiary RPG',
    key: '3',
    icon: '🚀',
    fireRate: 550,
    damage: 100,
    speed: 16,
    spread: 0.02,
    count: 1,
    color: '#FF3300',
    trailColor: '#FF6600',
    size: 7,
    isExplosive: true,
    blastRadius: 180
  },
  LASER: {
    name: 'Flamethrower Beam',
    key: '4',
    icon: '🔥',
    fireRate: 35,
    damage: 12,
    speed: 36,
    spread: 0.02,
    count: 1,
    color: '#FF5500',
    trailColor: '#FF2200',
    size: 5
  },
  NUKE: {
    name: 'Hellfire Strike',
    key: '5',
    icon: '☢️',
    fireRate: 1400,
    damage: 999,
    speed: 12,
    spread: 0,
    count: 1,
    color: '#FF1100',
    trailColor: '#FF6600',
    size: 14,
    isExplosive: true,
    blastRadius: 420
  }
};

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: WeaponType;
  color: string;
  size: number;
  life: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  rotation?: number;
  vRot?: number;
  // Shattered DOM element physics (blocks and letters falling to floor)
  isDebris?: boolean;
  char?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  borderColor?: string;
  bounceCount?: number;
  // Real organic flame particle dynamics
  isFlame?: boolean;
  isSmoke?: boolean;
}

interface DomPlatform {
  element: HTMLElement;
  rect: DOMRect;
  hp: number;
  maxHp: number;
}

interface BurnHole {
  x: number;
  y: number;
  radius: number;
  scorchPoints: { x: number; y: number; r: number }[];
  embers: { x: number; y: number; size: number; phase: number }[];
  createdAt: number;
}

export default function ShooterGame({ isActive, onClose }: ShooterGameProps) {
  const [score, setScore] = useState(0);
  const [destroyedCount, setDestroyedCount] = useState(0);
  const [currentWeapon, setCurrentWeapon] = useState<WeaponType>('RIFLE');
  const [totalDOMCount, setTotalDOMCount] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Virtual Joystick touch state (Movement - Left)
  const joystickRef = useRef<{ active: boolean; touchId: number | null; startX: number; startY: number; currX: number; currY: number }>({
    active: false,
    touchId: null,
    startX: 0,
    startY: 0,
    currX: 0,
    currY: 0
  });
  const [joystickVisual, setJoystickVisual] = useState<{ active: boolean; dx: number; dy: number }>({ active: false, dx: 0, dy: 0 });

  // Virtual Fire Joystick touch state (Aim + Shoot - Right)
  const fireJoystickRef = useRef<{ active: boolean; touchId: number | null; startX: number; startY: number; currX: number; currY: number }>({
    active: false,
    touchId: null,
    startX: 0,
    startY: 0,
    currX: 0,
    currY: 0
  });
  const [fireJoystickVisual, setFireJoystickVisual] = useState<{ active: boolean; dx: number; dy: number }>({ active: false, dx: 0, dy: 0 });
  // Weapon cycle helper for Gamepad Y button
  const cycleWeapon = () => {
    const list: WeaponType[] = ['RIFLE', 'SHOTGUN', 'ROCKET', 'LASER', 'NUKE'];
    const idx = list.indexOf(currentWeapon);
    const next = list[(idx + 1) % list.length];
    setCurrentWeapon(next);
  };

  // Mobile Touch Handlers for Virtual Joystick
  const handleJoystickTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const touch = e.changedTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    joystickRef.current = {
      active: true,
      touchId: touch.identifier,
      startX: centerX,
      startY: centerY,
      currX: touch.clientX,
      currY: touch.clientY
    };
    const dx = Math.max(-32, Math.min(32, touch.clientX - centerX));
    const dy = Math.max(-32, Math.min(32, touch.clientY - centerY));
    setJoystickVisual({ active: true, dx, dy });
  };

  const handleJoystickTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!joystickRef.current.active) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === joystickRef.current.touchId) {
        joystickRef.current.currX = touch.clientX;
        joystickRef.current.currY = touch.clientY;
        const rawDx = touch.clientX - joystickRef.current.startX;
        const rawDy = touch.clientY - joystickRef.current.startY;
        const dist = Math.hypot(rawDx, rawDy);
        const maxDist = 36;
        const angle = Math.atan2(rawDy, rawDx);
        const clampedDist = Math.min(dist, maxDist);
        const dx = Math.cos(angle) * clampedDist;
        const dy = Math.sin(angle) * clampedDist;
        setJoystickVisual({ active: true, dx, dy });
        break;
      }
    }
  };

  const handleJoystickTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickRef.current.touchId) {
        joystickRef.current.active = false;
        joystickRef.current.touchId = null;
        setJoystickVisual({ active: false, dx: 0, dy: 0 });
        break;
      }
    }
  };

  // Gamepad Fire Joystick handlers (Drag to Aim 360° while auto-firing, or tap to fire straight)
  const handleFireJoystickTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const touch = e.changedTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    fireJoystickRef.current = {
      active: true,
      touchId: touch.identifier,
      startX: centerX,
      startY: centerY,
      currX: touch.clientX,
      currY: touch.clientY
    };
    mousePos.current.isDown = true;
    const dx = Math.max(-28, Math.min(28, touch.clientX - centerX));
    const dy = Math.max(-28, Math.min(28, touch.clientY - centerY));
    setFireJoystickVisual({ active: true, dx, dy });

    // Aim if dragged slightly
    if (Math.hypot(dx, dy) > 6) {
      const aimAngle = Math.atan2(dy, dx);
      playerRef.current.angle = aimAngle;
      playerRef.current.facing = dx >= 0 ? 1 : -1;
    }
  };

  const handleFireJoystickTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!fireJoystickRef.current.active) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === fireJoystickRef.current.touchId) {
        fireJoystickRef.current.currX = touch.clientX;
        fireJoystickRef.current.currY = touch.clientY;
        const rawDx = touch.clientX - fireJoystickRef.current.startX;
        const rawDy = touch.clientY - fireJoystickRef.current.startY;
        const dist = Math.hypot(rawDx, rawDy);
        const maxDist = 32;
        const angle = Math.atan2(rawDy, rawDx);
        const clampedDist = Math.min(dist, maxDist);
        const dx = Math.cos(angle) * clampedDist;
        const dy = Math.sin(angle) * clampedDist;
        setFireJoystickVisual({ active: true, dx, dy });

        // Update player aim angle and facing in real-time
        if (dist > 8) {
          playerRef.current.angle = angle;
          playerRef.current.facing = dx >= 0 ? 1 : -1;
        }
        break;
      }
    }
  };

  const handleFireJoystickTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === fireJoystickRef.current.touchId) {
        fireJoystickRef.current.active = false;
        fireJoystickRef.current.touchId = null;
        mousePos.current.isDown = false;
        setFireJoystickVisual({ active: false, dx: 0, dy: 0 });
        break;
      }
    }
  };

  // Gamepad action button touch handlers
  const handleFireStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mousePos.current.isDown = true;
  };
  const handleFireEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mousePos.current.isDown = false;
  };
  const handleJumpStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    keysPressed.current['touch_jump'] = true;
  };
  const handleJumpEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    keysPressed.current['touch_jump'] = false;
  };

  const toggleMute = () => {
    soundEngine.isMuted = !soundEngine.isMuted;
    setIsMuted(soundEngine.isMuted);
  };

  // Character Platformer Physics
  const playerRef = useRef({
    x: window.innerWidth / 2,
    y: 180,
    vx: 0,
    vy: 0,
    width: 28,
    height: 44,
    isGrounded: false,
    facing: 1, // 1 right, -1 left
    angle: 0,
    jetpackFuel: 100,
    jumpCount: 0,
    walkFrame: 0
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const burnHolesRef = useRef<BurnHole[]>([]);
  const destroyedElementsRef = useRef<Map<HTMLElement, { originalTransform: string; originalTransition: string }>>(new Map());
  const elementHpMap = useRef<Map<HTMLElement, number>>(new Map());
  const lastShotTime = useRef<number>(0);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, isDown: false });

  // Restore modified DOM elements to their pristine condition
  const restoreElements = () => {
    soundEngine.playRestore();
    destroyedElementsRef.current.forEach((saved, el) => {
      el.style.visibility = '';
      el.style.opacity = '';
      el.style.transform = saved.originalTransform;
      el.style.transition = saved.originalTransition;
      el.style.filter = '';
    });
    destroyedElementsRef.current.clear();
    elementHpMap.current.clear();
    burnHolesRef.current = [];
    setDestroyedCount(0);
    setScore(0);
  };

  useEffect(() => {
    if (!isActive) {
      restoreElements();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      const pivotY = playerRef.current.y + playerRef.current.height / 2 - 2;
      const dx = e.clientX - (playerRef.current.x + playerRef.current.facing * 2);
      const dy = e.clientY - pivotY;
      playerRef.current.angle = Math.atan2(dy, dx);
      playerRef.current.facing = dx >= 0 ? 1 : -1;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('.game-hud-control')) return;
      mousePos.current.isDown = true;
    };

    const handleMouseUp = () => {
      mousePos.current.isDown = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.key === 'Escape') onClose();
      if (e.key.toLowerCase() === 'r') restoreElements();
      if (e.key.toLowerCase() === 'm') toggleMute();

      // Weapon Hotkeys 1-5
      if (e.key === '1') setCurrentWeapon('RIFLE');
      if (e.key === '2') setCurrentWeapon('SHOTGUN');
      if (e.key === '3') setCurrentWeapon('ROCKET');
      if (e.key === '4') setCurrentWeapon('LASER');
      if (e.key === '5') setCurrentWeapon('NUKE');
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    const handleTouchAim = (e: TouchEvent) => {
      // Find touches that aren't on the joystick or action buttons
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
        if (targetEl?.closest('.game-hud-control') || targetEl?.closest('.mobile-gamepad')) continue;
        mousePos.current.x = touch.clientX;
        mousePos.current.y = touch.clientY;
        const pivotY = playerRef.current.y + playerRef.current.height / 2 - 2;
        const dx = touch.clientX - (playerRef.current.x + playerRef.current.facing * 2);
        const dy = touch.clientY - pivotY;
        playerRef.current.angle = Math.atan2(dy, dx);
        playerRef.current.facing = dx >= 0 ? 1 : -1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchAim, { passive: true });
    window.addEventListener('touchstart', handleTouchAim, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Collect DOM elements that act as platforms and targets
    const getPlatformElements = (): DomPlatform[] => {
      const selectors = [
        'button',
        'a',
        'h1',
        'h2',
        'h3',
        'h4',
        'p',
        'img',
        'nav',
        '.nav-link',
        'span',
        'input',
        'form',
        '.ghost-border',
        'aside',
        '.border'
      ];
      const all = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')));
      const filtered = all.filter(el => {
        if (el.closest('.game-hud-control') || el.closest('#game-canvas-container')) return false;
        if (destroyedElementsRef.current.has(el)) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 12 && rect.height > 12 && rect.top < window.innerHeight && rect.bottom > 0;
      });

      return filtered.map(el => {
        const rect = el.getBoundingClientRect();
        if (!elementHpMap.current.has(el)) {
          // Calculate HP based on visual size
          const baseHp = Math.max(25, Math.min(250, Math.round(rect.width * rect.height * 0.008)));
          elementHpMap.current.set(el, baseHp);
        }
        return {
          element: el,
          rect,
          hp: elementHpMap.current.get(el) || 25,
          maxHp: 25
        };
      });
    };

    // Calculate initial target count for percentage tracker
    setTimeout(() => {
      const initialTargets = getPlatformElements().length;
      setTotalDOMCount(Math.max(50, initialTargets));
    }, 200);

    // Weapon shooting implementation
    const shootWeapon = (weaponKey: WeaponType) => {
      const wp = WEAPONS[weaponKey];
      const p = playerRef.current;
      const angle = p.angle;
      // Gun muzzle exactly aligns with gun barrel tip and laser sight
      const pivotX = p.x + p.facing * 2;
      const pivotY = p.y + p.height / 2 - 2;
      const barrelLength = (weaponKey === 'ROCKET' || weaponKey === 'NUKE') ? 42 : 32;
      const gunMuzzleX = pivotX + Math.cos(angle) * barrelLength;
      const gunMuzzleY = pivotY + Math.sin(angle) * barrelLength;

      for (let i = 0; i < wp.count; i++) {
        const spreadOffset = (Math.random() - 0.5) * wp.spread;
        const finalAngle = angle + spreadOffset;
        bulletsRef.current.push({
          x: gunMuzzleX,
          y: gunMuzzleY,
          vx: Math.cos(finalAngle) * wp.speed,
          vy: Math.sin(finalAngle) * wp.speed,
          type: weaponKey,
          color: wp.color,
          size: wp.size,
          life: 0
        });
      }

      // Gun recoil pushes player backwards slightly (rocket jump physics!)
      if (wp.isExplosive) {
        p.vx -= Math.cos(angle) * 3.5;
        p.vy -= Math.sin(angle) * 3.5;
      }

      // Play procedural weapon sound & eject casing ping
      soundEngine.playShoot(weaponKey);
      if (weaponKey === 'RIFLE' || weaponKey === 'SHOTGUN') {
        soundEngine.playCasing();
      }

      // Muzzle flash sparks & ejected brass shell casing
      for (let s = 0; s < 6; s++) {
        particlesRef.current.push({
          x: gunMuzzleX,
          y: gunMuzzleY,
          vx: Math.cos(angle + (Math.random() - 0.5) * 0.8) * (Math.random() * 8 + 3),
          vy: Math.sin(angle + (Math.random() - 0.5) * 0.8) * (Math.random() * 8 + 3),
          color: Math.random() > 0.4 ? '#FFCC00' : '#FF4500',
          size: Math.random() * 3 + 2,
          life: 1,
          maxLife: 14
        });
      }

      // Eject realistic brass bullet casing backwards out of the receiver chamber
      const ejectAngle = angle + (p.facing === 1 ? -Math.PI / 2 : Math.PI / 2) + (Math.random() - 0.5) * 0.4;
      const ejectSpeed = Math.random() * 4 + 3;
      particlesRef.current.push({
        x: p.x + p.facing * 8,
        y: p.y + 4,
        vx: Math.cos(ejectAngle) * ejectSpeed - p.vx * 0.3,
        vy: -Math.random() * 5 - 2, // pop upwards
        color: '#D4AF37', // Polished brass cartridge color
        size: 3.5,
        life: 1,
        maxLife: 45,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 25
      });
    };

    // Damage a DOM element with localized bullet impact, burn holes & small chipping shards
    const damageElement = (el: HTMLElement, rect: DOMRect, dmg: number, hitX?: number, hitY?: number) => {
      if (destroyedElementsRef.current.has(el)) return;
      const currentHp = (elementHpMap.current.get(el) || 80) - dmg;
      elementHpMap.current.set(el, currentHp);

      // Default hit position to element center if not provided
      const hX = hitX ?? (rect.left + rect.width / 2);
      const hY = hitY ?? (rect.top + rect.height / 2);

      // Play impact scorch / crackle sizzle
      soundEngine.playBurnHit();

      // Get computed styles for accurate colors
      const computedStyle = window.getComputedStyle(el);
      const textColor = computedStyle.color || '#FFFFFF';
      const bgColor = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyle.backgroundColor !== 'transparent'
        ? computedStyle.backgroundColor 
        : '#1E2028';
      const borderColor = computedStyle.borderColor || '#3F4450';

      // 1. CHIP OFF SMALL LOCALIZED FALLING PIECES FROM BUTTON (Clean mechanical destruction, no flame!)
      const numSmallChips = Math.min(4, Math.max(2, Math.floor(dmg / 12)));
      for (let c = 0; c < numSmallChips; c++) {
        const chipW = Math.random() * 6 + 4; // Small 4-10px fragments
        const chipH = Math.random() * 6 + 4;
        particlesRef.current.push({
          x: hX + (Math.random() - 0.5) * 8,
          y: hY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 4 - 1.5, // Pop up slightly then fall
          color: textColor,
          size: Math.max(chipW, chipH),
          width: chipW,
          height: chipH,
          bgColor,
          borderColor,
          life: 1,
          maxLife: 240, // Falls to floor & bounces
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 20,
          isDebris: true,
          bounceCount: 0
        });
      }

      // 2. IF TEXT HIT: Knock out 1-2 letters near the hit spot
      const textContent = (el.innerText || el.textContent || '').trim();
      if (textContent.length > 0 && Math.random() > 0.4) {
        const letters = textContent.replace(/\s+/g, '');
        const randomChar = letters[Math.floor(Math.random() * letters.length)];
        if (randomChar) {
          particlesRef.current.push({
            x: hX + (Math.random() - 0.5) * 6,
            y: hY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 5 - 2,
            color: textColor,
            size: 12,
            life: 1,
            maxLife: 260,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 16,
            isDebris: true,
            char: randomChar,
            bounceCount: 0
          });
        }
      }

      // 3. Hit Recoil & Impact Reaction (Clean button impact recoil, no flame/burning glow)
      if (currentHp > 0) {
        el.style.transition = 'all 0.1s ease-out';
        el.style.transform = `scale(0.97) translate(${(Math.random() - 0.5) * 5}px, ${(Math.random() - 0.5) * 5}px)`;

        setTimeout(() => {
          if (!destroyedElementsRef.current.has(el)) {
            el.style.transform = '';
          }
        }, 110);
        return;
      }

      // FULL DESTRUCTION: Only occurs after sustained fire when HP drops to 0!
      if (!destroyedElementsRef.current.has(el)) {
        destroyedElementsRef.current.set(el, {
          originalTransform: el.style.transform,
          originalTransition: el.style.transition
        });
      }

      setDestroyedCount(c => c + 1);
      setScore(s => s + Math.max(15, Math.round(rect.width * rect.height * 0.05)));

      // Play element collapse fire explosion
      soundEngine.playExplosion(false);

      // Hide original DOM element
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';

      // Shatter remaining structure into tumbling small chunks
      const finalCols = Math.min(5, Math.max(2, Math.floor(rect.width / 20)));
      const finalRows = Math.min(3, Math.max(1, Math.floor(rect.height / 18)));
      const fShardW = rect.width / finalCols;
      const fShardH = rect.height / finalRows;

      for (let c = 0; c < finalCols; c++) {
        for (let r = 0; r < finalRows; r++) {
          particlesRef.current.push({
            x: rect.left + c * fShardW + fShardW / 2,
            y: rect.top + r * fShardH + fShardH / 2,
            vx: (Math.random() - 0.5) * 6 + (c - finalCols / 2) * 1.2,
            vy: -Math.random() * 6 - 2,
            color: textColor,
            size: Math.max(fShardW, fShardH),
            width: fShardW,
            height: fShardH,
            bgColor,
            borderColor,
            life: 1,
            maxLife: 300,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 16,
            isDebris: true,
            bounceCount: 0
          });
        }
      }

      // 3. Incendiary Sparks & Burning Ash Cloud
      const particleCount = Math.min(25, Math.max(10, Math.round((rect.width * rect.height) / 250)));
      for (let p = 0; p < particleCount; p++) {
        const px = rect.left + Math.random() * rect.width;
        const py = rect.top + Math.random() * rect.height;
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 8 + 2;
        particlesRef.current.push({
          x: px,
          y: py,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 2,
          color: ['#FF1100', '#FF4500', '#FF8800', '#FFCC00', '#FFF5B8'][Math.floor(Math.random() * 5)],
          size: Math.random() * 5 + 2,
          life: 1,
          maxLife: Math.random() * 30 + 15,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 15
        });
      }
    };

    // Explosion blast wave
    const triggerExplosion = (x: number, y: number, radius: number, dmg: number, platforms: DomPlatform[]) => {
      // Audio explosion
      soundEngine.playExplosion(radius > 300);

      // Screen shake particles & flash ring
      for (let p = 0; p < 45; p++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 14 + 4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          color: Math.random() > 0.4 ? '#FF2A85' : '#FFCC00',
          size: Math.random() * 8 + 3,
          life: 1,
          maxLife: Math.random() * 30 + 15
        });
      }

      // Rocket jump impulse on player if caught in blast
      const p = playerRef.current;
      const pdx = p.x - x;
      const pdy = p.y - y;
      const pDist = Math.hypot(pdx, pdy);
      if (pDist < radius + 40 && pDist > 5) {
        const force = (1 - pDist / (radius + 40)) * 18;
        p.vx += (pdx / pDist) * force;
        p.vy += (pdy / pDist) * force;
      }

      // Damage all nearby elements within radius
      platforms.forEach(plat => {
        const cx = plat.rect.left + plat.rect.width / 2;
        const cy = plat.rect.top + plat.rect.height / 2;
        const dist = Math.hypot(cx - x, cy - y);
        if (dist <= radius) {
          const falloff = 1 - dist / radius;
          damageElement(plat.element, plat.rect, dmg * falloff);
        }
      });
    };

    // MAIN GAME LOOP (Physics, Platforms, Shooting, Character Rendering)
    const gameLoop = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = playerRef.current;
      const platforms = getPlatformElements();

      // --- 1. Continuous Auto-Fire If Mouse Held Down ---
      const activeWp = WEAPONS[currentWeapon];
      if (mousePos.current.isDown && timestamp - lastShotTime.current >= activeWp.fireRate) {
        lastShotTime.current = timestamp;
        shootWeapon(currentWeapon);
      }

      // --- 2. Character Platformer Physics ---
      const isMobile = isTouchDevice || ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const gravity = 0.58;
      // Calibrate speed: 4.2 on mobile touch for smooth precision, 7.5 on desktop keyboard
      const maxSpeed = isMobile ? 4.2 : 7.5;
      const acceleration = isMobile ? 0.45 : 0.85;
      const friction = isMobile ? 0.82 : 0.84;

      // Horizontal controls (A / D / Arrow Keys + Virtual Joystick)
      let joyX = 0;
      let joyY = 0;
      if (joystickRef.current.active) {
        const dx = joystickRef.current.currX - joystickRef.current.startX;
        const dy = joystickRef.current.currY - joystickRef.current.startY;
        const dist = Math.hypot(dx, dy);
        if (dist > 8) {
          joyX = Math.max(-1, Math.min(1, dx / 40));
          joyY = Math.max(-1, Math.min(1, dy / 40));
          // Face in direction of joystick
          if (Math.abs(joyX) > 0.25) {
            p.facing = joyX > 0 ? 1 : -1;
          }
        }
      }

      if (keysPressed.current['a'] || keysPressed.current['arrowleft'] || joyX < -0.2) {
        const intensity = joyX < -0.2 ? Math.abs(joyX) : 1;
        p.vx = Math.max(-maxSpeed, p.vx - acceleration * intensity);
        p.walkFrame += 0.2;
      } else if (keysPressed.current['d'] || keysPressed.current['arrowright'] || joyX > 0.2) {
        const intensity = joyX > 0.2 ? joyX : 1;
        p.vx = Math.min(maxSpeed, p.vx + acceleration * intensity);
        p.walkFrame += 0.2;
      } else {
        p.vx *= friction;
      }

      // Jump / Jetpack controls (W / Space / Up Arrow / Joystick UP / Button A)
      const isJumpKeyDown = keysPressed.current['w'] || keysPressed.current[' '] || keysPressed.current['arrowup'] || keysPressed.current['touch_jump'] || joyY < -0.45;
      if (isJumpKeyDown) {
        if (p.isGrounded) {
          p.vy = -12.5; // High initial jump
          p.isGrounded = false;
          p.jumpCount = 1;
        } else if (p.jetpackFuel > 0) {
          // Sustained jetpack hover thrust
          p.vy = Math.max(-8, p.vy - 0.7);
          p.jetpackFuel = Math.max(0, p.jetpackFuel - 1.2);
          soundEngine.playJetpackThrust();

          // Jetpack thruster sparks
          particlesRef.current.push({
            x: p.x - p.facing * 8,
            y: p.y + 24,
            vx: (Math.random() - 0.5) * 3 - p.vx * 0.2,
            vy: Math.random() * 6 + 3,
            color: Math.random() > 0.5 ? '#00F0FF' : '#FFCC00',
            size: Math.random() * 4 + 2,
            life: 1,
            maxLife: 14
          });
        }
      }

      // Apply Gravity
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;

      // Bounds checking (Window sides)
      if (p.x < 20) { p.x = 20; p.vx = 0; }
      if (p.x > window.innerWidth - 20) { p.x = window.innerWidth - 20; p.vx = 0; }

      // --- 3. DOM Platform Collision Detection ---
      p.isGrounded = false;

      // Floor boundary
      const floorY = window.innerHeight - 30;
      if (p.y + p.height >= floorY) {
        p.y = floorY - p.height;
        p.vy = 0;
        p.isGrounded = true;
        p.jetpackFuel = Math.min(100, p.jetpackFuel + 2.5);
      }

      // Check collision with DOM elements (Buttons, Navbar, Cards)
      for (const plat of platforms) {
        const r = plat.rect;
        // Check if player feet land on top of DOM element
        const playerBottom = p.y + p.height;
        const playerPrevBottom = playerBottom - p.vy;

        if (
          p.x + p.width / 2 > r.left &&
          p.x - p.width / 2 < r.right &&
          playerPrevBottom <= r.top + 10 &&
          playerBottom >= r.top &&
          p.vy >= 0
        ) {
          p.y = r.top - p.height;
          p.vy = 0;
          p.isGrounded = true;
          p.jetpackFuel = Math.min(100, p.jetpackFuel + 3.0);
          break;
        }
      }

      // --- 4. Update and Render Bullets ---
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life++;

        // Draw weapon projectile (Incendiary Tracer with hot core)
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillStyle = b.color;

        // Burning bullet core
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();

        // White hot center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(b.x, b.y, Math.max(1.5, b.size * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Projectile fire tracer streak
        ctx.strokeStyle = b.color;
        ctx.lineWidth = Math.max(2, b.size * 0.8);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 0.8, b.y - b.vy * 0.8);
        ctx.stroke();
        ctx.restore();

        // Screen boundary cull
        if (b.x < -60 || b.x > window.innerWidth + 60 || b.y < -60 || b.y > window.innerHeight + 60) {
          bulletsRef.current.splice(i, 1);
          continue;
        }

        // Bullet collision with DOM elements
        let hit = false;
        for (const plat of platforms) {
          const r = plat.rect;
          if (b.x >= r.left && b.x <= r.right && b.y >= r.top && b.y <= r.bottom) {
            hit = true;
            const wp = WEAPONS[b.type];

            if (wp.isExplosive) {
              triggerExplosion(b.x, b.y, wp.blastRadius || 180, wp.damage, platforms);
            } else {
              damageElement(plat.element, r, wp.damage, b.x, b.y);

              // Bullet impact sparks
              for (let s = 0; s < 8; s++) {
                const spAngle = Math.random() * Math.PI * 2;
                particlesRef.current.push({
                  x: b.x,
                  y: b.y,
                  vx: Math.cos(spAngle) * (Math.random() * 6 + 2),
                  vy: Math.sin(spAngle) * (Math.random() * 6 + 2),
                  color: wp.trailColor,
                  size: Math.random() * 3 + 1,
                  life: 1,
                  maxLife: 15
                });
              }
            }
            break;
          }
        }

        if (hit) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // --- 5. Render Particle Shards, Shattered Text & Falling Blocks ---
      const floorLevel = window.innerHeight - 25;

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life++;

        if (pt.isDebris) {
          // Gravity for realistic tumbling DOM blocks & characters
          pt.vy += 0.45;
          pt.vx *= 0.985; // Air resistance

          if (pt.rotation !== undefined && pt.vRot !== undefined) {
            pt.rotation += pt.vRot;
          }

          // Floor bounce and piling physics
          if (pt.y >= floorLevel) {
            pt.y = floorLevel;
            pt.vy = -pt.vy * 0.38; // Bounce dampening
            pt.vx *= 0.75; // Ground friction
            pt.vRot = (pt.vRot || 0) * 0.65;
            if (pt.bounceCount !== undefined) pt.bounceCount++;
            if (Math.abs(pt.vy) < 0.6) {
              pt.vy = 0;
              pt.vRot = 0;
            }
          }

          // Also allow debris to bounce on top of intact platforms!
          for (const plat of platforms) {
            const r = plat.rect;
            if (
              pt.x >= r.left &&
              pt.x <= r.right &&
              pt.y >= r.top &&
              pt.y <= r.top + 12 &&
              pt.vy > 0
            ) {
              pt.y = r.top;
              pt.vy = -pt.vy * 0.32;
              pt.vx *= 0.7;
              pt.vRot = (pt.vRot || 0) * 0.6;
              break;
            }
          }

          // Calculate fadeout near end of lifetime
          const alpha = pt.life > pt.maxLife - 40 
            ? Math.max(0, (pt.maxLife - pt.life) / 40) 
            : 1;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(pt.x, pt.y);
          if (pt.rotation) ctx.rotate((pt.rotation * Math.PI) / 180);

          if (pt.char) {
            // RENDER FALLING TEXT CHARACTER (e.g. 'D', 'e', 'v', 'O', 'p', 's')
            ctx.font = 'bold 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
            ctx.fillStyle = pt.color || '#FFFFFF';
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pt.char, 0, 0);
          } else {
            // RENDER SHATTERED BUTTON BLOCK / RECTANGULAR GEOMETRIC SHARD
            const w = pt.width || pt.size;
            const h = pt.height || pt.size;
            ctx.fillStyle = pt.bgColor || '#1E2028';
            ctx.strokeStyle = pt.borderColor || 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.fillRect(-w / 2, -h / 2, w, h);
            ctx.strokeRect(-w / 2, -h / 2, w, h);

            // Shard highlight edge
            ctx.fillStyle = 'rgba(255,255,255,0.06)';
            ctx.fillRect(-w / 2, -h / 2, w, 2);
          }

          ctx.restore();

        } else if (pt.isFlame) {
          // REAL ORGANIC FLAME DYNAMICS (Thermal updraft, turbulence & cooling)
          pt.vy -= 0.08; // upward heat acceleration
          pt.vx += (Math.random() - 0.5) * 0.4; // gentle air turbulence
          const lifeProgress = pt.life / pt.maxLife; // 0 (birth) -> 1 (death)

          // Color shifts realistically: Intense White-Yellow -> Vibrant Orange -> Smoldering Red -> Black Smoke
          let flameColor = '#FFF2B2';
          if (lifeProgress > 0.65) {
            flameColor = 'rgba(120, 20, 5, 0.6)'; // deep smoldering ash-red
          } else if (lifeProgress > 0.35) {
            flameColor = 'rgba(235, 75, 10, 0.85)'; // natural orange flame
          } else if (lifeProgress > 0.15) {
            flameColor = 'rgba(255, 185, 30, 0.95)'; // bright golden fire
          }

          const curSize = pt.size * (1 - lifeProgress * 0.55); // flames taper as they rise
          const alpha = Math.max(0, 1 - lifeProgress);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = flameColor;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1, curSize), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (pt.isSmoke) {
          // REALISTIC DRIFTING GRAY SMOKE PUFFS
          pt.vy -= 0.02; // slow rising smoke
          pt.vx += (Math.random() - 0.5) * 0.25;
          const lifeProgress = pt.life / pt.maxLife;
          const smokeSize = pt.size * (1 + lifeProgress * 1.5); // smoke expands as it disperses
          const alpha = Math.max(0, (1 - lifeProgress) * 0.35);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = 'rgb(65, 60, 55)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, smokeSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else {
          // Standard ash particle physics
          pt.vy += 0.32; // Gravity on ember rubble
          if (pt.rotation !== undefined && pt.vRot !== undefined) pt.rotation += pt.vRot;

          const alpha = Math.max(0, 1 - pt.life / pt.maxLife);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = pt.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = pt.color;

          ctx.translate(pt.x, pt.y);
          if (pt.rotation) ctx.rotate((pt.rotation * Math.PI) / 180);
          ctx.fillRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size);
          ctx.restore();
        }

        if (pt.life >= pt.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // --- 6. Render Animated Character Holding Gun (Classic Platformer Commando) ---
      ctx.save();
      ctx.translate(p.x, p.y + p.height / 2);

      // Shadow underneath character
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(0, p.height / 2 + 2, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Facing direction flip
      ctx.scale(p.facing, 1);

      // Military Tactical Backpack / Gear
      ctx.fillStyle = '#4A4E38'; // Army olive drab
      ctx.strokeStyle = '#282B1E';
      ctx.lineWidth = 1.5;
      ctx.fillRect(-15, -12, 7, 19);
      ctx.strokeRect(-15, -12, 7, 19);

      // Backpack buckle strap
      ctx.fillStyle = '#1A1C14';
      ctx.fillRect(-16, -2, 9, 3);

      // Animated Commando Legs (Army camo / charcoal trousers)
      const legCycle = Math.sin(p.walkFrame) * 8;
      ctx.fillStyle = '#373A40'; // Combat pants
      ctx.strokeStyle = '#1F2024';
      ctx.lineWidth = 3.5;

      // Left Leg & Combat Boot
      ctx.beginPath();
      ctx.moveTo(-4, 7);
      ctx.lineTo(-4 + legCycle, 19);
      ctx.stroke();

      ctx.fillStyle = '#1B1C1E'; // Boot
      ctx.fillRect(-6 + legCycle, 17, 7, 5);

      // Right Leg & Combat Boot
      ctx.beginPath();
      ctx.moveTo(4, 7);
      ctx.lineTo(4 - legCycle, 19);
      ctx.stroke();

      ctx.fillStyle = '#1B1C1E'; // Boot
      ctx.fillRect(2 - legCycle, 17, 7, 5);

      // Commando Body (Tactical Vest & Shirt)
      ctx.fillStyle = '#444C38'; // Olive tactical vest
      ctx.strokeStyle = '#22261C';
      ctx.lineWidth = 2;
      ctx.fillRect(-9, -10, 18, 19);
      ctx.strokeRect(-9, -10, 18, 19);

      // Tactical Vest Pouches
      ctx.fillStyle = '#2B3023';
      ctx.fillRect(-7, -4, 5, 6);
      ctx.fillRect(1, -4, 5, 6);

      // Neck & Head
      ctx.fillStyle = '#D9A066'; // Natural skin tone
      ctx.beginPath();
      ctx.arc(0, -17, 9, 0, Math.PI * 2);
      ctx.fill();

      // Commando Hair / Tactical Beanie (Dark Brown / Black)
      ctx.fillStyle = '#2C221E';
      ctx.beginPath();
      ctx.arc(0, -19, 9, Math.PI, Math.PI * 2);
      ctx.fill();

      // Red Bandana / Headband (Classic action hero style!)
      ctx.fillStyle = '#D62828'; // Crimson cloth bandana
      ctx.fillRect(-9, -21, 18, 4);

      // Bandana tail flapping behind head
      ctx.beginPath();
      ctx.moveTo(-9, -20);
      ctx.lineTo(-16, -18 + Math.sin(p.walkFrame) * 3);
      ctx.lineTo(-9, -17);
      ctx.fill();

      // Eyes / Brow
      ctx.fillStyle = '#1C1917';
      ctx.fillRect(3, -18, 3, 2);

      // Aiming Weapon & Arms
      const aimAngle = p.facing === 1 ? p.angle : Math.PI - p.angle;
      ctx.save();
      ctx.translate(2, -2);
      ctx.rotate(aimAngle);

      // Arm with skin tone
      ctx.strokeStyle = '#D9A066';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(10, 2);
      ctx.stroke();

      // Gun Model (Realistic steel/matte-black gunmetal)
      ctx.fillStyle = '#22252A'; // Gunmetal dark steel
      ctx.strokeStyle = '#111215';
      ctx.lineWidth = 1.5;

      // Draw weapon model
      let gunMuzzleOffset = 32;
      if (currentWeapon === 'ROCKET' || currentWeapon === 'NUKE') {
        gunMuzzleOffset = 42;
        // RPG Launcher Body
        ctx.fillStyle = '#3F4436'; // Military green tube
        ctx.fillRect(6, -6, 28, 12);
        ctx.strokeRect(6, -6, 28, 12);

        // Rocket nosecone
        ctx.fillStyle = currentWeapon === 'NUKE' ? '#E63946' : '#C77800';
        ctx.beginPath();
        ctx.moveTo(34, -6);
        ctx.lineTo(44, 0);
        ctx.lineTo(34, 6);
        ctx.fill();
      } else if (currentWeapon === 'SHOTGUN') {
        gunMuzzleOffset = 32;
        // Heavy Shotgun (Steel + wooden pump grip)
        ctx.fillRect(6, -5, 25, 9);
        ctx.strokeRect(6, -5, 25, 9);
        // Wooden grip
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(14, -2, 7, 5);
      } else {
        gunMuzzleOffset = 32;
        // Tactical Assault Rifle
        ctx.fillRect(6, -4, 25, 8);
        ctx.strokeRect(6, -4, 25, 8);
        // Magazine clip
        ctx.fillStyle = '#181A1D';
        ctx.fillRect(13, 4, 5, 8);
        // Sight
        ctx.fillRect(8, -7, 4, 3);
      }

      // Tactical Laser Sight directly along and above weapon trajectory
      ctx.strokeStyle = `${activeWp.color}99`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(gunMuzzleOffset, 0);
      ctx.lineTo(gunMuzzleOffset + 380, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
      ctx.restore();

      // Next frame
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchAim);
      window.removeEventListener('touchstart', handleTouchAim);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      exitLandscape();
      restoreElements();
    };
  }, [isActive, currentWeapon]);

  if (!isActive) return null;

  const destroyedPercent = Math.min(100, Math.round((destroyedCount / Math.max(1, totalDOMCount)) * 100));

  return (
    <div id="game-canvas-container" className="fixed inset-0 z-[99999] pointer-events-none select-none">
      {/* Interactive Physics Canvas */}
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-crosshair" />

      {/* DOMolition Tactical Weapon Selector & HUD Header (Fully responsive on mobile & desktop) */}
      <div className="game-hud-control fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-1.5 sm:py-2.5 bg-[#090b0e]/95 backdrop-blur-2xl border border-primary/40 shadow-[0_0_40px_rgba(199,120,221,0.35)] rounded-2xl text-white pointer-events-auto max-w-[calc(100vw-1rem)] overflow-x-auto">
        
        {/* DOMolition Title & Destruction Progress Meter */}
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-[90px] sm:min-w-[130px] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-primary">
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse" />
            <span>DOMOLITION</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-grow bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-[#FF2A85] transition-all duration-300"
                style={{ width: `${destroyedPercent}%` }}
              />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-tertiary">{destroyedPercent}%</span>
          </div>
        </div>

        <div className="h-6 sm:h-8 w-px bg-white/15 shrink-0"></div>

        {/* Weapons Arsenal Selector (1-5) */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {(Object.keys(WEAPONS) as WeaponType[]).map((wpKey) => {
            const wp = WEAPONS[wpKey];
            const isSelected = currentWeapon === wpKey;
            return (
              <button
                key={wpKey}
                onClick={() => setCurrentWeapon(wpKey)}
                title={`${wp.name} (Press ${wp.key})`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(199,120,221,0.5)] scale-105' 
                    : 'bg-surface-container-low border-outline-variant/30 text-tertiary hover:border-primary/50'
                }`}
              >
                <span className="text-sm">{wp.icon}</span>
                <span className="hidden sm:inline font-bold">{wp.name}</span>
                <span className="text-[10px] opacity-60 font-mono bg-black/40 px-1 rounded">[{wp.key}]</span>
              </button>
            );
          })}
        </div>

        {/* Current Active Weapon indicator on mobile */}
        <div className="flex sm:hidden items-center gap-1.5 px-2 py-1 bg-primary/20 border border-primary/40 rounded-lg font-mono text-[11px] shrink-0">
          <span>{WEAPONS[currentWeapon].icon}</span>
          <span className="font-bold text-white text-[10px]">{WEAPONS[currentWeapon].name.split(' ')[0]}</span>
        </div>

        <div className="h-6 sm:h-8 w-px bg-white/15 shrink-0"></div>

        {/* Dedicated Score & Wrecked Telemetry Mini-Box */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 px-2.5 sm:px-3.5 py-1 bg-[#05070a]/90 border border-primary/40 rounded-xl shadow-[inset_0_0_12px_rgba(0,0,0,0.6),0_0_15px_rgba(199,120,221,0.2)] font-mono shrink-0">
          <div className="text-center">
            <span className="text-tertiary/80 text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold leading-none mb-0.5">WRECKED</span>
            <span className="text-[#FF2A85] font-extrabold text-xs sm:text-sm leading-none">{destroyedCount}</span>
          </div>
          <div className="w-px h-5 sm:h-6 bg-white/20"></div>
          <div className="text-center min-w-[42px] sm:min-w-[50px]">
            <span className="text-tertiary/80 text-[8px] sm:text-[9px] uppercase tracking-wider block font-bold leading-none mb-0.5">SCORE</span>
            <span className="text-[#00F0FF] font-extrabold text-xs sm:text-sm leading-none">{score}</span>
          </div>
        </div>

        <div className="h-6 sm:h-8 w-px bg-white/15 shrink-0"></div>

        {/* Reset & Exit Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Mute/Unmute Toggle Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Audio (M)" : "Mute Audio (M)"}
            className={`p-1.5 border rounded-lg transition-all cursor-pointer ${
              isMuted 
                ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white' 
                : 'bg-surface-container-high border-outline-variant/30 text-primary hover:border-primary hover:bg-primary/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          <button
            onClick={restoreElements}
            title="Restore Website Elements (R)"
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-surface-container-high border border-outline-variant/30 hover:border-primary text-xs font-mono rounded-lg hover:bg-primary/20 transition-all text-on-surface cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span> <span className="opacity-60 hidden sm:inline">[R]</span>
          </button>

          <button
            onClick={onClose}
            title="Exit Game (ESC)"
            className="p-1.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Jetpack Fuel Gauge & Controls HUD (Bottom Left on Desktop Non-Touch Screens) */}
      {!isTouchDevice && (
        <div className="game-hud-control fixed bottom-6 left-6 px-4 py-3 bg-[#090b0e]/90 backdrop-blur-xl border border-outline-variant/25 rounded-xl text-[11px] font-mono text-tertiary space-y-2 pointer-events-none hidden md:block">
          <div className="flex items-center justify-between text-[10px] text-primary font-bold">
            <span>JETPACK THRUSTERS</span>
            <span>SPACE / W</span>
          </div>
          <div className="w-44 h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-[#00F0FF]"
              style={{ width: `${playerRef.current.jetpackFuel}%` }}
            />
          </div>
          <div className="text-[10px] opacity-70 leading-relaxed border-t border-white/10 pt-1.5 space-y-0.5">
            <div><span className="text-white font-bold">A / D</span>: Run left/right</div>
            <div><span className="text-white font-bold">W / Space</span>: Jump & Jetpack</div>
            <div><span className="text-white font-bold">Left Click</span>: Fire weapon</div>
            <div><span className="text-white font-bold">1 - 5</span>: Switch Weapons</div>
            <div><span className="text-white font-bold">R</span>: Rebuild Website</div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOUCH CONTROLS: JOYSTICK (LEFT) + ACTION BUTTONS (RIGHT) FOR MOBILE & TABLETS */}
      {/* ============================================================== */}
      <div className={`mobile-gamepad fixed inset-0 pointer-events-none z-[100000] select-none ${isTouchDevice ? 'block' : 'block md:hidden'}`}>
        
        {/* Mobile/Tablet Portrait Rotation Prompt (Shown on touch devices in portrait mode) */}
        <div className="fixed inset-0 z-[100002] bg-[#090B0E]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none portrait:flex landscape:hidden pointer-events-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center mb-4 text-primary animate-pulse shadow-[0_0_25px_rgba(199,120,221,0.4)]">
            <Smartphone className="w-8 h-8 rotate-90" />
          </div>
          <h3 className="text-white font-mono font-bold text-base tracking-widest uppercase mb-1">
            Rotate to Landscape
          </h3>
          <p className="text-tertiary font-mono text-xs max-w-xs leading-relaxed mb-4">
            DOMolition requires landscape mode for the dual-thumb gamepad. Rotate your device sideways to play!
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => requestLandscape()}
              className="px-5 py-2.5 bg-primary text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(199,120,221,0.5)] cursor-pointer"
            >
              Lock Landscape
            </button>
            <button
              type="button"
              onClick={() => {
                exitLandscape();
                onClose();
              }}
              className="px-4 py-2.5 bg-white/10 text-white font-mono text-xs rounded-xl hover:bg-white/20 transition-all cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Floating Mobile Jetpack Fuel Indicator (Top Left under HUD in landscape) */}
        <div className="fixed top-14 sm:top-20 left-4 px-3 py-1.5 bg-[#090B0E]/85 backdrop-blur-md rounded-full border border-primary/30 flex items-center gap-2 font-mono text-[9px] text-white">
          <span className="text-primary font-bold">FUEL</span>
          <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-[#00F0FF] transition-all"
              style={{ width: `${playerRef.current.jetpackFuel}%` }}
            />
          </div>
        </div>

        {/* 1. VIRTUAL JOYSTICK - MOVEMENT (Bottom-Left Glassmorphic Circle) */}
        <div 
          onTouchStart={handleJoystickTouchStart}
          onTouchMove={handleJoystickTouchMove}
          onTouchEnd={handleJoystickTouchEnd}
          onTouchCancel={handleJoystickTouchEnd}
          className="fixed bottom-6 left-6 w-32 h-32 rounded-full bg-black/30 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center pointer-events-auto touch-none"
        >
          {/* Directional Guides */}
          <div className="absolute top-2 text-[9px] font-mono text-white/50 font-bold">▲</div>
          <div className="absolute bottom-2 text-[9px] font-mono text-white/50 font-bold">▼</div>
          <div className="absolute left-2 text-[9px] font-mono text-white/50 font-bold">◀</div>
          <div className="absolute right-2 text-[9px] font-mono text-white/50 font-bold">▶</div>
          
          {/* Inner Joystick Thumb Knob with Frosted Glass & Neon Core */}
          <div 
            style={{ 
              transform: `translate(${joystickVisual.dx}px, ${joystickVisual.dy}px)` 
            }}
            className={`w-14 h-14 rounded-full transition-transform duration-75 flex items-center justify-center font-mono text-xs font-bold ${
              joystickVisual.active 
                ? 'bg-primary/80 text-black backdrop-blur-md border border-white/40 shadow-[0_0_25px_#C778DD,inset_0_2px_4px_rgba(255,255,255,0.4)] scale-105' 
                : 'bg-white/10 text-white backdrop-blur-md border border-white/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]'
            }`}
          >
            MOVE
          </div>
        </div>

        {/* 2. GAMEPAD ACTION BUTTONS & AIM-AND-FIRE JOYSTICK (Bottom-Right Glassmorphic Cluster) */}
        <div className="fixed bottom-5 right-5 w-52 h-52 pointer-events-auto touch-none">
          <div className="relative w-full h-full">
            
            {/* Top-Right: ENLARGED JUMP & JETPACK THRUSTERS BUTTON (Placed on top-right where GUN was) */}
            <button
              type="button"
              onTouchStart={handleJumpStart}
              onTouchEnd={handleJumpEnd}
              onMouseDown={handleJumpStart}
              onMouseUp={handleJumpEnd}
              className="absolute top-0 right-1 w-16 h-16 rounded-full bg-emerald-500/25 backdrop-blur-2xl active:bg-emerald-500/60 text-emerald-300 font-mono font-bold border-2 border-emerald-400/50 shadow-[0_8px_30px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center leading-none active:scale-95 transition-all z-10"
            >
              <span className="text-base font-extrabold text-white">JUMP</span>
              <span className="text-[7px] font-bold opacity-90 text-emerald-200 mt-0.5">JETPACK</span>
            </button>

            {/* Top-Left: RESET DOM Button (Glass Cyan/Teal) */}
            <button
              type="button"
              onTouchStart={(e) => { e.preventDefault(); restoreElements(); }}
              onClick={restoreElements}
              className="absolute top-2 left-2 w-12 h-12 rounded-full bg-cyan-400/20 backdrop-blur-xl active:bg-cyan-400/50 text-cyan-300 font-mono font-bold text-sm border border-cyan-400/40 shadow-[0_4px_20px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center leading-none active:scale-95 transition-all z-10"
            >
              <span>X</span>
              <span className="text-[7px] font-bold opacity-90 text-cyan-200">RESET</span>
            </button>

            {/* Center-Right: ENLARGED FIRE & AIM JOYSTICK BUTTON (360° Drag to Aim & Fire, or Tap to Fire) */}
            <div
              onTouchStart={handleFireJoystickTouchStart}
              onTouchMove={handleFireJoystickTouchMove}
              onTouchEnd={handleFireJoystickTouchEnd}
              onTouchCancel={handleFireJoystickTouchEnd}
              className="absolute bottom-2 right-0 w-24 h-24 rounded-full bg-rose-500/20 backdrop-blur-2xl border-2 border-rose-400/50 shadow-[0_8px_30px_rgba(244,63,94,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center justify-center pointer-events-auto touch-none z-10"
            >
              {/* Subtle 360 Aim Crosshairs */}
              <div className="absolute top-1.5 text-[7px] font-mono text-rose-300/40">▲</div>
              <div className="absolute bottom-1.5 text-[7px] font-mono text-rose-300/40">▼</div>
              <div className="absolute left-1.5 text-[7px] font-mono text-rose-300/40">◀</div>
              <div className="absolute right-1.5 text-[7px] font-mono text-rose-300/40">▶</div>

              {/* Fire Inner Joystick Knob */}
              <div 
                style={{ 
                  transform: `translate(${fireJoystickVisual.dx}px, ${fireJoystickVisual.dy}px)` 
                }}
                className={`w-14 h-14 rounded-full transition-transform duration-75 flex flex-col items-center justify-center font-mono leading-none ${
                  fireJoystickVisual.active 
                    ? 'bg-rose-500 text-white shadow-[0_0_25px_#F43F5E,inset_0_2px_4px_rgba(255,255,255,0.4)] scale-110' 
                    : 'bg-rose-500/35 text-rose-100 backdrop-blur-md border border-rose-300/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]'
                }`}
              >
                <span className="text-sm font-extrabold tracking-wider">FIRE</span>
                <span className="text-[7px] font-mono opacity-80 mt-0.5">AIM 🕹️</span>
              </div>
            </div>

            {/* Bottom-Left: GUN / CYCLE WEAPON Button (Glass Gold/Amber, placed where JUMP was) */}
            <button
              type="button"
              onTouchStart={(e) => { e.preventDefault(); cycleWeapon(); }}
              onClick={cycleWeapon}
              className="absolute bottom-2 left-3 w-13 h-13 rounded-full bg-amber-400/20 backdrop-blur-xl active:bg-amber-400/50 text-amber-300 font-mono font-bold text-sm border-2 border-amber-400/45 shadow-[0_4px_20px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center leading-none active:scale-95 transition-all z-10"
            >
              <span className="text-sm font-extrabold">GUN</span>
              <span className="text-[7px] font-bold opacity-90 text-amber-200 mt-0.5">CYCLE [Y]</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
