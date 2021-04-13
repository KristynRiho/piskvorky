'use strict';

//kdo je na tahu
let player = 'circle';

//co se má stát, když nastane nějaká událost (e)
const kliknuto = (e) => {
  e.target.classList.add(`board__field--${player}`);
  e.target.disabled = 'true';
  if (player === 'circle') {
    player = 'cross';
  } else {
    player = 'circle';
  }
  document.querySelector(
    '.navigation__player-symbol',
  ).src = `images/${player}.svg`;
};

//vybrání všech políček a zároveň kliknutí na jedno konkrétní:
const buttons = document.querySelectorAll('.cell');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', kliknuto);
}
