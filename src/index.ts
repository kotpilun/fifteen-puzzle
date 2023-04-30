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

refreshButton.addEventListener('click', refresh);

function refresh(): void {
  itemsIdArray = shuffleArray(itemsIdArray);
  matrix = getMatrix(itemsIdArray);
  setItemsOnBoard();
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
