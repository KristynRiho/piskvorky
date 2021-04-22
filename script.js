'use strict';
//vrátí objekt s číslem řádku a sloupce
const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.cell');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
console.log(getPosition(fields[5]));

//vrátí příslušný prvek
const getField = (row, column) => fields[row * boardSize + column];
console.log(getField(9, 0));

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

//kdo vyhraje:
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

//kdo je na tahu
let player = 'circle';

//co se má stát, když nastane nějaká událost (e)
const kliknuto = (e) => {
  e.target.classList.add(`board__field--${player}`);
  e.target.disabled = 'true';

  const vyhra = isWinningMove(e.target);
  if (vyhra === true && player === 'circle') {
    setTimeout(() => {
      let msg = confirm(`Vyhrál kroužek. Spustit novou hru?`);
      if (msg === true) {
        location.reload();
      }
    }, 200);
  } else if (vyhra === true && player === 'cross') {
    setTimeout(() => {
      let msg = confirm(`Vyhrál křížek. Spustit novou hru?`);
      if (msg === true) {
        location.reload();
      }
    }, 200);
  }

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
