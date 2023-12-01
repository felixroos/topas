export function topos(state) {
  function pulse(width) {
    return state.tick % width === 0;
  }
  function beat(n, nudge = 0) {
    return (!Array.isArray(n) ? [n] : n).some(
      (n) => !((state.tick - nudge * state.tps) % Math.floor(n * state.tps))
    );
  }
  function rhythm(div, pulses, length, rotate = 0) {
    return beat(div) && euclidean_cycle(pulses, length, rotate).beat(div);
  }
  let getBeat = () => state.tick / state.tps;

  Array.prototype.beat = function (divisor = 1) {
    return this[Math.floor(getBeat() / divisor) % this.length];
  };

  Array.prototype.dur = function (...durations) {
    let sum = 0;
    durations = durations.map((d) => {
      let s = sum;
      sum += d;
      return s;
    });
    let b = getBeat() % sum;
    let i = durations.indexOf(durations.findLast((d) => b >= d));
    return this[i];
  };
  let range = (v, a, b) => v * (b - a) + a;
  let usine = (freq) => (Math.sin(state.t * freq * Math.PI * 2) + 1) / 2;

  return {
    pulse,
    beat,
    rhythm,
    getBeat,
    range,
    usine,
    r: (a, b) => range(Math.random(), a, b),
    ir: (a, b) => Math.round(r(a, b)),
    lpad: (lpenv, lpattack, lpdecay) => ({
      lpenv,
      lpattack,
      lpdecay,
      lpsustain: 0,
    }),
    ad: (attack, decay) => ({ attack, decay, sustain: 0 }),
  };
}

export function euclidean_cycle(pulses, length, rotate = 0) {
  if (pulses == length) return Array.from({ length }, () => true);
  function startsDescent(list, i) {
    const length = list.length;
    const nextIndex = (i + 1) % length;
    return list[i] > list[nextIndex] ? true : false;
  }
  if (pulses >= length) return [true];
  const resList = Array.from(
    { length },
    (_, i) => (((pulses * (i - 1)) % length) + length) % length
  );
  let cycle = resList.map((_, i) => startsDescent(resList, i));
  if (rotate != 0) {
    cycle = cycle.slice(rotate).concat(cycle.slice(0, rotate));
  }
  return cycle;
}
