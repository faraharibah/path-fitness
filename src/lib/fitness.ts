export type Sport = 'Running' | 'Trail Running' | 'Cycling' | 'Swimming' | 'Yoga' | 'Pilates' | 'Strength Training' | 'Walking' | 'Hiking' | 'HIIT';
export type PlanMode = 'race' | 'lifestyle';
export type SessionType = 'Easy' | 'Tempo' | 'Intervals' | 'Long' | 'Rest' | 'Strength' | 'Mobility' | 'Cross-training';

export interface UserProfile {
  name: string;
  email: string;
  goal: 'Race Prep' | 'Habit & Consistency';
  mode: PlanMode;
  targetEvent: '5K' | '10K' | 'Half Marathon' | 'Full Marathon' | 'Trail Ultra';
  raceDate: string;
  baseline5kMinutes: number;
  daysPerWeek: 3 | 4 | 5;
  preferredLongRunDay: 'Saturday' | 'Sunday';
  terrainPreference: 'Road' | 'Trail' | 'Hybrid';
  maxHeartRate: number;
  weeklyTargetDays: number;
  routine: Record<number, Sport | ''>;
}

export interface WorkoutSession {
  id: string;
  dayIndex: number;
  title: string;
  type: SessionType;
  sport: Sport | 'Rest';
  targetDistanceKm: number;
  targetPaceMinPerKm: string;
  targetRPE: number;
  targetElevationGainMeters?: number;
  targetHRZone: { zoneNumber: number; zoneName: string; minBpm: number; maxBpm: number };
  completed: boolean;
  actualDistanceKm?: number;
  actualDurationMin?: number;
  actualRPE?: number;
  actualElevationGainMeters?: number;
  metrics?: Record<string, string | number>;
  notes?: string;
  date: string;
  isTrailMode: boolean;
  isShortened: boolean;
  isLowEnergy: boolean;
  gpxTrack?: [number, number, number][];
}

export interface FitnessUser { id: string; name: string; email: string; goal: 'Race Prep' | 'Habit & Consistency' }
export interface AppData { user: FitnessUser; profile: UserProfile; sessions: WorkoutSession[]; activities: WorkoutSession[]; streak: number; bestStreak: number; theme: 'light' | 'dark'; createdAt: string }

export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const sports: Sport[] = ['Yoga', 'Pilates', 'Strength Training', 'Running', 'Trail Running', 'Cycling', 'Swimming', 'Walking', 'Hiking', 'HIIT'];
export const sportIcons: Record<Sport | 'Rest', string> = { Running: '🏃', 'Trail Running': '⛰️', Cycling: '🚴', Swimming: '🏊', Yoga: '🧘', Pilates: '🤸', 'Strength Training': '🏋️', Walking: '🚶', Hiking: '🥾', HIIT: '⚡', Rest: '🌿' };

export const initialProfile: UserProfile = {
  name: '', email: '', goal: 'Race Prep', mode: 'race', targetEvent: 'Half Marathon', raceDate: '', baseline5kMinutes: 28,
  daysPerWeek: 4, preferredLongRunDay: 'Sunday', terrainPreference: 'Road', maxHeartRate: 188, weeklyTargetDays: 4,
  routine: { 0: 'Running', 2: 'Strength Training', 4: 'Yoga', 6: 'Walking' },
};

export const mondayStart = (date = new Date()) => { const d = new Date(date); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; };
export const dateKey = (date: Date) => { const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
export const todayKey = () => dateKey(new Date());
export const paceFor5k = (minutes: number, factor: number) => { const pace = minutes / 5 * factor; return `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, '0')}`; };
export const hoursUntil = (a: string, b: string) => Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 36e5));

