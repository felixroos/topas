import {
  superdough,
  samples,
  initAudioOnFirstClick,
  registerSynthSounds,
  getAudioContext,
} from "superdough";
import "zyklus";
import "./style.css";
import { topos } from "./topos.mjs";

// load sounds
const init = Promise.all([
  initAudioOnFirstClick({ disableWorklets: false }),
  samples("github:tidalcycles/Dirt-Samples/master"),
  registerSynthSounds(),
]);

const tickDuration = 1 / 48;
const tps = 1 / tickDuration;

console.log("hello");

const state = {
  tps,
  tickDuration,
};
const minLatency = 0.01;

// user functions in window scope
Object.assign(window, {
  getAudioContext,
  superdough,
  samples,
  p(obj) {
    const { duration = 0.25, nudge = 0, chord, ...rest } = obj;
    if (!chord) {
      return superdough(rest, state.deadline + nudge + minLatency, duration);
    }
    // really cheap chord function (just for testing)
    let chords = {
      C: ["c4", "e4", "g4"],
      G: ["b3", "d4", "g4"],
      Am7: ["a4", "c5", "e5", "g5"],
      Bm7: ["b4", "d5", "f#5", "a5"],
    };
    if (!chords[chord]) {
      console.error("chord not found", chord);
      return;
    }
    return chords[chord].map((note) =>
      superdough(
        { ...rest, note },
        state.deadline + nudge + minLatency,
        duration
      )
    );
  },
  bpm: (tempo) => {
    clock.setDuration(() => (tickDuration * 60) / tempo);
  },
  ...topos(state),
});

// default code
let defaultCode = `
bpm(93)

function tick() {
  beat(.5) && p({s:"hh"})
  beat(1) && p({s:"bd"})
  beat(2) && p({s:"sd"})
  beat([.75,1],.5) && p({s:"jvbass",delay:.25})
  beat(1,.5) 
  && p({note:"f#",room:1},.25) 
  && p({note:"a",room:1},.15)
}
`.trim();

const codeParam = window.location.href.split("#")[1] || "";
let code = codeParam ? hash2code(codeParam) : defaultCode;

// "safe eval"
function evaluate(str) {
  const body = `"use strict"; return (async () => {
${str}
return tick
})()`;
  return Function(body).call(state);
}

let clock, started;

// init clock
function initClock() {
  if (clock) {
    return clock;
  }
  clock = getAudioContext().createClock((time, duration, tick) => {
    state.deadline = time - getAudioContext().currentTime;
    state.t = time;
    state.tick = tick;
    try {
      state.ticker && state.ticker(state);
    } catch (err) {
      console.error(err);
    }
  }, tickDuration);
}

async function run() {
  await init;
  initClock();
  await update();
  if (!started) {
    clock.start();
    started = true;
  }
}

function stop() {
  clock.stop();
  started = false;
}

// ui

const input = document.getElementById("code");
async function update() {
  code = input.value;
  state.ticker = await evaluate(code);
  window.location.hash = btoa(code);
}
input.innerHTML = code;
input.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    run();
  }
  if (e.ctrlKey && e.key === ".") {
    stop();
  }
});

document.getElementById("play").addEventListener("click", () => run());

document.getElementById("stop").addEventListener("click", () => stop());

// helpers

export function unicodeToBase64(text) {
  const utf8Bytes = new TextEncoder().encode(text);
  const base64String = btoa(String.fromCharCode(...utf8Bytes));
  return base64String;
}

export function base64ToUnicode(base64String) {
  const utf8Bytes = new Uint8Array(
    atob(base64String)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const decodedText = new TextDecoder().decode(utf8Bytes);
  return decodedText;
}

export function code2hash(code) {
  return encodeURIComponent(unicodeToBase64(code));
  //return '#' + encodeURIComponent(btoa(code));
}

export function hash2code(hash) {
  return base64ToUnicode(decodeURIComponent(hash));
  //return atob(decodeURIComponent(codeParam || ''));
}
