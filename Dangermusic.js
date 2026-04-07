let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let dangerSound = null;
let isPlaying = false;

function playDangerMusic() {
  if (isPlaying) return;

  dangerSound = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  dangerSound.type = "sawtooth"; // creepy arcade sound
  dangerSound.frequency.setValueAtTime(120, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);

  dangerSound.connect(gain);
  gain.connect(audioCtx.destination);

  dangerSound.start();
  isPlaying = true;
}

function stopDangerMusic() {
  if (dangerSound) {
    dangerSound.stop();
    dangerSound = null;
  }
  isPlaying = false;
}

let dx = player.x - enemy.x;
let dy = player.y - enemy.y;
let dist = Math.sqrt(dx*dx + dy*dy);

// 🎵 trigger music when close
if (dist < 200) {
  playDangerMusic();
} else {
  stopDangerMusic();
}


if (Math.abs(player.x - enemy.x) < 20 &&
    Math.abs(player.y - enemy.y) < 20) {
  // only trigger caught if VERY close (center hit)
  if (dist < 10) {
    gameState = "caught";
  }
}
stopDangerMusic();
