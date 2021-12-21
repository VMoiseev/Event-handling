/* eslint-disable no-alert */
export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.hit = 0;
    this.mishit = 0;
    this.noClick = 0;
    this.goblinIndex = -1;
    this.id = null;
  }

  init() {
    this.gamePlay.draw();
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.updateScores();

    this.id = setInterval(() => {
      this.mishit += this.noClick;
      this.updateScores();
      const lose = this.checkLose();
      if (lose === false) {
        this.findGoblin();
        let number = Math.floor(Math.random() * this.gamePlay.cells.length);
        if (number === this.goblinIndex && this.goblinIndex >= 2) {
          number = this.goblinIndex / 2;
        } else if (number === this.goblinIndex && this.goblinIndex < 2) {
          number = this.goblinIndex + 2;
        }
        this.goblinImg(number);
      }
    }, 1000);
  }

  onCellClick(index) {
    this.noClick = 0;
    if (index === this.goblinIndex) {
      this.hit += 1;
    } else {
      this.mishit += 1;
    }
    this.checkLose();
    this.updateScores();
  }

  updateScores() {
    const hit = document.querySelector('.hit');
    const mishit = document.querySelector('.mishit');
    hit.innerText = `Попаданий: ${this.hit} раз`;
    mishit.innerText = `Промахов: ${this.mishit} раз`;
  }

  checkLose() {
    if (this.mishit === 5) {
      clearInterval(this.id);
      alert('Вы проиграли! Начните заново!');
      this.gamePlay.cellClickListeners = [];
      return true;
    }
    return false;
  }

  onNewGameClick() {
    clearInterval(this.id);
    this.gamePlay.cellClickListeners = [];
    this.hit = 0;
    this.mishit = 0;
    this.noClick = 0;
    this.init();
  }

  findGoblin() {
    this.goblinIndex = this.gamePlay.cells.findIndex((item) => item.className.includes('goblin'));
  }

  goblinImg(number) {
    if (this.goblinIndex !== -1) {
      this.gamePlay.cells[this.goblinIndex].classList.remove('goblin');
    }
    const goblinImgCell = this.gamePlay.cells[number];
    goblinImgCell.classList.add('goblin');
    this.goblinIndex = number;
    this.noClick = 1;
  }
}
