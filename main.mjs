import {
  superdough,
  samples,
  initAudioOnFirstClick,
  registerSynthSounds,
  getAudioContext,
} from "superdough";
import "zyklus";
import "./style.css";

// load sounds
const init = Promise.all([
  initAudioOnFirstClick({ disableWorklets: true }),
  samples("github:tidalcycles/Dirt-Samples/master"),
  registerSynthSounds(),
]);

const tickDuration = 1 / 48;
const tps = 1 / tickDuration;

console.log("hello");

const state = {};

// user functions in window scope
Object.assign(window, {
  p(obj, duration = 0.25) {
    return superdough(obj, state.deadline, duration);
  },
  pulse: (width) => {
    return state.tick % width === 0;
  },
  beat: (n, nudge = 0) =>
    (!Array.isArray(n) ? [n] : n).some(
      (n) => !((state.tick - nudge * tps) % Math.floor(n * tps))
    ),
  bpm: (tempo) => {
    clock.setDuration(() => (tickDuration * 60) / tempo);
  },
});

// default code
let code = `
bpm(93)
beat(.5) && p({s:"hh"})
beat(1) && p({s:"bd"})
beat(2) && p({s:"sd"})
beat([.75,1],.5) && p({s:"jvbass",delay:.25})
beat(1,.5) 
&& p({note:"f#",room:1},.25) 
&& p({note:"a",room:1},.15)
`.trim();

// "safe eval"
function evaluate(str) {
  const body = `"use strict"; ${str}`;
  return Function(body).call({ foo: true });
}

let clock;
async function play() {
  await init;
  clock = getAudioContext().createClock((time, duration, tick) => {
    state.deadline = time - getAudioContext().currentTime;
    state.tick = tick;
    try {
      evaluate(code);
    } catch (err) {
      console.log(err);
    }
  }, tickDuration);
  clock.start();
}

function stop() {
  if (clock) {
    clock.stop();
  }
}

// ui

const input = document.getElementById("code");
async function update() {
  if (!clock) {
    await play();
  }
  code = input.value;
}
input.innerHTML = code;
input.addEventListener("keypress", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    update();
  }
  if (e.ctrlKey && e.key === ".") {
    stop();
  }
});

document.getElementById("play").addEventListener("click", () => play());

document.getElementById("eval").addEventListener("click", () => update());

document.getElementById("stop").addEventListener("click", () => stop());
