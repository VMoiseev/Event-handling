export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.playingField = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.newGameListeners = [];
  }

  bindToDOM(playingField) {
    if (!(playingField instanceof HTMLElement)) {
      throw new Error('playingField is not HTMLElement');
    }
    this.playingField = playingField;
  }

  draw() {
    this.checkBinding();
    this.playingField.innerHTML = `
      <div class="new-game">
        <button data-id="action-restart" class="btn">Новая игра</button>
      </div>
      <div class="score">
        <div class="hit"></div>
        <div class="mishit"></div>
      </div>
      <div class="board"></div>
    `;

    this.newGameEl = this.playingField.querySelector('[data-id=action-restart]');
    this.newGameEl.addEventListener('click', (event) => this.onNewGameClick(event));
    this.boardEl = this.playingField.querySelector('.board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  checkBinding() {
    if (this.playingField === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
