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

// Damage instead of instant death
if(dist < 25){
  if(damageCooldown <= 0){
    health--;
    damageCooldown = 30; // delay between hits
  }
}

// cooldown timer
if(damageCooldown > 0){
  damageCooldown--;
}

// Damage instead of instant death
if(dist < 25){
  if(damageCooldown <= 0){
    health--;
    damageCooldown = 30; // delay between hits
  }
}



// If health reaches 0 → game over sequence
if(health <= 0){  health = maxHealth;
  } // HEALTH BAR
ctx.fillStyle = "white";
ctx.font = "16px monospace";
ctx.fillText("Health", 20, 50);

// background bar
ctx.fillStyle = "gray";
ctx.fillRect(20, 60, 200, 20);

// health amount
ctx.fillStyle = "lime";
ctx.fillRect(20, 60, (health / maxHealth) * 200, 20);
  gameState = "caught";
  stopMusic();
}


if (Math.abs(player.x - enemy.x) < 20 &&
    Math.abs(player.y - enemy.y) < 20) {
  // only trigger caught if VERY close (center hit)
  if (dist < 10) {
    gameState = "caught";
  }
}
stopDangerMusic();