export function createWeek(profile: UserProfile): WorkoutSession[] {
  const monday = mondayStart();
  const raceDays = profile.daysPerWeek === 3 ? [0, 2, 6] : profile.daysPerWeek === 4 ? [0, 2, 4, 6] : [0, 1, 3, 4, 6];
  const longDay = profile.preferredLongRunDay === 'Saturday' ? 5 : 6;
  const easyKm = Math.max(3, +(profile.baseline5kMinutes / 5 * 0.7).toFixed(1));
  const blocks: Array<{ title: string; type: SessionType; sport: Sport; km: number; pace: number; rpe: number; zone: number }> = [
    { title: 'Easy aerobic run', type: 'Easy', sport: profile.terrainPreference === 'Trail' ? 'Trail Running' : 'Running', km: easyKm, pace: 1.3, rpe: 3, zone: 2 },
    { title: 'Tempo intervals', type: 'Tempo', sport: 'Running', km: +(easyKm * 1.15).toFixed(1), pace: 1.08, rpe: 7, zone: 3 },
    { title: 'Strength & mobility', type: 'Strength', sport: 'Strength Training', km: 0, pace: 1, rpe: 5, zone: 1 },
    { title: 'Recovery flow', type: 'Mobility', sport: 'Yoga', km: 0, pace: 1, rpe: 2, zone: 1 },
    { title: 'Long easy run', type: 'Long', sport: profile.terrainPreference === 'Road' ? 'Running' : 'Trail Running', km: +(easyKm * 2.2).toFixed(1), pace: 1.36, rpe: 4, zone: 2 },
  ];
  return weekdays.map((_, i) => {
    let block: (typeof blocks)[number] | null = null;
    if (profile.mode === 'race') {
      if (raceDays.includes(i)) block = i === longDay ? blocks[4] : blocks[raceDays.indexOf(i) % 2];
    } else {
      const sport = profile.routine[i] || '';
      if (sport) block = sport === 'Yoga' || sport === 'Pilates' ? blocks[3] : sport === 'Strength Training' || sport === 'HIIT' ? blocks[2] : { ...blocks[0], sport, title: `${sport} session` };
    }
    const date = new Date(monday); date.setDate(monday.getDate() + i);
    const zoneBounds = [[.5,.6],[.6,.7],[.7,.8],[.8,.9],[.9,1]][(block?.zone ?? 1) - 1];
    return {
      id: `session-${dateKey(date)}-${i}`, dayIndex: i + 1, date: dateKey(date), title: block?.title ?? 'Rest & recharge', type: block?.type ?? 'Rest', sport: block?.sport ?? 'Rest', targetDistanceKm: block?.km ?? 0,
      targetPaceMinPerKm: block?.km ? `${paceFor5k(profile.baseline5kMinutes, block.pace)} /km` : '—', targetRPE: block?.rpe ?? 1,
      targetElevationGainMeters: block?.type === 'Long' && profile.terrainPreference !== 'Road' ? Math.round((block?.km ?? 0) * 22) : undefined,
      targetHRZone: { zoneNumber: block?.zone ?? 1, zoneName: ['Recovery', 'Aerobic Base', 'Tempo', 'Threshold', 'VO₂ Max'][(block?.zone ?? 1) - 1], minBpm: Math.round(profile.maxHeartRate * zoneBounds[0]), maxBpm: Math.round(profile.maxHeartRate * zoneBounds[1]) },
      completed: false, isTrailMode: block?.sport === 'Trail Running' || (profile.terrainPreference === 'Hybrid' && block?.type === 'Long'), isShortened: false, isLowEnergy: false,
    };
  });
}

export function parseGPX(xml: string) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('This GPX file could not be read. Please choose a valid .gpx file.');
  const points = Array.from(doc.querySelectorAll('trkpt')).map((p) => [Number(p.getAttribute('lat')), Number(p.getAttribute('lon')), Number(p.querySelector('ele')?.textContent ?? 0), new Date(p.querySelector('time')?.textContent ?? 0).getTime()] as const).filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]));
  if (points.length < 2) throw new Error('This GPX file has fewer than two track points.');
  const radians = (n: number) => n * Math.PI / 180;
  let meters = 0, gain = 0;
  for (let i = 1; i < points.length; i++) {
    const [lat1, lon1, ele1] = points[i - 1], [lat2, lon2, ele2] = points[i];
    const dlat = radians(lat2 - lat1), dlon = radians(lon2 - lon1), h = Math.sin(dlat/2)**2 + Math.cos(radians(lat1))*Math.cos(radians(lat2))*Math.sin(dlon/2)**2;
    meters += 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h));
    if (ele2 - ele1 > 2) gain += ele2 - ele1;
  }
  const times = points.map(p => p[3]).filter(Boolean);
  return { distanceKm: +(meters / 1000).toFixed(2), elevationM: Math.round(gain), durationMin: times.length > 1 ? Math.round((Math.max(...times) - Math.min(...times)) / 60000) : 0, start: times.length ? new Date(Math.min(...times)) : null, end: times.length ? new Date(Math.max(...times)) : null, points: points.map(p => [p[0],p[1],p[2]] as [number,number,number]) };
}
