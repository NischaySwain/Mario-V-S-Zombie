// Get the elements
score = 0;
cross = true;
const mario = document.querySelector('.mario');
const gameOver = document.querySelector('.gameOver');
const zombie = document.querySelector('.zombie');
const scoreCont = document.getElementById('score');
// Set the initial position of the zombie
zombie.style.left = '100vw';
zombie.classList.add('zombieAnimate');

// Add event listener for keydown
document.onkeydown = function(e) {
  console.log("key code is: ", e.keyCode)
  if(e.keyCode == 38) {
    mario.classList.add('animateMario');
    setTimeout(() => {
      mario.classList.remove('animateMario')
    }, 700);
  }
  if(e.keyCode == 39) {
    //mario = document.querySelector('.mario');
    mariox = parseInt(window.getComputedStyle(mario,null).getPropertyValue('left'));
    mario.style.left = mariox + 112 + "px";
  }
  if(e.keyCode == 37) {
    //mario = document.querySelector('.mario');
    mariox = parseInt(window.getComputedStyle(mario,null).getPropertyValue('left'));
    mario.style.left = (mariox - 112) + "px";
  }
  if(e.keyCode == 32) { // space bar
    console.log("Space bar pressed!");
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump')
    }, 700);
  }
}

// Check for collision every 16ms (approximately 60fps)
setInterval(() => {
  const dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
  const dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));
  const ox = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('left'));
  const oy = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('top'));
  const offsetx = Math.abs(dx - ox);
  const offsety = Math.abs(dy - oy);
  console.log(offsetx, offsety);
  if (offsetx < 80 && offsety < 52) {
    gameOver.style.visibility = 'visible';
    zombie.classList.remove('zombieAnimate')
  }
  else if(offsetx < 145 && cross){
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(()=>{
      cross = true;
    },1000);
    setTimeout(()=>{
       anidur = parseFloat(window.getComputedStyle(zombie,null).getPropertyValue('animation-duration'));
       newdur = anidur - 0.1;
       if (newdur < 1) newdur = 1;
       zombie.style.animationDuration = newdur + 's';
       console.log('New animation Duration: ',newdur);
    },500)
  }
}, 10);
function updateScore(score){
  scoreCont.innerHTML = "Your Score: " + score;
}