import './scss/style.scss';

const board: HTMLElement = document.querySelector('.board')!;
const refreshButton: HTMLElement = document.querySelector('.refresh')!;
let items: HTMLElement[] = Array.from(document.querySelectorAll('.item'));

let itemsIdArray: number[] = items.map((item) => Number(item.dataset.matrixId))
itemsIdArray = shuffleArray(itemsIdArray);

let matrix: number[][] = getMatrix(itemsIdArray);

setItemsOnBoard();

function setItemsOnBoard(): void {
  for (let i = 0; i < matrix.length; i ++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let element: HTMLElement = document.querySelector(`[data-matrix-id="${matrix[i][j]}"]`)!; 
      element.style.transform = `translate(${j * 100}%, ${i * 100}%)`;
    }
  }
}

/// REFRESH BOARD

refreshButton.addEventListener('click', refresh);

function refresh(): void {
  itemsIdArray = shuffleArray(itemsIdArray);
  matrix = getMatrix(itemsIdArray);
  setItemsOnBoard();
}

/// MOVE ITEMS ON BOARD


board.addEventListener('click', e => {
  const buttonNode: HTMLElement = (e.target as HTMLElement).closest('button')!;

  console.log(buttonNode.getAttribute('data-matrix-id'));

  if (!buttonNode) return;

  const itemId = Number(buttonNode.getAttribute('data-matrix-id'));
  const activeItemCoords = getActiveItemCoords(itemId);
  // const emptyItemCoords = getActiveItemCoords(16);

  if (isAvailableToMove(activeItemCoords)) {
    console.log(true);
  } else {
    console.log(false);
  }
});

function getActiveItemCoords(itemId: number): Coords {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {

      if (matrix[y][x] == itemId) {
        return {y, x};
      }
    }
  }

  return {};
}

type Coords = {
  x?: number;
  y?: number;
};

function isAvailableToMove(activeItemCoords: Coords): boolean {
  if (matrix[activeItemCoords.y! - 1]) {
    if (matrix[activeItemCoords.y! - 1][activeItemCoords.x!] == 16) {
      return true;
    }
  }

  if (matrix[activeItemCoords.y! + 1]) {
    if (matrix[activeItemCoords.y! + 1][activeItemCoords.x!] == 16) {
      return true;
    }
  }

  if (matrix[activeItemCoords.x! - 1]) {
    if (matrix[activeItemCoords.y!][activeItemCoords.x! - 1] == 16) {
      return true;
    }
  }

  if (matrix[activeItemCoords.x! + 1]) {
    if (matrix[activeItemCoords.y!][activeItemCoords.x! + 1] == 16) {
      return true;
    }
  }

  return false;
}

/// HELPERS
function getMatrix(arr: number[]): number[][] {
  const matrix: number[][] = [[], [], [], []];
  let gap: number = 0;

  for (let i = 0; i < 4; i++) {
    matrix[i] = arr.slice(gap, gap + 4)
    gap += 4;
  }

  return matrix;
}

function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array;
}
